const BaseRoute = require('./BaseRoute');
const { getDb } = require('../db');

class SpeechRecognitionRoute extends BaseRoute {
	constructor() {
		super();
	}

	setupListeners() {
		this.router.route('/').get(this.getAllWords).post(this.createNewWord);
		this.router.route('/main').post(this.displayCommand);//

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
			//console.log("req body stringify create new word: "+JSON.stringify(req.body));
			await getDb().collection('words').insertOne(req.body);
			return res.status(201).send({message: 'succesfully created new word'});
		} catch (error) {
			return next(error);
		}
	}
	
	async displayCommand(req, res, next) {
			var isThereAnyRecord = false;
			var finalList = [];
			var finalWord = { word : "", weight : 0 };
			
			for(const word of req.body) {
				console.log(word);
				try{
					var repeatsArray = await getDb().collection('words').find({'word':word}).toArray();
					if(repeatsArray.length > 0) {
						isThereAnyRecord = true;
						if(repeatsArray.length > 1) { //więcej niż 1 wpis w bazie
							var average = 0;
							var sum = 0;
							repeatsArray.forEach(function(row) {
								sum = sum + parseInt(row.weight,10);
							});
							average = sum / repeatsArray.length;
							finalList.push({word : repeatsArray[0].word, weight : average});
						} else { //tylko jeden wpis w bazie
							finalList.push({word : repeatsArray[0].word, weight : repeatsArray[0].weight});
						}
					} else { //brak wpisów w bazie
						finalList.push({word : word, weight : 0});
					}

				} catch(error) {
					return next(error);
				}	
			}
			//console.log("final List : "+JSON.stringify(finalList));

			if(isThereAnyRecord){
				for(const word of finalList){
					if(word.weight > finalWord.weight) {
						finalWord = word;
					}
				}
			} else {
				finalWord.word = req.body[0];
				finalWord.weight = 0;
			}
			console.log("finalWord: "+JSON.stringify(finalWord))
			return res.status(201).send({finalWord});
	}
}

module.exports = new SpeechRecognitionRoute();