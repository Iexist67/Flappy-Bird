

// the one and only flappy
let flappy = document.getElementById("flappy");
let positionTop = window.getComputedStyle(flappy).top;
let div = document.getElementById("gameArea");
flappy.style.transform = "rotate(0deg)";

//restart button
let restart = document.getElementById("restart");

// object variable
let object;
let object1;
// game start checker
let gameStart = false;
//jump checker
let pause = false;
let jumpChecker = false;
let velocity;
let positionChecker;
// lose checekr
let lose = false
// letheight
let theHeight = 325;
//speed
let speed = -4;
let ySpeed = 600;
// the position without px run through function
let position = 238;
// const for gravity;
let velocityUp = -10;
const VELOCITYDOWN = 8;
// score
let score = 0;
//gravity
const GRAVITY = 0.4;
// scorestuff
let scoresListHard = [0,0,0];
let scoresListEasy = [0,0,0];
let scoresListMedium = [0,0,0];
let easys = false;
let mediums = true;
let hards = false;
let once = 0;
// hardness
let hardness = -150;
// score board 
let scoreEasyStr;
let scoreMediumStr;
let scoreHardStr;
//hitbox middle x/y coords
let hitboxXPos = 50 + 12; // 12 is half of the hitbox width
let hitboxYPos = position + 12; // 12 is half of the hitbox height
// hitbox var
let hitbox = document.getElementById("hitbox");


//setInterval(intervaledTop, 20);
function intervaledTop(){
    console.log(position);
}

document.addEventListener("keydown", keybinds);
div.addEventListener("click", function(){

    positionChecker = position - 70;
    jumpChecker = true;
    gameStart = true;
    pause = true;
    velocityUp = -6;
    thePause();

});
gameArea.addEventListener("click", keybinds);

function keybinds(event){
    if (event.key === "w" || event.key === "ArrowUp" || event.key === " "){
        positionChecker = position - 70;
        jumpChecker = true;
        gameStart = true;
        pause = true;
        velocityUp = -6;
        thePause();
    }
}

function thePause(){
    setTimeout(() => {
        pause = false;
    }, 100);
}

setInterval(flappyGoUp, 20);

function flappyGoUp(){

    //update hitboxpos y
        hitboxYPos = position + 12
    if(gameStart == true && lose == false){
        if(position <= 468){
           // if(jumpChecker == true){
                velocityUp += GRAVITY;
                position += velocityUp;
                if(velocityUp > 0){
                    flappy.style.transform = "rotate(20deg)";
                }
                if(velocityUp == 0){
                    flappy.style.transform = "rotate(0deg)";
                }
                if(velocityUp < 0){
                    flappy.style.transform = "rotate(-45deg)";
                }
                addPX();
        } else {
            lose = true;
            position = 468;
        } 
    }

    if(position <= 0){
        position = 0;
        lose = true;
    }
}

function addPX(){

    let px = position + "px";
    flappy.style.top = px;

}

function objectAddedWithRandomHeight(){
    addObject(327);
}

objectAddedWithRandomHeight();

function restartObjects(){
    if(ySpeed < -50){
        ySpeed = 400;
        object.style.left = ySpeed + "px";
        object1.style.left = ySpeed + "px";
        theHeight = (Math.floor(Math.random()*250) + 175);
        object.style.top = theHeight + "px";
        object1.style.top = (theHeight + (hardness - 500)) + "px";
        score ++;
        addingTheSpeed();
        document.getElementById("score").innerHTML = score;
    }
    hitbox.style.borderColor = "black";
}
setInterval(restartObjects, 20);

function move(){
    if(gameStart == true && lose == false){
        ySpeed += speed;
        object.style.left = ySpeed + "px";
        object1.style.left = ySpeed + "px";
    }
}

setInterval(move, 20);

function addObject(theHeight){

    object = document.createElement("p");
    object.style.position = "absolute";
    object.style.left = "400px";
    object.style.height = "500px";
    object.style.width = "50px";
    object.style.top = theHeight + "px";
    object.style.border = "2px solid black";
    object.style.margin = "0px";
    object.style.backgroundImage = `url("pipe1.2.png")`;
    object.style.backgroundPosition = "center";
    object.style.backgroundRepeat = "no-repeat";
    object.style.backgroundSize = "cover";
    object.style.zIndex = "555";

    document.getElementById("gameArea").appendChild(object);

    addObjectTop(theHeight + (hardness - 500));
    console.log(object.style.left);

}

