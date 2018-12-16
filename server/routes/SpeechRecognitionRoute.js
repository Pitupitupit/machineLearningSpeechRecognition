const BaseRoute = require('./BaseRoute');
const { getDb } = require('../db');

class SpeechRecognitionRoute extends BaseRoute {
	constructor() {
		super();
	}

	setupListeners() {
		this.router.route('/').get(this.getAllWords).post(this.createNewWord);

	}

	async getAllWords(req, res, next) {
		try {
			return res.send(await getDb().collection('words').find().toArray());
		} catch (error) {
			return next(error);
		}
	}

	async createNewWord(req, res, next) {
		try {
			await getDb().collection('words').insertOne(req.body);
			return res.status(201).send({message: 'succesfully created new word'});
		} catch (error) {
			return next(error);
		}
	}
}

module.exports = new SpeechRecognitionRoute();