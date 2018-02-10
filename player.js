

var played = false;
var playerSettingsDeployed = false;
var playButton = document.getElementById("playButton");
var sliderRange = document.getElementById("myRange");


function play() {
	console.log(played);
  if (!played) {
    console.log("Play");
		document.getElementById("allTraces").play()
		for (d=0; d<musicTraces.length; d++){
			document.getElementById(musicTraces[d]).play()
		}
    playButton.style.background = "url('assets/Icon/Pause_Active.png')"
    played = true
  } else {
    console.log("Pause");
		document.getElementById("allTraces").pause()
		for (d=0; d<musicTraces.length; d++){
			document.getElementById(musicTraces[d]).pause()
		}
    playButton.style.background = "url('assets/Icon/Play_Active.png')"
    played = false
  }
}

sliderRange.oninput = function() {
	var allTracesId = document.getElementById("allTraces")
	allTracesId.currentTime = mapArea(this.value/10000,0,1,0,allTracesId.duration)
	for (d=0; d<musicTraces.length; d++){
		var thisTracesId = document.getElementById(musicTraces[d])
		thisTracesId.currentTime = mapArea(this.value/10000,0,1,0,thisTracesId.duration)
	}
}


function muteTraces(event) {
	var id = event.target.id.split("-").pop()
	var element = document.getElementById(id)
	var buttonElement = document.getElementById(event.target.id)
	if (!element.muted) {
		element.muted = true
		buttonElement.style.opacity = "0.3"
	}else{
		element.muted = false
		buttonElement.style.opacity = "1.0"
	}
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
		setAllTracksToTime(0)
	}
}

function settings() {
	var audioPlayer = document.getElementById("audioPlayerWrapper")
	if (playerSettingsDeployed) {
		audioPlayer.style.bottom = "-90px"
		playerSettingsDeployed = false
	} else {
		audioPlayer.style.bottom = "0px"
		playerSettingsDeployed = true
	}

}

function setAllTracksToTime (time){
	var allTracesId = document.getElementById("allTraces")
	allTracesId.currentTime = time
	for (d=0; d<musicTraces.length; d++){
		var thisTracesId = document.getElementById(musicTraces[d])
		thisTracesId.currentTime = time
	}
	document.getElementById("allTraces").pause()
	for (d=0; d<musicTraces.length; d++){
		document.getElementById(musicTraces[d]).pause()
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
