window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition; //SpeechRecognition dla firefoxa. webkitSpeechRecognition dla chroma
const recognition = new SpeechRecognition(); //robimy instancje
recognition.maxAlternatives = 10; //ile maksymalnie alternatyw ma wypluć. Domyślnie jest 1 więc to musi być

textBox = document.getElementById("textBox");

const dictate = () => {
  recognition.start(); //zaczyna słuchać
  recognition.onresult = (event) => { //skończyło i mamy jakiś wynik i coś robimy
	results = []; //tablica obiektów. tu zapisywane sa alternatywy, np results=[{word:"dupa", weight:10},{word:"kupa", weight:3},...]
	var speechToText=''; //tylko dla picu dla łączenia wszystkich alternatyw w jednego stringa
	
	for(var i=0;i<event.results.length;i++){  //pętle do pozyskania wszystkich alternatyw
		var oneSpeechRecognitionResultList = event.results[i];
		
		for(var j = 0; j < oneSpeechRecognitionResultList.length; j++) {
			var word = oneSpeechRecognitionResultList[j].transcript; //bierzemy wyplute słowo
			item={}; //obiekt gdzie będzie alternatywa
			item["word"]=word;
			item["weight"]=0; //na razie przypisujemy 0 do wagi, potem w formularzu user se zmieni
			results.push(item); //dodajemy
			console.log(word);
			speechToText=speechToText+" - "+word;
			
			$('#form').append('<p class="x">'+word+'</p>'); //dodajemy w html do formularza nazwę słowa i inputa na wpisanie wagi
			$('#form').append('<input class="x" type="number" name="'+word+'" id="'+word+'" /><br>');
			

		}
	}
	textBox.innerHTML=speechToText; //dla picu wyswietlamy tego stringa z wszystkimi alternatywami
    
  }
}

$("#form").submit(function(e) { //obsługa kliknięcia wyślij. W ajaxie więc bez odświezania wsszystko hehuehuhauahsu
	
	e.preventDefault();
	
	results.forEach(function (arrayItem) {
		arrayItem["weight"] = $('#'+arrayItem["word"]).val(); //wpisujemy wagę którą user se wpisal w formularzu
	});

    $.ajax({
           type : "POST",
			contentType : "application/json",
           url: "http://localhost:8081/",
			data : JSON.stringify(results),
			dataType : 'json',
           success: function(data)
           {
               alert(data); //nwm
           }
         });

    e.preventDefault(); // avoid to execute the actual submit of the form.
	$("input").remove(".x"); //czyścimy to co jest w formularzu (oprócz przycisku)
	$("p").remove(".x"); 
});