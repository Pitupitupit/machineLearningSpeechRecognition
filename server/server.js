const express = require('express');	
const bodyParser = require('body-parser');
const cors = require('cors');
const { port, corsOptions } = require('./config');
const { connect } = require('./db');
const routes = require('./routes');

const app = express();

connect().then(db => {
	app.listen(port, () => console.log(`Listening on port: ${port}`));
	app.use(cors(corsOptions));
	app.use(bodyParser.json());
	app.use('/speechRecognition', routes.SpeechRecognitionRoute._router);
	app.use('/login', routes.LoginRoute._router);
}).catch(error => error);