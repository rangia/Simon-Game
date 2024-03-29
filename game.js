var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level =0;


$(".btn").click(function(){
var userChosenColor = this.id;
userClickedPattern.push(userChosenColor);
playSound(userChosenColor);
animatePress(userChosenColor);
checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(){
  if(!started){
  // $("h1").text("Level "+level);
  nextSequence();
started=true;}
});

function nextSequence(){
    userClickedPattern = [];
    level=level+1;
    $("h1").text("Level "+level);
var randomNumber=  Math.floor((Math.random() * 4) );
 var randomChosenColor =buttonColors[randomNumber];
 gamePattern.push(randomChosenColor);
 $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColor);
}

function playSound(name){
  var audio = new Audio('sounds/'+name+'.mp3');
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){$("#"+currentColor).removeClass("pressed")},100);
}

function checkAnswer(position) {
    if (gamePattern[position] === userClickedPattern[position]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    }
    else {
      var wrongSound = "wrong";
      playSound(wrongSound);
      $("body").addClass("game-over");
      setTimeout(function(){$("body").removeClass("game-over")},200);
      $("h1").text("Game Over, Press Any Key to Restart")
      startOver();
      console.log("wrong");

    }

}

function startOver(){
  level =0;
  started=false;
  userClickedPattern=[];
  gamePattern=[];
}
