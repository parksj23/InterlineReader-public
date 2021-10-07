const MongoClient = require('mongodb').MongoClient;
const { mongoURI, databaseName } = require('./config/keys');

let db;

function connect(callback) {
    MongoClient.connect(mongoURI, { useUnifiedTopology: true }, (err, database) => {
        if (err) return console.error(err);
        db = database.db(databaseName);
        console.log('Connected to KORN 351 Database');
        callback();
    });
}

function get() {
    return db;
}

function close() {
    db.close();
}

module.exports = {
    connect,
    get,
    close,
};
