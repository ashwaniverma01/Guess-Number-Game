let randomNumber = Math.floor(Math.random() * 100) + 1;
console.log(randomNumber);

const submit = document.querySelector("#subt");
const userInput = document.querySelector("#guessInput");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".resultParas");

const p = document.createElement("p");

let prevGuess = [];
let numGuess = 1;
let playGame = true;

if (playGame) {
  submit.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert("Please enter a valid number");
  } else if (guess < 1) {
    alert("Please enter a number greater than 1");
  } else if (guess > 100) {
    alert("Please enter a number less than 100");
  } else {
    prevGuess.push(guess);
    displayGuess(guess);
    checkGuess(guess);
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage(`🎉 You guessed it right!`);
    endGame();
  } else if (numGuess === 10) {
    displayMessage(`❌ Game Over! The correct number was ${randomNumber}`);
    endGame();
  } else if (guess < randomNumber) {
    displayMessage(`📉 Too low! Try again.`);
  } else {
    displayMessage(`📈 Too high! Try again.`);
  }
}

function displayGuess(guess) {
  userInput.value = "";
  guessSlot.innerHTML += `${guess}, `;
  numGuess++;
  remaining.innerHTML = `${11 - numGuess}`;
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
  userInput.value = "";
  userInput.setAttribute("disabled", "");
  submit.setAttribute("disabled", "");

  p.classList.add("button");
  p.innerHTML = `<h2 id="newGame">🔄 Start New Game</h2>`;
  startOver.appendChild(p);
  playGame = false;

  newGame();
}

function newGame() {
  const newGameButton = document.querySelector("#newGame");
  newGameButton.addEventListener("click", function () {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    prevGuess = [];
    numGuess = 1;
    guessSlot.innerHTML = "";
    remaining.innerHTML = "10";
    lowOrHi.innerHTML = "";
    userInput.removeAttribute("disabled");
    submit.removeAttribute("disabled");
    startOver.removeChild(newGameButton.parentElement);
    playGame = true;
  });
}
