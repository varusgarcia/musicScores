function changeQuery(event) {
  window.history.pushState({path:event},'','?' + event);
}

var menuOpen = false;

function openCloseMenu(){
  var menuWrapper = document.getElementById("menuWrapper")
  var scoreDescriptionWrapper = document.getElementById("scoreDescriptionWrapper")
  var musicScore = document.getElementById("musicScoreWrapper")
  var openCloseMenuButton = document.getElementById("openCloseMenuButton")
  var topBarWrapper = document.getElementById("topBarWrapper")
  if (menuOpen){
    menuWrapper.style.width = "0%"
    menuWrapper.style.opacity = "0"
    musicScore.style.width = "35%"
    scoreDescriptionWrapper.style.width = "65%"
    openCloseMenuButton.style.transform = "rotate(0deg)"
    topBarWrapper.style.marginLeft = "44px"
    menuOpen = false;
  }else {
    musicScore.style.width = "33%"
    menuWrapper.style.opacity = "1"
    scoreDescriptionWrapper.style.width = "33%"
    menuWrapper.style.width = "33%"
    openCloseMenuButton.style.transform = "rotate(180deg)"
    topBarWrapper.style.marginLeft = "28%"
    menuOpen = true;
  }
}

function menuItemTapped(event) {
  console.log(event.id);
}

function print() {
   var url = "https:\/\/varusgarcia.github.io/musicScores/assets/pdf/" +currentId+ ".pdf"
  var win = window.open(url, '_blank');
  win.focus();
}

function share(){

}

function download(){

}
