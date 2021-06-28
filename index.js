
var buttonColours=["red","blue","yellow","green"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

$(document).keypress(function()
{
  if(!started)
  {
    $("h1").text("Level "+level);
    nextSequence();
    started=true;
  }
});

$(".btn").click(function()
{
   var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);  
   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
      if(userClickedPattern.length==gamePattern.length)
      {
      setTimeout(function(){
        nextSequence();
      },1000);
      }
    }
    else
    {
      playSound("wrong");
      $("body").addClass("game-over");
      $("h1").text("Game Over, Press Any Key To Restart");
      setTimeout(function(){
        $("body").removeClass("game-over")
      },200);
      startOver();
    }
}

function nextSequence()
{
  userClickedPattern =[];
  level++;
  $("h1").text("Level "+level);
  var randomNumber=(Math.random())*4;
    randomNumber=Math.floor(randomNumber);
    var randomChosenColor =buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
   
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name)
{
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour)
{
  $("#"+currentColour).addClass("pressed");
  setTimeout(function()
  {
    $("#"+currentColour).removeClass("pressed")
  },100);
}

function startOver()
{
  level=0;
  gamePattern=[];
  started=false;
}