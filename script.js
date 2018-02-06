console.log("Hello");
document.addEventListener('DOMContentLoaded', function() {
	var URL = "https://docs.google.com/spreadsheets/d/1EZGMC3akrhkV_5Mgxyxt1ExEfPNxbA2Za1s1C_hDLhc/edit?usp=sharing"
	Tabletop.init( { key: URL, callback: getData, simpleSheet: true } )
})

function getData(data){
  console.log(data);
}

var audioTest = document.getElementById("audioTest");

//audioTest.play()
console.log(audioTest.currentTime);

function initProgressBar(event) {
	console.log(audioTest.currentTime);
}
