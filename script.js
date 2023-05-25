// Reset button and show reset button on set height of page
const reset = document.querySelector(".reset");

window.addEventListener("scroll", fixNav);

function fixNav() {
  if (window.scrollY > reset.offsetHeight + 650) {
    reset.classList.add("active");
  } else {
    reset.classList.remove("active");
  }
}

//Pokemon health bar elements and health number elements
const playerHp = document.getElementById("first");
const firstHpNumber = document.getElementById("first-HP");
const wildPokemonHp = document.getElementById("second");
const secondHpNumber = document.getElementById("second-HP");
//Pokemon elements
const tedi = document.querySelector(".tedi");
const bulba = document.querySelector(".bulba");
//Sound elements
const battleSound = document.getElementById("battlesound");
const victorySound = document.getElementById("victorysound");
const atkSound = document.getElementById("atksound");
const atks = document.querySelectorAll(".atk");
//Start game button/link
const startStage1 = document.getElementById("startStage1");
//Attack elements
const scratch = document.getElementById("scratch");
const vinevhip = document.getElementById("vinevhip");
const growl = document.getElementById("growl");
const solarbeam = document.getElementById("solarbeam");
//Button elements
const winButton = document.querySelector(".gamewin");
const loseButton = document.querySelector(".gamelost");
//Text element
const text = document.querySelector(".text");
//Both pokemon Hp- Hit points
let wildHpPoints = 100;
let playerPokemon = 80;
//Random pokemon spawn each game:
const pokemon = [
  "Teddiursa",
  "Charmander",
  "Squirtle",
  "Jigglypuff",
  "Chansey",
  "Eevee",
  "Mew",
];
// random number for pokemon spawn
var randNum = Math.floor(Math.random() * (6 + 1));
// Getting pokemon img and name elements from DOM
const pokemonPic = document.getElementById("pokemon-pic");
const catchablePokemon = document.querySelector(".catchablePokemon");
const pokemonName = document.getElementById("pokemon-name");
function randomPokemon() {
  pokemonPic.src = `/assets/images/${randNum}.png`;
  catchablePokemon.src = pokemonPic.src;
  pokemonName.textContent = pokemon[randNum];
}
//Enemy pokemon attack power variable
let enemyPower;
// Player pokemon attack powers
let solarBeam = Math.floor(Math.random() * 30) + 20;
const attacks = [
  "Scratch",
  "Growl, enemy attack has lowered",
  "Vine Vhip",
  "Solar Beam",
];
const attackPower = [15, 0, 32, solarBeam];
//Start playing Battle music and spawn random pokemon
startStage1.addEventListener("click", () => {
  battleSound.play();
  randomPokemon();
  hideText2();
});
//Play attack sound:
atks.forEach((atk) => {
  atk.addEventListener("click", () => {
    atkSound.play();
  });
});
// Play  atack sound
function enemyAtkSound() {
  atkSound.play();
}
//Play wining music:
function winningMusic() {
  victorySound.play();
}
//Visual animation, show/hide text and buttons
function showWinButton() {
  winButton.style.visibility = "visible";
}
function showLoseButton() {
  loseButton.style.visibility = "visible";
}
function displayedText(idx) {
  text.textContent = `Bulbasaur used ${attacks[idx]}, ${pokemon[randNum]} fights back..`;
}
function showText() {
  text.style.visibility = "visible";
}
function hideText() {
  text.style.visibility = "hidden";
}
function freezeButtons() {
  scratch.style.pointerEvents = "none";
  growl.style.pointerEvents = "none";
  vinevhip.style.pointerEvents = "none";
  solarbeam.style.pointerEvents = "none";
}
function unFreezeButtons() {
  scratch.style.pointerEvents = "auto";
  growl.style.pointerEvents = "auto";
  vinevhip.style.pointerEvents = "auto";
  solarbeam.style.pointerEvents = "auto";
}
function atkAnimation() {
  tedi.classList.add("attacked");
  tedi.classList.remove("attackerL");
  bulba.classList.remove("attacked");
  bulba.classList.add("attackerR");
}
function enemyAtkAnimation() {
  tedi.classList.remove("attacked");
  tedi.classList.add("attackerL");
  bulba.classList.add("attacked");
  bulba.classList.remove("attackerR");
}
// color Hp bar when its gets low
function changeHpbarColor() {
  if (playerPokemon <= 45) {
    playerHp.style.background = "red";
  }
  if (wildHpPoints <= 45) {
    wildPokemonHp.style.background = "red";
  }
}
// Check lose conditions
function checkLoseCondition() {
  if (playerPokemon <= 0) {
    playerHp.style.width = `0%`;
    text.textContent = " Bulbasaur fainted, try again..";
    setTimeout(showText, 3000);
    setTimeout(showLoseButton, 3000);
    battleSound.pause();
    battleSound.currentTime = 0;
    gameOverplay();
  } else {
    setTimeout(hideText, 4000);
    setTimeout(unFreezeButtons, 4000);
  }
}
// Check win conditions
function checkWinConditions() {
  if (wildHpPoints <= 0) {
    wildPokemonHp.style.width = `0%`;
    text.textContent = ` ${pokemon[randNum]} fainted, you won, prepare for next stage!`;
    setTimeout(showText, 3000);
    setTimeout(showWinButton, 3000);
    setTimeout(winningMusic, 1000);
    battleSound.pause();
    battleSound.currentTime = 0;
  } else {
    setTimeout(enemyAtk, 3000);
    setTimeout(enemyAtkSound, 3300);
    displayedText(idx);
    showText();
  }
}
//Calculation of damage given to opposing pokemon and damage received plus win/lose conditions
function enemyAtk() {
  enemyPower = Math.floor(Math.random() * 50) + 1;
  playerPokemon = playerPokemon - enemyPower;
  playerHp.style.width = `${playerPokemon}px`;
  firstPokemonHpRemover();
  enemyAtkAnimation();
  changeHpbarColor();
  checkLoseCondition();
}

