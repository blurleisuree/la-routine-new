const { MongoClient } = require('mongodb')
require('dotenv').config()

const dbUrl = process.env.DATABASE_URL

let dbConnection

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(dbUrl)
            .then((client) => {
                console.log('Connected to MongoDB')
                dbConnection = client.db('la-routine') // в случае успешного подключения запишется результят этого подключения
                return cb()
            })
            .catch((err) => {
                return cb(err)
            })
    },
    getDb: () => dbConnection // возращает результат функции
}
