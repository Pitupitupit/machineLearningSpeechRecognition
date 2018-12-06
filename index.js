var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

urlMongo='mongodb://localhost:27017/speechRecognition'; //speechRecognition to nazwa bazy - do wyklikania w compass

app.get('/', function (req, res) { //obsługa get /

	MongoClient.connect(urlMongo, { useNewUrlParser: true }, function (err, db) { //polączenie do mongoła ({ useNewUrlParser: true } - by się nie rzucał że przestarzałe)
	  if (err) throw err;
	  var dbo = db.db('speechRecognition'); //znowu nazwa bazy
	  
	  dbo.collection('words').find().toArray(function (err, result) { //wyswietlenie, wyszukanie wszystkich dokumentuf z kolekcji (tabeli) words 
		if (err) throw err;
		console.log(result);
		db.close();
	  })
	})
	res.sendFile(__dirname + '/public/index.html'); //odpowiedz plikiem index na get /
})

app.post('/', function(req, res) { //obsługa formularza ze słowami i wagami
	MongoClient.connect(urlMongo, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("speechRecognition");
		dbo.collection("words").insertMany(req.body, function(err, res) { //w req.body to co przyszło, czyli np. [{word:"dupa", weight:"1"},...]. Insertujemy to do bazy
			if (err) throw err;
			db.close();
		});
	}); 
	
	
})

app.use(express.static('public'));

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("app listening at http://%s:%s", host, port)
})