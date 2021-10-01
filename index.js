const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

let max = 100;
let min = 1;

let compNum = 50;
async function start() {
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );
  //max = await ask(`what would you like your maximum guess to be?`);
  //min = await ask(`what you you like your minimum guess to be?`);
  //compNum = (max + min) / 2;

  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  console.log("You entered: " + secretNumber);
  // Now try and complete the program.
  // start with 50(compNum) and ask if it is there number
  while (true) {
    let yesOrNo = await ask(`is your number ${compNum}?`);
    //then run the game function yes or no to move on
    await gameStart(yesOrNo);

    //process.exit();
  }
}

async function gameStart(yesOrNo) {
  //run a loop to see if answer is yes or no
  while (true) {
    if (yesOrNo === "yes") {
      //if yes tell them you found number and end
      console.log(`i have found you number... ${compNum}!!!`);
      process.exit();
      //if yesOrNo is no run next function High or low
    } else if (yesOrNo === `no`) {
      isItHighOrLow();
      break;
    }
  }
}
// function deals decides to run high or low
async function isItHighOrLow() {
  // ask if it id higher or lower and store as a value
  while (true) {
    let highOrLow = await ask(`is this higher(high) or lower(low)`);
    if (highOrLow === "high") {
      //if answer is higher run is high function
      await isHigh();
    } else if (highOrLow === `low`) {
      //if answer is lower run isLower function
      await isLow();
    }
  }
}

// function deals with if the number is higher
async function isHigh() {
  // getting rid of off by one
  min = compNum + 1;
  //finding the median as a new guess
  compNum = Math.floor((min + max) / 2);
  yesOrNo = await ask(`My guess is... ${compNum} is this your number???`);
  if (yesOrNo === `yes`) {
    process.exit();
  }
}

// function is the deal with if the number is lower
async function isLow() {
  //getting rid of off by one
  //setting max to new number
  max = compNum - 1;
  //finding the median as a new guess
  compNum = Math.floor((min + max) / 2);
  yesOrNo = await ask(`My guess is... ${compNum} is this your number?`);
  if (yesOrNo === `yes`) {
    process.exit();
  }
}