function addObjectTop(theHeight1){

    console.log(theHeight1);

    object1 = document.createElement("p");
    object1.style.position = "absolute";
    object1.style.left = "400px";
    object1.style.height = "500px";
    object1.style.width = "50px";
    object1.style.top = theHeight1 + "px";
    object1.style.border = "2px solid black";
    object1.style.margin = "0px";
    object1.style.backgroundImage = `url("pipe1.2.png")`;
    object1.style.backgroundPosition = "center";
    object1.style.backgroundRepeat = "no-repeat";
    object1.style.backgroundSize = "cover";
    object1.style.zIndex = "555";

    document.getElementById("gameArea").appendChild(object1);

}

let inPipeX;
let inPipeY;
 let sideWaysDistance;
 let firstCornerDistance;
 let topSideDistance;
 let secondCornerDistance
 let circleY;

setInterval(checkCollision, 10);
function checkCollision(){

        // circle equation important (x-h)^{2} + (y-k)^{2} = r^{2}

    // checks if hitbox is below the top of the bottom pipe or above the bottom of the top pipe, and runs a distance calculator
    if((hitboxYPos > theHeight + 12) || (hitboxYPos < theHeight + hardness - 12)){
        circleY = 0;

        sideWaysDistance = Math.sqrt(((ySpeed - hitboxXPos) ** 2) + circleY);
        if(sideWaysDistance <= 12){
            inPipeY = true;
            hitbox.style.borderColor = "black";
        }
    }
     
    // checks if hitbox is between the corner of the pipe
    if(((hitboxYPos > theHeight - 12) && (hitboxYPos < theHeight + 12)) || ((hitboxYPos < theHeight + hardness + 12) && (hitboxYPos > theHeight + hardness - 12))){

        if(((hitboxYPos > theHeight - 12) && (hitboxYPos < theHeight + 12))){
            circleY = (hitboxYPos - theHeight) ** 2;
        }
        if(((hitboxYPos < theHeight + hardness + 12) && (hitboxYPos > theHeight + hardness - 12))){
            circleY = (hitboxYPos - (theHeight + hardness)) ** 2;
        }

        firstCornerDistance = Math.sqrt(((ySpeed - 62) ** 2) + circleY);
        if(firstCornerDistance <= 12){
            inPipeY = true;
            hitbox.style.borderColor = "black";
        }
    }
    // checks if hitbox is between the corner of the pipe
    if(((hitboxYPos > theHeight - 12) && (hitboxYPos < theHeight + 12)) || ((hitboxYPos < theHeight + hardness + 12) && (hitboxYPos > theHeight + hardness - 12))){

        if(((hitboxYPos > theHeight - 12) && (hitboxYPos < theHeight + 12))){
            circleY = (hitboxYPos - theHeight) ** 2;
        }
        if(((hitboxYPos < theHeight + hardness + 12) && (hitboxYPos > theHeight + hardness - 12))){
            circleY = (hitboxYPos - (theHeight + hardness)) ** 2;
        }

        secondCornerDistance = Math.sqrt(((ySpeed - (hitboxXPos - 50)) ** 2) + circleY);

        if(secondCornerDistance <= 12){
            inPipeY = true;
            hitbox.style.borderColor = "black";
        }
    }

    // checks if hitbox is at the bottome or top of the pipes
    if(((hitboxYPos > theHeight - 12) || (hitboxYPos < theHeight + hardness + 12)) && (0 <= ySpeed && ySpeed <= 74)){
        
        if(hitboxYPos > theHeight - 12){
        topsideDistance = Math.sqrt(((hitboxYPos - theHeight) ** 2) + 0);
        }
        if(hitboxYPos < theHeight + hardness + 12){
        topsideDistance = Math.sqrt(((hitboxYPos - (theHeight + hardness)) ** 2) + 0);
        }

        if(topsideDistance <= 12){
            inPipeY = true;
            hitbox.style.borderColor = "black";
        }
    }

   inPipeX = (0 <= ySpeed && ySpeed <= 74);
    // inPipeY

    if(inPipeX && inPipeY){
        lose = true;
    }

}

setInterval(loseChecker, 20);

let top3Hard = [];
let top3Medium = [];
let top3Easy = [];

function loseChecker(){
    if(lose == true){
        restart.style.display = "block";
        if(once == 0){
            if(hards){
                scoresListHard.push(score);
                scoresListHard = reorderList(scoresListHard);
                top3Hard = [];
                for (i = 0; i < 3; i++){
                    top3Hard.push(scoresListHard[i]);
                    //top3Hard = undefineChecker(top3Hard);
                }
                update();
            }
            if(mediums){
                scoresListMedium.push(score);
                scoresListMedium = reorderList(scoresListMedium);
                top3Medium = [];
                for (i = 0; i < 3; i++){
                    top3Medium.push(scoresListMedium[i]);
                    //top3Medium = undefineChecker(top3Medium);
                }
                update();
            }
            if(easys){
                scoresListEasy.push(score);
                scoresListEasy = reorderList(scoresListEasy);
                top3Easy = [];
                for(i = 0; i < 3; i++){
                    top3Easy.push(scoresListEasy[i]);
                    //top3Easy = undefineChecker(top3Easy);
                }
                update();
            }
            // code to update the scoreboard
        }
        once = 1;
    }
}

