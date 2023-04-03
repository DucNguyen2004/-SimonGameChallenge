// alert("Hello");
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var start = false;
var level = 0;
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickPattern.push(userChosenColor);
  //   console.log(userClickPattern);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickPattern.length - 1);
});

$(document).keydown(function () {
  if (!start) {
    $("#level-title").text("Level " + level);
    nextSequence();
    start = true;
  }
});

function nextSequence() {
  userClickPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
  audio.play();
}

function checkAnswer(curentlLevel) {
  if (gamePattern[curentlLevel] === userClickPattern[curentlLevel]) {
    console.log("success");
    if (userClickPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function playSound(name) {
    var playAudio = new Audio("sounds/" + name + ".mp3");
    playAudio.play();
  }
  
  function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

function startOver() {
  level = 0;
  gamePattern = [];
  start = false;
}
