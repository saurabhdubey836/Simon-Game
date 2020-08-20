var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
//need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;
// to keep the level
var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+" "+level);
        nextSequence();
        started = true;
    }
});

// with the help of jQuery to decide  when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    
    // inserting in userClickedPattern....
    userClickedPattern.push(userChosenColour);

    //Play Sound...
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        // for wrong answer....
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        
        //Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);


        startOver();
    }
}


function nextSequence(){

    userClickedPattern = [];

    level++;//increase the level by 1 every time nextSequence() is called.

    $("#level-title").text("Level "+level);

    var randomNumber = Math.round(Math.random()*4) ;

    //getting a random color from the array buttonColours
    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);

    // To animate the buttons used j query
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    // To get the sound effect in the game...
    playSound(randomChosenColour);
}


function playSound(name){
    // to play the sound in java Sript
    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");

    // set Timeout function in event in JavaScript
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")
    },100);
}

function startOver(){
    // reset all the values..
    level=0;
    gamePattern=[];
    started=false;
}


