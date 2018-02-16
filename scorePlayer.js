var fullScreen = false;
var musicScoreButton = document.getElementById("musicScoreButton")
var musicScoreGoFullScreenButton = document.getElementById("scoreOnTop")
var topBar = document.getElementById("topBarWrapper")
var targetSubdivision = 0;
var subdivisionChanged = false;

musicScoreButton.onmouseover = function(){
  if (!fullScreen){
    musicScoreGoFullScreenButton.style.opacity = "1"
    musicScoreButton.style.opacity = "0.7";
  }
}
musicScoreButton.onmouseout = function(){
  musicScoreGoFullScreenButton.style.opacity = "0"
  musicScoreButton.style.opacity = "1";
}


function goFullScreen(){
  var musicScoreWrapper = document.getElementById("musicScoreWrapper")
  var scoreDescriptionWrapper = document.getElementById("scoreDescriptionWrapper")
  if (!fullScreen){
    topBar.style.opacity = "0"
    musicScoreGoFullScreenButton.style.opacity = "0"
    musicScoreButton.style.opacity = "1";
    musicScoreWrapper.style.width = "100%"
    musicScoreWrapper.style.transition = "all 0.5s ease-in 0.5s"
    musicScoreWrapper.style.marginTop = "50"
    scoreDescriptionWrapper.style.opacity = "0"
    scoreDescriptionWrapper.style.transition = "opacity 0.5s ease-in"
    setTimeout(function(){ scoreDescriptionWrapper.style.display = "none" }, 500);
    fullScreen = true;

  } else {
    topBar.style.opacity = "1"
    musicScoreWrapper.style.width = "35%"
    musicScoreWrapper.style.transition = "all 0.5s ease-out"
    musicScoreWrapper.style.marginTop = "200"
    scoreDescriptionWrapper.style.display = "inline-block"
    setTimeout(function(){ scoreDescriptionWrapper.style.opacity = "1" }, 500);
    fullScreen = false;
  }
}
function moveScore(slider){
  if (fullScreen){

    var scrollableHeight = musicScoreButton.height + 50 + 70 - window.innerHeight
    if (scrollableHeight >= 50){
      var subdivisionHeight = musicScoreButton.height/scoreSubdivisions
      if (targetSubdivision != getTargetSubdivision()){
        subdivisionChanged = true;
        targetSubdivision = getTargetSubdivision()
      }

      var targetDistance = 50 + (targetSubdivision * subdivisionHeight) - (subdivisionHeight/2)
      var distanceToTarget = targetDistance - (window.innerHeight/2)
      console.log(distanceToTarget);
      if (subdivisionChanged) {
        subdivisionChanged = false;
        console.log("SCROLLING!");
        scrollBy(distanceToTarget - document.body.scrollTop, 1000)
        //window.scrollTo(0, distanceToTarget);
      }
    }
  }

  function getTargetSubdivision (){
    for (i=0; i<scoreTimes.length; i++){
      if (slider < scoreTimes[i].t){
        if (scoreTimes[i].e - 1 != 0){
          return scoreTimes[i].e - 1
        } else {
          return scoreSubdivisions
        }
      }else if (i == scoreTimes.length - 1){
        return scoreTimes[i].e
      }
    }
  }

  function scrollBy(distance, duration) {

    var initialY = document.body.scrollTop;
    var y = initialY + distance;
    var baseY = (initialY + y) * 0.5;
    var difference = initialY - baseY;
    var startTime = performance.now();

    function step() {
        var normalizedTime = (performance.now() - startTime) / duration;
        if (normalizedTime > 1) normalizedTime = 1;

        window.scrollTo(0, baseY + difference * Math.cos(normalizedTime * Math.PI));
        if (normalizedTime < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}
}
