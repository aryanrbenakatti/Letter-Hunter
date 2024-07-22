document.addEventListener('DOMContentLoaded', () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const words = [
        { word: 'apple', hint: 'A fruit' },
        { word: 'elephant', hint: 'A large animal' },
        { word: 'guitar', hint: 'A musical instrument' },
        { word: 'carrot', hint: 'A vegetable' },
        { word: 'tiger', hint: 'A big cat' },
        { word: 'piano', hint: 'A musical instrument with keys' },
        { word: 'rose', hint: 'A type of flower' },
        { word: 'whale', hint: 'A large marine mammal' },
        { word: 'drum', hint: 'A percussion instrument' },
        { word: 'banana', hint: 'A yellow fruit' },
        { word: 'lion', hint: 'The king of the jungle' },
        { word: 'flute', hint: 'A woodwind instrument' },
        { word: 'peach', hint: 'A fruit with fuzzy skin' },
        { word: 'dog', hint: 'A domesticated animal' },
        { word: 'violin', hint: 'A string instrument played with a bow' },
        { word: 'lettuce', hint: 'A leafy green vegetable' },
        { word: 'horse', hint: 'A large domesticated animal' },
        { word: 'saxophone', hint: 'A brass instrument used in jazz' },
        { word: 'mango', hint: 'A tropical fruit' },
        { word: 'cat', hint: 'A small domesticated animal' },
        { word: 'trumpet', hint: 'A brass musical instrument' },
        { word: 'broccoli', hint: 'A green vegetable with florets' },
        { word: 'dolphin', hint: 'A highly intelligent marine mammal' },
        { word: 'harp', hint: 'A string instrument played by plucking' },
        { word: 'pear', hint: 'A green or yellow fruit' },
        { word: 'cow', hint: 'A farm animal that gives milk' },
        { word: 'accordion', hint: 'A portable keyboard instrument' },
        { word: 'plum', hint: 'A small, round fruit' },
        { word: 'sheep', hint: 'A wool-producing farm animal' },
        { word: 'clarinet', hint: 'A woodwind instrument with a single reed' },
        { word: 'blueberry', hint: 'A small, blue fruit' },
        { word: 'panda', hint: 'A black and white bear' },
        { word: 'oboe', hint: 'A double-reed woodwind instrument' },
        { word: 'cherry', hint: 'A small, red fruit' },
        { word: 'goat', hint: 'A farm animal known for climbing' },
        { word: 'tambourine', hint: 'A percussion instrument with jingles' },
        { word: 'orange', hint: 'A citrus fruit' },
        { word: 'rabbit', hint: 'A small, hopping mammal' },
        { word: 'xylophone', hint: 'A percussion instrument with wooden bars' },
        { word: 'grape', hint: 'A small, round fruit used to make wine' },
        { word: 'kangaroo', hint: 'A marsupial from Australia' },
        { word: 'maracas', hint: 'A percussion instrument shaken by hand' },
        { word: 'melon', hint: 'A large, juicy fruit' },
        { word: 'monkey', hint: 'A primate known for climbing trees' },
        { word: 'cello', hint: 'A large string instrument' },
        { word: 'strawberry', hint: 'A red, heart-shaped fruit' },
        { word: 'penguin', hint: 'A flightless bird from Antarctica' },
        { word: 'bagpipes', hint: 'A wind instrument from Scotland' },
        { word: 'lemon', hint: 'A sour, yellow fruit' },
        { word: 'camel', hint: 'A desert animal with humps' },
        { word: 'banjo', hint: 'A string instrument with a circular body' }
    
    ];
    let chosenWord;
    let chosenHint;
    let lives;
    const myLives = document.getElementById('mylives');
    const hint = document.getElementById('hint-text');
    const wordHolder = document.getElementById('my-word');
    const resetButton = document.getElementById('reset');
    const alphabetUL = document.getElementById('alphabet');
  
    const resetGame = () => {
      chosenWord = words[Math.floor(Math.random() * words.length)].word;
      chosenHint = words.find(w => w.word === chosenWord).hint;
      lives = 5;
      hint.textContent = chosenHint;
      myLives.innerHTML = `You have <span id="lives">${lives}</span> lives left`;
      wordHolder.innerHTML = '';
      alphabetUL.innerHTML = '';
      createAlphabet();
      displayWord();
    };
  
    const createAlphabet = () => {
      alphabet.forEach(letter => {
        const li = document.createElement('li');
        li.innerHTML = letter;
        li.addEventListener('click', () => checkLetter(letter, li));
        alphabetUL.appendChild(li);
      });
    };
  
    const displayWord = () => {
      chosenWord.split('').forEach(() => {
        const li = document.createElement('li');
        li.innerHTML = '_';
        wordHolder.appendChild(li);
      });
    };
  
    const checkLetter = (letter, li) => {
      li.classList.add('active');
      li.style.pointerEvents = 'none';
      const guess = chosenWord.split('').map(l => (l === letter ? l : '_'));
      let matched = false;
  
      chosenWord.split('').forEach((l, index) => {
        if (l === letter) {
          wordHolder.children[index].innerHTML = letter;
          matched = true;
        }
      });
  
      if (!matched) {
        lives--;
        myLives.innerHTML = `You have <span id="lives">${lives}</span> lives left`;
        if (lives < 1) {
          myLives.innerHTML = 'Game Over!';
        }
      } else {
        let win = true;
        chosenWord.split('').forEach((l, index) => {
          if (wordHolder.children[index].innerHTML === '_') {
            win = false;
          }
        });
        if (win) {
          myLives.innerHTML = 'You Win!';
        }
      }
    };
  
    resetButton.addEventListener('click', resetGame);
  
    resetGame();
  });
  