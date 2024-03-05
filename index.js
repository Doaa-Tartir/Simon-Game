var gameMoves=[], userMoves=[], colors = ["green" , "red", "blue", "yellow"];
var inProgress=false, level=0;
$(document).keypress(function(){
        if(!inProgress){
            inProgress=true;
            $("#level-title").text("Level 0");
            console.log("restarted");
            gameMove();
            }         
});

function gameMove(){
    userMoves=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*colors.length);
    gameMoves.push(colors[randomNumber]);
    $("."+colors[randomNumber]).fadeIn(100).fadeOut(100).fadeIn(100);
    playAudio(colors[randomNumber]);
}

$(".btn").on("click", function() {
    id = $(this).attr("id");
    $("div ."+id).addClass("pressed");
        setTimeout(function(){
            $("div ."+id).removeClass("pressed");
            },100);
        playAudio(id)
        userMoves.push(id);
        checkMoves(userMoves.length-1);
});

function checkMoves(currentLevel){
    console.log(currentLevel);
        if(gameMoves[currentLevel]===userMoves[currentLevel]){
         if (userMoves.length === gameMoves.length){
            setTimeout(function () {
              gameMove();
            }, 1000);
          }
        }
        else{
            playAudio("wrong");
            $("body").addClass("game-over");
            setTimeout(function(){
            $("body").removeClass("game-over");
            },100);
            $("#level-title").text("Game Over 👾, Press Any Key to Restart");
            startOver();
         }
     
}

function playAudio(name){
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function startOver(){
inProgress=false;
level=0;
gameMoves=[];
userMoves=[];
}