function update(){

    if(hards){
        scoreHardStr = top3Hard[0] + "<br>" + top3Hard[1] + "<br>" + top3Hard[2];
        document.getElementById("textHard").innerHTML = scoreHardStr;
    }
    if(mediums){
        scoreMediumStr = top3Medium[0] + "<br>" + top3Medium[1] + "<br>" + top3Medium[2];
        document.getElementById("textMedium").innerHTML = scoreMediumStr;
    }
    if(easys){
        scoreEasyStr = top3Easy[0] + "<br>" + top3Easy[1] + "<br>" + top3Easy[2];
        document.getElementById("textEasy").innerHTML = scoreEasyStr;
    }

}

function undefineChecker(arr){
    if(arr.length < 2){
        arr.splice(1,0,0,0);
        console.log(arr);
    }
    return arr;
}

function restartGame(){

    lose = false;
    gameStart = false;
    inPipeX = false;
    inPipeY = false;
    position = 238;
    speed = -4;
    score = 0;
    once = 0;
    ySpeed = 600;
    object.style.left = "600px";
    object1.style.left = "600px";
    object.style.top = theHeight + "px";
    object1.style.top = (theHeight + (hardness - 500)) + "px";
    addPX();
    restart.style.display = "none";
    flappy.style.transform = "rotate(0deg)";
    document.getElementById("score").innerHTML = score;
    

}


// brush stuff

let brush1 = document.getElementById("brush1");
brush1.style.left = "0px";
let brush1Left = 0;

let brush2 = document.getElementById("brush2");
brush2.style.left = "350px"
let brush2Left = 350;

const BRUSHSPEED = -2;

setInterval(brushMove, 20);
function brushMove(){
    if(gameStart == true && lose == false){
        brush1Left += BRUSHSPEED;
        brush2Left += BRUSHSPEED;
        brush1.style.left = brush1Left + "px";
        brush2.style.left = brush2Left + "px";
        if(brush1Left <= -350){
            brush1.style.left = "350px";
            brush1Left = 350;
        }
        if(brush2Left <= -350){
            brush2.style.left = "350px";
            brush2Left = 350;
        }
    }
}

const CITYSPEED = -1;

let background1 = document.getElementById("background1");
background1.style.left = "0px";
let background1Left = 0;

let background2 = document.getElementById("background2");
background2.style.left = "350px"
let background2Left = 350;

setInterval(cityMove, 20);
function cityMove(){
    if(gameStart == true && lose == false){
        background1Left += CITYSPEED;
        background2Left += CITYSPEED; 
        background1.style.left = background1Left + "px";
        background2.style.left = background2Left + "px";
        if(background1Left <= -350){
            background1.style.left = "350px";
            background1Left = 350;
        }
        if(background2Left <= -350){
            background2.style.left = "350px";
            background2Left = 350;
        }
    }
}

const SKYSPEED = -0.1;

let sky1 = document.getElementById("sky1");
sky1.style.left = "0px";
let sky1Left = 0;

let sky2 = document.getElementById("sky2");
sky2.style.left = "350px"
let sky2Left = 350;

setInterval(skyMove, 20);
function skyMove(){
    if(gameStart == true && lose == false){
        sky1Left += SKYSPEED;
        sky2Left += SKYSPEED; 
        sky1.style.left = sky1Left + "px";
        sky2.style.left = sky2Left + "px";
        if(sky1Left <= -350){
            sky1.style.left = "350px";
            sky1Left = 350;
        }
        if(sky2Left <= -350){
            sky2.style.left = "350px";
            sky2Left = 350;
        }
    }
}

// speed adder function

function addingTheSpeed() {

    if(Number.isInteger(score / 1)){
        speed -= 0.1;
    }

}

function hard(){
    console.log("hard");
    hards = true;
    mediums = false;
    easys = false;
    hardness = -100;
}
function medium(){
    console.log("medium");
    mediums = true;
    hards = false;
    easys = false;
    hardness = -150;
}
function easy(){
    console.log("easy");
    easys = true;
    mediums = false;
    hards = false;
    hardness = -200;
}

function reorderList(arr){
    let min = null;
    let max = null;
    for(let i=0; i < arr.length; i++){
        for(let i=0; i < arr.length; i++){
            min = arr[i];
            max = arr[i+1];
            if(min < max){
                [arr[i], arr[i+1]] = [arr[i+1], arr[i]]; 
            }
        }
    }
    return arr;
}