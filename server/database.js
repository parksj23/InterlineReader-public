const MongoClient = require('mongodb').MongoClient;
const URI = require('./config/keys').mongoURI;

let db;

function connect(callback) {
    MongoClient.connect(URI, { useUnifiedTopology: true }, (err, database) => {
        if (err) return console.error(err);
        db = database.db('InterlineReaderKorn351DB');
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
