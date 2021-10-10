/**
Orientation - JavaScript assignment 1
Solution by: Dat Pham
*/

// Define variables for the results
let roundCount = 0;
let winCount = 0;
let historyList = [];
let historyResult = [];
let headCount = 0;
let reverseCount = 0;

const srcImage = ['head.png', 'reverse.png'];

// Function for reading user's input values from html form
const checkUserChoice = () => {
  const userChoice = document.querySelector('input[name="user-choice"]:checked').value;
  return userChoice;
}

// Function for flipping and choosing coin's side
const throwCoinChoice = () => {
  const index = Math.floor(Math.random() * 2);
  coinImage.src = srcImage[index];

  if (index === 0) {
    headCount += 1;
    return 'head';
  } else if (index === 1) {
    reverseCount += 1;
    return 'reverse';
  }
}

// Function for starting the game
const startGame = () => {
  roundCount += 1;

  console.log("Start of round ", roundCount);

  const coinChoice = throwCoinChoice();
  const userChoice = checkUserChoice();
  historyList.push(
    `<tr>
      <td>${roundCount}</td>
      <td>${coinChoice}</td>
      <td>${userChoice}</td>
    </tr>`
  );

  historyResult.push({
    round: roundCount,
    coin: coinChoice,
    user: userChoice
  })

  if (userChoice === coinChoice) {
    winCount += 1;
    resultParagraph.textContent = 'You won!';
    resultParagraph.style.color = 'green';
  } else {
    resultParagraph.textContent = 'You lost!';
    resultParagraph.style.color = 'red';
  }

  updateGame();
}

// Function for updating the results
const updateGame = () => {
  // Console log the result
  console.log("The win count is ", winCount);
  console.log("The head count is ", headCount);
  console.log("The reverse count is ", reverseCount);
  console.log("The history results is ", historyResult);

  // Updating content of html
  winParagraph.textContent = winCount;
  headParagraph.textContent = headCount;
  reverseParagraph.textContent = reverseCount;
  resultSection.innerHTML =
    `<table>
      <tr>
        <th>Round</th>
        <th>Coin Result</th>
        <th>User Choice</th>
      </tr>
      ${historyList.join('')}
    </table>`
}

// Get references to html elements
const resultParagraph = document.querySelector('#result');
const coinImage = document.querySelector('#coin-image');

const winParagraph = document.querySelector('#win-count');
const resultSection = document.querySelector('#result-history');
const headParagraph = document.querySelector('#head-count');
const reverseParagraph = document.querySelector('#reverse-count');

// Add functionality to button by binding a button click event and a listener function
const throwButton = document.querySelector('#throw-button');
throwButton.addEventListener('click', startGame);