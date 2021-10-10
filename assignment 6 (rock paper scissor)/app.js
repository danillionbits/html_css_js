/**
Orientation - JavaScript assignment 2
Solution by: Dat Pham
*/

const game = () => {
  let pScore = 0; // Player's score
  let cScore = 0; // Computer's score
  let history = []; // The history list of all of the rounds

  //Function to start the game (hiding intro section and showing match section)
  const startGame = () => {
    const introSection = document.querySelector(".intro");
    const startButton = document.querySelector(".intro button");
    const matchSection = document.querySelector(".match");

    startButton.addEventListener("click", () => {
      introSection.classList.add("fade-out");
      matchSection.classList.add("fade-in");
    });
  };

  // Function to play the game (showing match section with hands and select buttons)
  const playGame = () => {
    // Get references to html elements
    const computerOptions = ["rock", "paper", "scissor"];
    const playerOptions = document.querySelectorAll(".options button");
    const hands = document.querySelectorAll(".hands img");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");

    for (const hand of hands) {
      hand.addEventListener("animationend", () => {
        hand.style.animation = "";
      });
    }

    for (const option of playerOptions) {
      option.addEventListener("click", () => {
        // Reset the hand images to rock
        playerHand.src = `./assets/rock.png`;
        computerHand.src = `./assets/rock.png`;

        // Getting player's hand and computer's random hand
        const playerChoice = option.textContent.toLowerCase();
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];

        // Make button disabled
        changeButton(true);

        // Resolve logic with a timeout of 2 seconds
        setTimeout(() => {
          // Make button not disabled
          changeButton(false);

          // Compare computer's hand and player's hand to decide round winner
          compareHands(playerChoice, computerChoice);

          // Console log the current results
          console.log("The player's score is ", pScore);
          console.log("The computer's score is ", cScore);
          console.log("The history result is ", history);

          //Update hand images accordingly to choices
          playerHand.src = `./assets/${playerChoice}.png`;
          computerHand.src = `./assets/${computerChoice}.png`;
        }, 2000);

        // Run hand animation for 2 seconds
        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";
      })
    }
  }

  // Function to change disabled attribute of button
  const changeButton = (isDisabled) => {
    const playerButtons = document.querySelectorAll(".options button");
    // Set disabled attribute of button to params isDisabled
    for (const button of playerButtons) {
      button.disabled = isDisabled;
    }
  }

  // Function to update the scores and check if the winning conditions are met
  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    // Update player's and computer's score
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;

    // Check victory through 3 wins in a row
    if (history.length >= 3) {
      // Get the index of the last 3 elements
      const thirdIndex = history.length - 1;
      const secondIndex = thirdIndex - 1;
      const firstIndex = thirdIndex - 2;
      // Check if the last 3 elements are equal
      if (
        history[firstIndex] === history[secondIndex] &&
        history[secondIndex] === history[thirdIndex] &&
        history[thirdIndex] === 'player'
      ) {
        restartGame('player');
      } else if (
        history[firstIndex] === history[secondIndex] &&
        history[secondIndex] === history[thirdIndex] &&
        history[thirdIndex] === 'computer'
      ) {
        restartGame('computer');
      }
    }

    // Check victory through 10 points max
    if (pScore === 10) {
      restartGame('player');
    } else if (cScore === 10) {
      restartGame('computer');
    }
  };

  // Function to compare computer's and player's hand
  const compareHands = (playerChoice, computerChoice) => {
    const roundWinner = document.querySelector(".match h3");
    //Checking for a tie
    if (playerChoice === computerChoice) {
      roundWinner.textContent = "It is a tie";
      history.push("tie");
      return;
    }
    //Check for Rock hand
    if (playerChoice === "rock") {
      if (computerChoice === "paper") {
        roundWinner.textContent = "Computer gets a point";
        cScore += 1;
        history.push("computer");
        updateScore();
        return;
      } else {
        roundWinner.textContent = "Player gets a point";
        pScore += 1;
        history.push("player");
        updateScore();
        return;
      }
    }
    //Check for Paper hand
    if (playerChoice === "paper") {
      if (computerChoice === "scissor") {
        roundWinner.textContent = "Computer gets a point";
        cScore += 1;
        history.push("computer");
        updateScore();
        return;
      } else {
        roundWinner.textContent = "Player gets a point";
        pScore += 1;
        history.push("player");
        updateScore();
        return;
      }
    }
    //Check for Scissor hand
    if (playerChoice === "scissor") {
      if (computerChoice === "rock") {
        roundWinner.textContent = "Computer gets a point";
        cScore += 1;
        history.push("computer");
        updateScore();
        return;
      } else {
        roundWinner.textContent = "Player gets a point";
        pScore += 1;
        history.push("player");
        updateScore();
        return;
      }
    }
  };

  //Function to restart the game ()
  const restartGame = (gameWinner) => {
    // Get references to html elements
    const matchSection = document.querySelector(".match");

    const resultSection = document.querySelector(".result");
    const resultWinner = document.querySelector(".result h3");
    const restartButton = document.querySelector("#restart-btn");

    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const roundWinner = document.querySelector(".match h3");

    // Hide match section and show result section
    matchSection.classList.remove("fade-in");
    resultSection.classList.add("fade-in");

    // Showcasing the text of who won the game
    resultWinner.textContent = `${gameWinner.charAt(0).toUpperCase() + gameWinner.slice(1)} wins!`;

    // Resetting all values back to their original ones
    restartButton.addEventListener("click", () => {
      resultSection.classList.remove("fade-in");
      matchSection.classList.add("fade-in");
      pScore = 0;
      cScore = 0;
      history = [];
      updateScore();
      playerHand.src = './assets/rock.png';
      computerHand.src = `./assets/rock.png`;
      roundWinner.textContent = "Choose an option";
    });
  }

  startGame();
  playGame();
};

game();