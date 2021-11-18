const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

//function lets player chose what game they would like to play
gameChoice();
async function gameChoice() {
  //asking them if they want to play game1 or game 2
  let answer = await ask(
    "Would you like to guess the number (game1) or have the computer guess your number (game2)?"
  );
  if (answer === "game2") {
    // if they say game2 start the second game
    start();
  } else {
    //otherwise start the other game
    startComp();
  }
}

//First game 

//game running function for the computer has a number and they have to guess
async function startComp() {
  //describing the game
  console.log(
    "Lets play a game where the computer has a number and you have to guess it"
  );
  //setting the max range they want to play
  let newMax = await ask(`what would you like your maximum guess to be?`);
  max = parseInt(newMax);
  console.log(max);
  //setting the min range they want to play
  let newMin = await ask(`What would you like you minimum guess to be`);
  min = parseInt(newMin);
  console.log(min);
  // make a random number between there given range and set it to the comp number
  let compNum = Math.floor(Math.random() * (max - min) + min);
  console.log("I (the computer) have my secret number!!!");

  // function takes a guess and returns answer in the high or low function
  takingGuess();
  async function takingGuess() {
    //asking the player to take a guess at the computers number
    let playerGuess = await ask(
      "try and guess the computers secret number, i will let you know if it is higher or lower"
    );
    //turning the string into a number
    playerGuess = parseInt(playerGuess);
    //returning the number into highorlow and calling it
    return highORLow(playerGuess);
  }

  async function highORLow(guess) {
    //if they guess the number let them know and ask if they want to play again
    while (guess === compNum) {
      let answer = await ask(
        "you have guessed the number correct, you wizard! would you like to play again?"
      );
      //if they want to play again call the game choice function to call games again
      if (answer === "yes") {
        gameChoice();
      } else {
        //if they do not end the game
        process.exit();
      }
    }
    // if they do not answer right let them know if the number if higher or lower
    if (guess > compNum) {
      console.log(`the guess ${guess} is lower... `);
      //calling the take guess function to take another guess
      takingGuess();
    } else if (guess < compNum) {
      //calling the take guess function to take another guess
      console.log(`the guess ${guess} is higher`);
      takingGuess();
    }
  }
}



//SECOND game

// game running function
async function start() {
  //setting a computer num and the min and max
  let max = 100;
  let min = 1;

  let compNum = 50;

  //starting text
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );

  //compNum = (max + min) / 2;

  //letting the player set new max in min
  let newMax = await ask(`what would you like your maximum guess to be? :`);
  max = parseInt(newMax);
  console.log(max);

  let newMin = await ask(`What would you like you minimum guess to be? :`);
  min = parseInt(newMin);
  console.log(min);

  //setting compNum to the median of the range they gave
  compNum = Math.floor((max + min) / 2);
  console.log(compNum);

  // asking them for a secret number
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise... :\n"
  );
  //setting the string to a number
  secretNumber = parseInt(secretNumber);
  //letting them know we have there number
  console.log(`You entered: ${secretNumber}`);

  // start with 50(compNum) or the median of there given number and ask if it is there number
  while (true) {
    let yesOrNo = await ask(`is your number ${compNum}? :`);
    //then run the game function yes or no to move on
    await gameStart(yesOrNo);
  }

  //yesorno function deals with if the answer is yes or no then acts acordingly
  function gameStart(yesOrNo) {
    //cheat detector if the number is there number
    if (secretNumber === compNum) {
      console.log(`Stop it you are lying!!!`);
      startAgain();
    } else if (yesOrNo === "yes") {
      //if yes tell them you found number and end
      console.log(`i have found you number... ${compNum}!!!`);
      startAgain();
      //if yesOrNo is no run next function High or low
    } else if (yesOrNo === `no`) {
      isItHighOrLow();
    }
  }

  async function isItHighOrLow() {
    // ask if it id higher or lower and store as a value
    while (true) {
      let highOrLow = await ask(
        `is you number higher(high) or lower(low) than the computer number :`
      );
      if (highOrLow === "high") {
        //if answer is higher run isHigh function
        await isHigh();
      } else if (highOrLow === `low`) {
        //if answer is lower run isLower function
        await isLow();
      }
    }
  }

  //function deals with if the guess is high
  async function isHigh() {
    // getting rid of off by one
    min = compNum + 1;
    console.log(min);
    console.log(max);
    //finding the median and setting it as a new guess
    compNum = Math.floor((min + max) / 2);
    //cheat detector
    if (secretNumber < min || secretNumber === compNum) {
      console.log(`Stop it you are lying!!!`);
      startAgain();
    }
    // asking them if there number is the guess
    let yesOrNo = await ask(`My guess is... ${compNum} is this your number? :`);
    //if answer is yes end game
    if (yesOrNo === `yes`) {
      startAgain();
    }
  }

  //function deals with if the guess is low
  async function isLow() {
    //getting rid of off by one
    //setting max to new number
    max = compNum - 1;
    console.log(min);
    console.log(max);
    //finding the median and setting it as a new guess
    compNum = Math.floor((min + max) / 2);
    //cheat ditector, if they are cheating tell them so
    if (secretNumber > max || secretNumber === compNum) {
      console.log(`Stop it you are lying!!!`);
      startAgain();
    }
    //ask them if the guess is there number
    let yesOrNo = await ask(`My guess is... ${compNum} is this your number?`);

    console.log(secretNumber);
    console.log(compNum);
    //if answer is yes end game
    if (yesOrNo === `yes`) {
      startAgain();
    }
  }

  // function runs when player needs or wants to start over 
  async function startAgain() {
    //asking player if they would like to start the game over 
    let answer = await ask("would you like to start the game over?");
    //if yes start game over by calling the game running function again
    if (answer === "yes") {
      start();
    } else {
      //if no end the game 
      process.exit;
    }
  }
}
