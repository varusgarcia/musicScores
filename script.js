console.log("Hello");
document.addEventListener('DOMContentLoaded', function() {
  var URL = "https://docs.google.com/spreadsheets/d/1EZGMC3akrhkV_5Mgxyxt1ExEfPNxbA2Za1s1C_hDLhc/edit?usp=sharing"
  Tabletop.init({
    key: URL,
    callback: getData,
    simpleSheet: true
  })
})

function getData(data) {
  console.log(data);
}

var audioTest = document.getElementById("audioTest");
var played = false;
var playButton = document.getElementById("playButton");
var sliderRange = document.getElementById("myRange");




function play() {
	console.log(played);
  if (!played) {
    console.log("Play");
    audioTest.play()
    playButton.style.background = "url('assets/Icon/Pause_Active.png')"
    played = true
  } else {
    console.log("Pause");
    audioTest.pause()
    playButton.style.background = "url('assets/Icon/Play_Active.png')"
    played = false
  }
}

sliderRange.oninput = function() {
	audioTest.currentTime = mapArea(this.value/10000,0,1,0,audioTest.duration)
}

function playing(event) {
  var length = event.duration
  var current_time = event.currentTime;
  var totalLength = calculateTotalValue(length)
  var currentTime = calculateCurrentValue(current_time);
	sliderRange.value = (event.currentTime / event.duration)*10000;
	document.getElementById("audioPlayerTimecodeText").innerHTML = currentTime

	if (current_time == length) {
		playButton.style.background = "url('assets/Icon/Play_Active.png')"
		played = false;
		audioTest.currentTime = 0;
	}
}

//(S = Source, T = Target)
function mapArea(x, min_S, max_S, min_T, max_T){
	var y = (max_T-min_T)*(x-min_S)/(max_S-min_S) + min_T
	return y
}

function calculateTotalValue(length) {
  var minutes = Math.floor(length / 60),
    seconds_int = length - minutes * 60,
    seconds_str = seconds_int.toString(),
    seconds = seconds_str.substr(0, 2),
    time = minutes + ':' + seconds

  return time;
}

function calculateCurrentValue(currentTime) {
  var current_hour = parseInt(currentTime / 3600) % 24,
    current_minute = parseInt(currentTime / 60) % 60,
    current_seconds_long = currentTime % 60,
    current_seconds = current_seconds_long.toFixed(),
    current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);

  return current_time;
}
