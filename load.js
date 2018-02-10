document.addEventListener('DOMContentLoaded', function() {
  var URL = "https://docs.google.com/spreadsheets/d/1EZGMC3akrhkV_5Mgxyxt1ExEfPNxbA2Za1s1C_hDLhc/edit?usp=sharing"
  Tabletop.init({
    key: URL,
    callback: getData,
    simpleSheet: true
  })
})

var currentId = "none";
var musicTraces = [];
var posibleMusicTraces = ["Voz", "Guitarra", "Pandereta"]

function getData(data) {
	//get ID and check for duplicates
	for(i=0; i<data.length; i++){
		rowData = data[i]
		console.log();
		if (rowData.Id == window.location.search.substr(1)){
			if (currentId == "none"){
				currentId = rowData.Id
				for(d=0; d<posibleMusicTraces.length; d++){
					var times = Number(rowData[posibleMusicTraces[d]])
					console.log(times);
					if (times>=2){
						for(j=0; j<times; j++){
							musicTraces.push(posibleMusicTraces[d] + Number(j+1))
						}
					}else if (times == 1){
						musicTraces.push(posibleMusicTraces[d] + times)
					}
				}
				document.getElementById("allTraces").src = "assets/music/" + currentId +".mp3"
				for (d=0; d<musicTraces.length; d++){
					var audio = document.createElement("audio");
					audio.src = "assets/music/" + currentId +"-"+ musicTraces[d]+".mp3"
					audio.id = musicTraces[d]
					document.getElementById("musicTraces").appendChild(audio);

					var button = document.createElement("button");
					button.type = "button"
					button.className = "muteButton"
					button.addEventListener('click', muteTraces, false);
					button.id = "button-" + musicTraces[d]
					document.getElementById("audioPlayerMuteButtons").appendChild(button);
					document.getElementById("button-" + musicTraces[d]).style.background = "url('assets/Icon/" + musicTraces[d] + ".png')"
				}

			}else if (currentId == rowData.Id){
				console.log("ERROR: DUPLICATE ID");
			}
		}
	}

	//set ID to content and checks if ID exists
	if (currentId != "none"){
		// console.log("url('assets/" + currentId + ".jpg')");
		var background = document.getElementById("background")
		background.style.background = "url('assets/" + currentId + ".jpg')"
		background.style.backgroundSize = "90%"
		background.style.backgroundRepeat = "no-repeat"
		background.style.opacity = 1.0;
	}else {
		console.log("ERROR: NO ID FOUND");
	}
}
