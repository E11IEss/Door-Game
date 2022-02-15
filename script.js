let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');
let startButton = document.getElementById('start');
let scoreButton = document.getElementById('score');
let streakButton = document.getElementById('best');
let botDoorPath = 'https://content.codecademy.com/projects/chore-door/images/robot.svg';
let beachDoorPath = 'https://content.codecademy.com/projects/chore-door/images/beach.svg';
let spaceDoorPath = 'https://content.codecademy.com/projects/chore-door/images/space.svg';
let closedDoorPath = 'https://content.codecademy.com/projects/chore-door/images/closed_door.svg';
let numClosedDoors = 3;
let openDoor1 = null;
let openDoor2 = null;
let openDoor3 = null;
let currentlyPlaying = true;

const randomChoreDoorGenerator = () => {
  const choreDoor = Math.floor((Math.random()*numClosedDoors));
  if(choreDoor === 0){
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  }
   else if(choreDoor === 1){
    openDoor1 = beachDoorPath;
    openDoor2 = botDoorPath;
    openDoor3 = spaceDoorPath;
  }
   else{
    openDoor1 = beachDoorPath;
    openDoor2 = spaceDoorPath;
    openDoor3 = botDoorPath;
  }
} 

doorImage1.onclick = () => {
  if(currentlyPlaying && !isClicked(doorImage1)){
  doorImage1.src = openDoor1;
  playDoor(doorImage1);
  }
}

doorImage2.onclick = () => {
  if(currentlyPlaying && !isClicked(doorImage2)){
  doorImage2.src = openDoor2;
  playDoor(doorImage2);
  }
}

doorImage3.onclick = () => {
  if(currentlyPlaying && !isClicked(doorImage3)){
  doorImage3.src = openDoor3;
  playDoor(doorImage3);
  } 
}

startButton.onclick = () => {
  if(!currentlyPlaying){
  startRound();
  }
}

const startRound = () => {
  numClosedDoors = 3;
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  startButton.innerHTML = 'Good luck!';
  currentlyPlaying = true;
  randomChoreDoorGenerator();
}

const isClicked = door => {
  if(door.src === closedDoorPath){
    return false;
  } else {
    return true;
  }
}

const isBot = door => {
  if(door.src === botDoorPath){
    return true;
  } else{
    return false;
  }
}

const gameOver = status => {
  if(status === 'win'){
    startButton.innerHTML = 'You win! Play again?';
    scoreCount('win');
  } else {
    startButton.innerHTML = 'Game over! Play again?';
    scoreCount();
  }
  currentlyPlaying = false;
}

const playDoor = door => {
  numClosedDoors--;
  if(numClosedDoors === 0){
    gameOver('win');
  } else if(isBot(door)){
    gameOver();
  }
}

let numberWin = 0;
let streak = 0;
const scoreCount = score => {
  if(score === 'win'){
    numberWin++;
    if(numberWin > streak){
    streak++;}
  } else{
    numberWin = 0;
  }
  scoreButton.innerHTML = `Current streak: ${numberWin}`;
  streakButton.innerHTML = `Best streak: ${streak}`;
}


startRound();
