const {MongoClient} = require('mongodb');

const URL = 'mongodb://localhost:27017/la-routine';

let dbConnection;

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(URL)
        .then((client)=> {
            console.log("Connected to MongoDB");
            dbConnection = client.db(); // в случае успешного подключения запишется результят этого подключения
            return cb();
        })
        .catch((err) => {
            return cb(err);
        })
    },
    getDb: () => dbConnection, // возращает результат функции
}