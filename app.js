/*          The PIG Game Rule's

* 2 Players play the game in rounds.
* First player will roll the dice as many times as he want's until he either choose to HOLD or dice rolls to Number "1".
* If player chooses to HOLD then his current score (sum of all dice numbers in that round) will be added to his GRAND Total score. And then the next player will get the chance to roll the dice.
* If player dice a roll to Number 1 then his current score will be ZERO and then the next player will get the change to roll the dice. 
* A player will WIN the game as soon as his GRAND Total reaches 100 point or the agreed Game points for the PIG Game.
*/

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)

*/
console.log("Sandip Console changes");
var activePlayer, scores, winningScore, prevDice, isGameOn;

newGame();

document.querySelector(".btn-new").addEventListener("click", newGame);

document.getElementById("winning-score").addEventListener("keyup", function(e) {
  winningScore = e.target.value;
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (isGameOn) {
    var currentEl = document.getElementById("current-" + activePlayer);

    scores[activePlayer] =
      scores[activePlayer] + parseInt(currentEl.textContent);

    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];

    currentEl.textContent = "0";

    // winningScore  = document.getElementById('winning-score').value;

    if (scores[activePlayer] >= winningScore) {
      document.getElementById("name-" + activePlayer).textContent = "Winner!!!";

      activePlayerEl = document.querySelector(
        ".player-" + activePlayer + "-panel"
      );

      if (activePlayerEl) {
        activePlayerEl.classList.add("bg-success");
        activePlayerEl.classList.remove("bg-secondary");
      }
      var playBtnsEl = document.querySelector(".play-buttons");
      playBtnsEl.classList.add("d-none");

      isGameOn = false;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (isGameOn) {
    var dice = Math.floor(Math.random() * 6 + 1);

    var currentEl = document.getElementById("current-" + activePlayer);

    var diceEl = document.querySelector(".dice");
    // var diceDivEl = document.querySelector('.dicediv');

    if (diceEl) {
      diceEl.src = "img/dice-" + dice + ".png";
      diceEl.style.display = "block";
    }
    //else {
    //   diceDivEl.innerHTML = dice;
    // }

    if (dice === 1) {
      alert("You rolled 1, bad luck, you lost your chance!!!");

      currentEl.textContent = 0;

      nextPlayer();
    } else if (dice === 6 && prevDice === 6) {
      alert(
        "You rolled 6 twice, bad luck, you lost your chance & your score!!!"
      );
      document.getElementById("score-" + activePlayer).textContent = 0;
      scores[activePlayer] = 0;
      currentEl.textContent = 0;
      nextPlayer();
    } else {
      currentEl.textContent = parseInt(currentEl.textContent) + dice;

      prevDice = dice;
    }
  }
});
function nextPlayer() {
  prevDice = 0;
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.remove("bg-secondary");
  // if (activePlayer === 0) {
  //     activePlayer = 1
  // } else {
  //     activePlayer = 0;
  // }
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.add("bg-secondary");
}

function newGame() {
  scores = [0, 0];
  activePlayer = 0;
  winningScore = 10;
  prevScore = 0;
  isGameOn = true;

  var player1Panel = document.querySelector(".player-0-panel");

  player1Panel.classList.add("bg-secondary");
  player1Panel.classList.remove("bg-success");

  document.getElementById("score-0").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("name-0").textContent = "";

  document.querySelector(".player-1-panel").classList.remove("bg-success");
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-1").textContent = "";

  document.querySelector(".dice").style.display = "none";

  document.getElementById("winning-score").value = winningScore;

  var playBtnsEl = document.querySelector(".play-buttons");
  playBtnsEl.classList.remove("d-none");
}
