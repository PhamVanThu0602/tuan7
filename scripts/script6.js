const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");

// Initializing game variables
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    // Ressetting game variables and UI elements
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "images/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    // Selecting a random word and hint from the wordList
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word; // Making currentWord as random word
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    // After game complete.. showing modal with relevant details
    const modalText = isVictory ? `You found the word:` : 'The correct word was:';
    gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
}

const initGame = (button, clickedLetter) => {
    // Checking if clickedLetter is exist on the currentWord
    if(currentWord.includes(clickedLetter)) {
        // Showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        // If clicked letter doesn't exist then update the wrongGuessCount and hangman image
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true; // Disabling the clicked button so user can't click again
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // Calling gameOver function if any of these condition meets
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

// Creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();



playAgainBtn.addEventListener("click", getRandomWord);




const modeSelectDiv = document.querySelector(".mode-select");
const customInputDiv = document.querySelector(".custom-input");
const container = document.querySelector(".container");

document.getElementById("random-mode").addEventListener("click", () => {
    modeSelectDiv.classList.add("hidden");
    getRandomWord();
    container.classList.remove("hidden");
});

document.getElementById("custom-mode").addEventListener("click", () => {
    modeSelectDiv.classList.add("hidden");
    customInputDiv.classList.remove("hidden");
});

document.getElementById("start-custom-game").addEventListener("click", () => {
    const word = document.getElementById("custom-word").value.trim().toLowerCase();
    const hint = document.getElementById("custom-hint").value.trim();
    
    if (word && hint && /^[a-z]+$/.test(word)) {
        currentWord = word;
        document.querySelector(".hint-text b").innerText = hint;
        resetGame();
        customInputDiv.classList.add("hidden");
        container.classList.remove("hidden");
    } else {
        alert("Please enter a valid word (letters only) and a hint.");
    }
});



playAgainBtn.addEventListener("click", () => {
    container.classList.add("hidden");         // Ẩn khu vực chơi
    customInputDiv.classList.add("hidden");    // Ẩn khu nhập từ
    gameModal.classList.remove("show");        // Ẩn bảng thông báo thắng/thua
    modeSelectDiv.classList.remove("hidden");  // Hiện lại menu chọn chế độ
});
