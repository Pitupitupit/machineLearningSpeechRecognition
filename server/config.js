module.exports = {
    atlasURL: 'mongodb+srv://MongoDBUser:haslo@mongocluster-z9xx3.azure.mongodb.net/test?retryWrites=true',
    dbName: 'speechRecognition',
    port: 8081,
    corsOptions: {
        origin: 'http://localhost:8080',
        optionsSuccessStatus: 200
    }
}