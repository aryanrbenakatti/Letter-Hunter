const options = {
    aroma: "Pleasing smell",
    pepper: "Salt's partner",
    halt: "Put a stop to",
    jump: "Rise suddenly",
    shuffle: "Mix cards up",
    combine: "Add; Mix",
    chaos: "Total disorder",
    labyrinth: "Maze",
    disturb: "Interrupt; upset",
    shift: "Move; Period of work",
    machine: "Device or appliance",
  };
  
  const message = document.getElementById("message");
  const hintRef = document.querySelector(".hint-ref");
  const controls = document.querySelector(".controls-container");
  const startBtn = document.getElementById("start");
  const letterContainer = document.getElementById("letter-container");
  const userInpSection = document.getElementById("user-input-section");
  const resultText = document.getElementById("result");
  const word = document.getElementById("word");
  const words = Object.keys(options);
  let randomWord = "";
  let randomHint = "";
  let winCount = 0;
  let lossCount = 0;
  
  // Generate a random index
  const generateRandomValue = (array) => Math.floor(Math.random() * array.length);
  
  // Disable all buttons
  const blocker = () => {
    document.querySelectorAll(".letters").forEach(button => button.disabled = true);
    stopGame();
  };
  
  // Start game
  startBtn.addEventListener("click", () => {
    controls.classList.add("hide");
    init();
  });
  
  // Stop game
  const stopGame = () => {
    controls.classList.remove("hide");
  };
  
  // Generate a random word
  const generateWord = () => {
    letterContainer.classList.remove("hide");
    userInpSection.innerText = "";
    randomWord = words[generateRandomValue(words)];
    randomHint = options[randomWord];
    hintRef.innerHTML = `<div id="wordHint"><span>Hint: </span>${randomHint}</div>`;
    
    userInpSection.innerHTML = randomWord.split("").map(() => '<span class="inputSpace">_ </span>').join('');
    userInpSection.innerHTML += `<div id='chanceCount'>Chances Left: ${lossCount}</div>`;
  };
  
  // Initialize game
  const init = () => {
    winCount = 0;
    lossCount = 5;
    randomWord = "";
    word.innerText = "";
    randomHint = "";
    message.innerText = "";
    userInpSection.innerHTML = "";
    letterContainer.classList.add("hide");
    letterContainer.innerHTML = "";
    generateWord();
  
    // Create letter buttons
    for (let i = 65; i < 91; i++) {
      let button = document.createElement("button");
      button.classList.add("letters");
      button.innerText = String.fromCharCode(i);
  
      // Button click event
      button.addEventListener("click", () => {
        message.style.color = "#008000";
        let charArray = randomWord.toUpperCase().split("");
        let inputSpace = document.getElementsByClassName("inputSpace");
  
        if (charArray.includes(button.innerText)) {
          charArray.forEach((char, index) => {
            if (char === button.innerText) {
              button.classList.add("correct");
              inputSpace[index].innerText = char;
              winCount += 1;
              if (winCount === charArray.length) {
                resultText.innerHTML = "You Won";
                startBtn.innerText = "Restart";
                blocker();
              }
            }
          });
        } else {
          button.classList.add("incorrect");
          lossCount -= 1;
          document.getElementById("chanceCount").innerText = `Chances Left: ${lossCount}`;
          message.style.color = "#ff0000";
          message.innerText = `Incorrect Letter`;
          if (lossCount === 0) {
            word.innerHTML = `The word was: <span>${randomWord}</span>`;
            resultText.innerHTML = "Game Over";
            blocker();
          }
        }
        button.disabled = true;
      });
  
      letterContainer.appendChild(button);
    }
  };
  
  window.onload = init;
  