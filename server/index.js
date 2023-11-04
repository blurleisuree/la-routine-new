const express = require('express')
const PORT = process.env.PORT || 3001 // НЕ должен 3000 потому что фронт на 3000
const app = express()

const { ObjectId } = require('mongodb')
const { connectToDb, getDb } = require('./db')

app.use(express.json()) // позволяет читать данные из запроса
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS, PATCH')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers')
    next()
})

let db
connectToDb((err) => {
    if (!err) {
        app.listen(PORT, () => {
            console.log(`App running on port ${PORT}.`)
        })
        db = getDb()
    } else {
        console.log(`Db connection error: ${err}`)
    }
})

const handleError = (res, error) => {
    res.status(500).json({ error })
}

// Test
app.get('/items', (req, res) => {
    const items = []
    db.collection('items').find() // получаем не коллекцию а объект курсор; cursor методы: hasNext, next, forEach; не возвращает все данные сразу (101 документ)
        .forEach((item) => items.push(item))
        .then(() => {
            res.status(200).json(items)
        })
        .catch(() => handleError(res, 'Something goes wrong'))
})

// Для ItemCard
app.get('/:id/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('items').findOne({ _id: new ObjectId(req.params.id) })
            .then((doc) => {
                res.status(200).json(doc)
            })
            .catch(() => handleError(res, 'Something goes wrong'))
    } else {
        res.status(500).json({ error: 'Wrong id' })
    };
})

// Для хедера
app.get('/catalog', (req, res) => {
    const catalog = []
    db.collection('catalog').find() // получаем не коллекцию а объект курсор; cursor методы: hasNext, next, forEach; не возвращает все данные сразу (101 документ)
        .forEach((item) => catalog.push(item))
        .then(() => {
            res.status(200).json(catalog)
        })
        .catch(() => handleError(res, 'Something goes wrong'))
})

// Для каталога
app.get('/:id', (req, res) => {
    const skipCount = Number(req.query.skipCount) || 0

    // Чтобы убирать из ссылки параметры запроса (для поиска по базе)
    let url = req.url.replace('/', '')
    if (req.query.limitCount || req.query.skipCount) {
        url = url.replace(/\?.*$/, '')
    }

    const items = []
    db.collection('catalog').findOne({ name: url })
        .then((catalogItem) => {
            db.collection('items').find({ catalog_id: new ObjectId(catalogItem._id) }).sort({ new: -1 }).skip(skipCount).limit(6) // sort для того чтобы первые элементы были new
                .forEach((item) => items.push(item))
                .then(() => {
                    db.collection('items').find({ catalog_id: new ObjectId(catalogItem._id) }).count()
                        .then((count) => {
                            res.status(200).json({ items, count })
                        })
                })
                .catch(() => handleError(res, 'Something goes wrong'))
        })
        .catch(() => handleError(res, 'Wrong id'))
})

// Для new (по умолчанию)
app.get('/', (req, res) => {
    const skipCount = Number(req.query.skipCount) || 0

    const items = []
    db.collection('items').find({ new: true }).skip(skipCount).limit(6)
        .forEach((item) => items.push(item))
        .then(() => {
            db.collection('items').find({ new: true }).count()
                .then((count) => {
                    res.status(200).json({ items, count })
                })
        })
        .catch(() => handleError(res, 'Something goes wrong'))
})

// Отправка письма
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'ipishir@gmail.com',
        pass: 'mxlt oumh azuv mjce'
    }
})

const mailRequest = (req, res) => {
    // const { fullName, address, email, number, delivery } = req.body
    const { email } = req.body

    const mailOptions = {
        from: 'ipishir@gmail.com',
        to: email,
        subject: 'Спасибо за заказ!',
        text: 'Заказ оформлен, ваш трек код:'
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Ошибка при отправке письма: ' + error)
            res.status(500).send({ res: 'Ошибка при отправке письма' })
        } else {
            console.log({ res: 'Письмо отправлено: ' + info.response })
            res.status(200).send({ res: 'Письмо отправлено: ' + info.response })
        }
    })
}

// Для добавления новых товаров
// app.post('/update', (req, res) => {
//     const item = { ...req.body, new: Boolean(req.body.new), available: Boolean(req.body.available), catalog_id: req.body.catalog_id }
//     db.collection('items').insertOne({ ...item, catalog_id: new ObjectId(item.catalog_id) })
// })

app.post('/:id/mail', mailRequest)
app.post('/mail', mailRequest)

// app.get('/:id', (req, res) => {
//     const limitValue = Number(req.query.limitValue)
//     const skipCount = Number(req.query.skipCount)

//     // Чтобы убирать из ссылки параметры запроса (для поиска по базе)
//     let url = req.url.replace('/', '');
//     if (req.query.limitValue || req.query.skipCount) {
//         url = url.replace(/\?.*$/, "")
//     }

//     console.log(url, skipCount, limitValue);

//     const items = [];
//     db.collection('catalog').findOne({ name: url })
//         .then((catalogItem) => {
//             db.collection('items').find({ catalog_id: new ObjectId(catalogItem._id) }).sort({ new: -1 }).skip(skipCount).limit(limitValue) // sort для того чтобы первые элементы были new
//                 .forEach((item) => items.push(item))
//                 .then(() => {
//                     db.collection('items').find({ catalog_id: new ObjectId(catalogItem._id) }).count()
//                         .then((count) => {
//                             res.status(200).json({ items, count });
//                         })
//                 })
//                 .catch(() => handleError(res, "Something goes wrong"));
//         })
//         .catch(() => handleError(res, "Wrong id"));
// });

// // Для new (по умолчанию)
// app.get('/', (req, res) => {
//     const limitValue = Number(req.query.limitValue)
//     const skipCount = Number(req.query.skipCount)

//     // Чтобы убирать из ссылки параметры запроса (для поиска по базе)
//     let url = req.url;
//     if (req.query.limitValue || req.query.skipCount) {
//         url = url.replace(/\?.*$/, "")
//     }

//     const items = [];
//     db.collection('items').find({ new: true }).skip(skipCount).limit(limitValue)
//         .forEach((item) => items.push(item))
//         .then(() => {
//             db.collection('items').find({ new: true }).count()
//                 .then((count) => {
//                     res.status(200).json({ items, count });
//                 })
//         })
//         .catch(() => handleError(res, "Something goes wrong"));
// })
