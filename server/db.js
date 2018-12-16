const { MongoClient } = require('mongodb');
const assert = require('assert');
const { atlasURL } = require('./config');

let _db, client;

module.exports = {
    connect: async () => {
        try {
            client = await MongoClient.connect(atlasURL, { useNewUrlParser: true });
            _db = client.db('speechRecognition');
            return _db;
        } catch (error) {
            return Promise.reject(error);
        }
    },
    disconnect: () => {
        if (client) {
            client.close();
        }
    },
    getDb: () => {
        assert.ok(_db, 'DB has not been initialized!');
        return _db;
    }
}
