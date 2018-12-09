const express = require('express');
const bodyParser = require('body-parser');
const { port } = require('./config');
const { connect } = require('./db');
const routes = require('./routes');

const app = express();

connect().then(db => {
	app.listen(port, () => console.log(`Listening on port: ${port}`));
	app.use(bodyParser.json());
	app.use('/speechRecognition', routes.SpeechRecognitionRoute._router);
}).catch(error => error);