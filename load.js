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

var scoreSubdivisions = 0;
var scoreTimes  = []

var staticData = []

function getData(data) {
  buildMenu(data)
  staticData = data
	//get ID and check for duplicates
	for(i=0; i<data.length; i++){
		rowData = data[i]
		console.log();
		if (rowData.Id == window.location.search.substr(1)){
			if (currentId == "none"){
				currentId = rowData.Id
				for(d=0; d<posibleMusicTraces.length; d++){

					var times = Number(rowData[posibleMusicTraces[d]])
					if (times>=2){
						for(j=0; j<times; j++){
							musicTraces.push(posibleMusicTraces[d] + Number(j+1))
						}
					}else if (times == 1){
						musicTraces.push(posibleMusicTraces[d] + times)
					}
				}
				document.getElementById("allTraces").src = "assets/audio/" + currentId +".mp3"

				for (d=0; d<musicTraces.length; d++){
					var audio = document.createElement("audio");
					audio.src = "assets/audio/" + currentId +"-"+ musicTraces[d]+".mp3"
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

        var rightButtons = document.getElementById("rightButtons")

        var printLink = document.createElement("a")
        printLink.setAttribute('href', currentLink + "/assets/pdf/"+currentId+".pdf");
        printLink.innerHTML = "<button id=\"printButton\"></button>"
        printLink.setAttribute('target', '_tab');
        var shareLink = document.createElement("a")
        shareLink.innerHTML = "<button id=\"shareButton\"></button>"
        shareLink.href = "https:\//www.facebook.com/sharer/sharer.php?u=" +currentLink+ "/assets/pdf/"+currentId+".pdf"
        shareLink.setAttribute('target', '_tab');
        var downloadLink = document.createElement("a")
        downloadLink.href = currentLink + "/assets/pdf/"+currentId+".pdf"
        downloadLink.download = currentId + ".pdf"
        downloadLink.innerHTML = "<button id=\"downloadButton\"></button>"

        rightButtons.appendChild(printLink)
        rightButtons.appendChild(shareLink)
        rightButtons.appendChild(downloadLink)

        var descriptionHead = document.getElementById("descriptionHead")
        var descriptionMetadata = document.getElementById("descriptionMetadata")
        var descriptionTextDiv = document.getElementById("descriptionTextWrappper")

        var descriptionTitle = document.createElement("p")
        descriptionTitle.innerHTML = rowData.Titulo
        descriptionTitle.id = "descriptionTitle"

        var descriptionSubtitle = document.createElement("p")
        descriptionSubtitle.innerHTML = rowData.Subtitulo
        descriptionSubtitle.id = "descriptionSubtitle"

        descriptionHead.appendChild(descriptionTitle)
        if (rowData.Subtitulo != ""){
          descriptionMetadata.appendChild(descriptionSubtitle)
        }

        var metadataCategoryClass = document.createElement("p")
        if (rowData.Categoria != ""){
          if (rowData.Clase != ""){
            metadataCategoryClass.innerHTML = rowData.Categoria +"</br>"+rowData.Clase
          } else {
            metadataCategoryClass.innerHTML = rowData.Categoria
          }
          metadataCategoryClass.id = "metadataCategoryClass"
          descriptionMetadata.appendChild(metadataCategoryClass)
        }else if (rowData.Clase != ""){
          metadataCategoryClass.innerHTML = rowData.Clase
          metadataCategoryClass.id = "metadataCategoryClass"
          descriptionMetadata.appendChild(metadataCategoryClass)
        }
        var descriptionText = document.createElement("p")
        descriptionText.id = "descriptionText"
        descriptionText.innerHTML = rowData.Descripcion

        descriptionTextDiv.appendChild(descriptionText)

        scoreSubdivisions = Number(rowData.Sistemas)
        var obj = rowData.SegundosSistemas.split(';')
        for (j=0;j<obj.length;j++){
          var indivTimes = {e:0, t:0}
          var splitObj = obj[j].split(',')
          for (y=0;y<splitObj.length;y++){
            if (y == 0){
              indivTimes.t = Number(splitObj[y])
            }else {
              indivTimes.e = Number(splitObj[y])
            }
          }
          scoreTimes.push(indivTimes)
        }

			}else if (currentId == rowData.Id){
				console.log("ERROR: DUPLICATE ID");
			}
		}
	}

	//set ID to content and checks if ID exists
	if (currentId != "none"){
		// console.log("url('assets/" + currentId + ".jpg')");
		var background = document.getElementById("bg")
    var mainContentBackground = document.getElementById("mainContent")
    var musicScoreWrapper = document.getElementById("musicScoreWrapper")
    var scoreDescriptionWrapper = document.getElementById("scoreDescriptionWrapper")
		background.style.background = "url('assets/" + currentId + ".jpg')"
		background.style.backgroundSize = "80%"
		background.style.backgroundRepeat = "no-repeat"
		background.style.opacity = 1.0;
    mainContentBackground.style.opacity = 1.0;

	}else {
		console.log("ERROR: NO ID FOUND");
    alert("Por favor, inserte un nomnbre valido en el Url.")
	}
}


function buildMenu(data){

  var menu = document.getElementById("menu")
  for(i=0; i<data.length; i++){
    rowData = data[i]

    var menuTitle = document.createElement("p")
    menuTitle.innerHTML = rowData.Titulo
    menuTitle.className = "menuTitleClass"
    menuTitle.id = rowData.Id + "-menuItemTitle"

    var menuSubtitle = document.createElement("p")
    menuSubtitle.innerHTML = rowData.Categoria +" | "+ rowData.Clase
    menuSubtitle.className = "menuSubtitleClass"

    var menuLink = document.createElement("a")
    menuLink.id = rowData.Id + "-menuItem"
    // menuLink.addEventListener("click", function(e) {
    //   var itemId = e.target.id.replace('-menuItemTitle','');
    //   changeQuery(itemId)
    //   reloadWithId(itemId)
    // }, false);
    menuLink.href = "https://varusgarcia.github.io/musicScores?" + rowData.Id
    menuLink.className = "menuButton"

    var menuDiv = document.createElement("div")
    menuDiv.className = "menuButtonDiv"

    menuLink.appendChild(menuTitle)
    menuLink.appendChild(menuSubtitle)
    menuDiv.appendChild(menuLink)
    menu.appendChild(menuDiv)
  }
}

function reloadWithId(itemId){
  for (i=0; i<staticData.length; i++){
    var rowData = staticData[i]
    if (rowData.Id == itemId){


    }
  }
}