function damageGiven(idx) {
  freezeButtons();
  wildHpPoints = wildHpPoints - attackPower[idx];
  wildPokemonHp.style.width = `${wildHpPoints}%`;
  changeHpbarColor();
  checkWinConditions();
}

// Attacks event listeners
scratch.addEventListener("click", () => {
  idx = 0;
  damageGiven(idx);
  atkAnimation();
  secondPokemonHpRemover();
});

growl.addEventListener("click", () => {
  idx = 1;
  atkAnimation();
  growlStatus();
  secondPokemonHpRemover();
});
vinevhip.addEventListener("click", () => {
  idx = 2;
  atkAnimation();
  damageGiven(idx);
  secondPokemonHpRemover();
});
solarbeam.addEventListener("click", () => {
  idx = 3;
  atkAnimation();
  damageGiven(idx);
  secondPokemonHpRemover();
});
//Growl attack
function growlStatus() {
  freezeButtons();
  displayedText(idx);
  showText();
  setTimeout(growlAtk, 3000);
  setTimeout(enemyAtkSound, 3300);
}
function growlAtk() {
  enemyPower = Math.floor(Math.random() * 10) + 1;
  playerPokemon = playerPokemon - enemyPower;
  playerHp.style.width = `${playerPokemon}px`;
  firstPokemonHpRemover();
  enemyAtkAnimation();
  checkLoseCondition();
  changeHpbarColor();
}
//Hp point counter decrement second pokemon
let from = 100;
let to;
function secondPokemonHpRemover() {
  to = wildHpPoints;
  let step = to > from ? 1 : -1;
  let interval = 50;

  if (from == to) {
    secondHpNumber.textContent = `${from}/100`;
    return;
  }

  let counter = setInterval(function () {
    from += step;
    secondHpNumber.textContent = `${from}/100`;

    if (from == to) {
      clearInterval(counter);
    }
  }, interval);
}
//Hp point counter decrement first pokemon
let start = 80;
let finish;
function firstPokemonHpRemover() {
  finish = playerPokemon;
  let step = finish > start ? 1 : -1;
  let interval = 50;

  if (start == finish) {
    firstHpNumber.textContent = `${start}/80`;
    return;
  }

  let counter = setInterval(function () {
    start += step;
    firstHpNumber.textContent = `${start}/80`;

    if (start == finish) {
      clearInterval(counter);
    }
  }, interval);
}
//Try again button, reset all status changes to stage 1 pokemon
loseButton.addEventListener("click", () => {
  wildHpPoints = 100;
  playerPokemon = 80;
  solarBeam = Math.floor(Math.random() * 40);
  loseButton.style.visibility = "hidden";
  hideText();
  unFreezeButtons();
  tedi.classList.remove("attackerL");
  bulba.classList.remove("attacked");
  tedi.classList.remove("attacked");
  bulba.classList.remove("attackerR");
  wildPokemonHp.style.width = `100%`;
  playerHp.style.width = `100%`;
  playerHp.style.background = "greenyellow";
  wildPokemonHp.style.background = "greenyellow";
  firstHpNumber.textContent = `80/80`;
  secondHpNumber.textContent = `100/100`;
  start = 80;
  from = 100;
  battleSound.play();
  gameOverStop();
});
winButton.addEventListener("click", () => {
  victorySound.pause();
  victorySound.currentTime = 0;
  battleSound.currentTime = 0;
  battleSound.play();
});
// Stage 2
const time = document.getElementById("time");
const text2 = document.querySelector(".text2");
const container = document.querySelector(".container2");
const pokeball = document.querySelector(".pokeball");
const message = document.querySelector(".instructions-stage2");
const pokeClick = document.getElementById("pokeclick");
const gameOverSound = document.getElementById("gameoversound");
let seconds = 14;
let score = 0;
// clicking on first spawned pokemon to start stage 2 game
catchablePokemon.addEventListener("click", () => {
  playPokeClick();
  setTimeout(createPokemon, 1000);
  startGame();
  catchablePokemon.classList.add("caught");
  catchablePokemon.style.pointerEvents = "none";
});
function startGame() {
  setInterval(increaseTime, 1000);
  setInterval(checkGameOver, 1000);
}
function increaseTime() {
  time.innerHTML = `${seconds}s`;
  seconds--;
  if (seconds <= 0) {
    seconds = 0;
  }
}
function showText2() {
  text2.style.visibility = "visible";
}
function hideText2() {
  text2.style.visibility = "hidden";
}
function checkGameOver() {
  if (score < 8 && seconds <= 0) {
    text2.innerHTML = `You were to slow ${pokemon[randNum]} got away!`;
    showText2();
    container.style.visibility = "hidden";
    battleSound.pause();
    gameOverplay();
  }
}
function playPokeClick() {
  pokeClick.play();
}
function gameOverStop() {
  gameOverSound.pause();
  gameOverSound.currentTime = 0;
}
function gameOverplay() {
  gameOverSound.play();
}
// Create pokemon
function createPokemon() {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");

  const { x, y } = getRandomLocation();

  pokemonEl.style.top = `${y}px`;
  pokemonEl.style.left = `${x}px`;

  pokemonEl.innerHTML = `<img src="${catchablePokemon.src}"/>`;
  pokemonEl.addEventListener("click", catchPokemon);

  container.appendChild(pokemonEl);
}
// random pokemon location in window container
function getRandomLocation() {
  const x = Math.random() * 400 + 10;
  const y = Math.random() * 400 + 10;

  return { x, y };
}
// clicking on pokemon
function catchPokemon() {
  playPokeClick();
  this.style.pointerEvents = "none";
  increaseScore();
  this.classList.add("caught");
  setTimeout(() => this.remove(), 1000);
  if (score >= 8 && seconds > 0) {
    text2.innerHTML = `Gotcha ${pokemon[randNum]} was caught!!`;
    battleSound.pause();
    battleSound.currentTime = 0;
    winningMusic();
    showText2();
    clearInterval(checkGameOver, 1000);
    clearInterval(increaseTime, 1000);
    container.style.display = "none";
    pokeball.style.display = "block";
    message.textContent = "Congratulations you beat the game :D";
  } else {
    addPokemon();
  }
}
// increase score on click
function increaseScore() {
  score++;
}
function addPokemon() {
  setTimeout(createPokemon, 1000);
}
