'use strict';
//Try modifying to set a winning limit and a message that so and so wins

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const victory = document.querySelector('.Victory');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
//starting values
let playing, scores, currentScore, activePlayer;

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
};
init();
//function to print messages on a modal window
const messages = function (words) {
  victory.classList.remove('hidden');
  overlay.classList.remove('hidden');
  document.querySelector('.victoryspeech').textContent = words;
  const closeModal = function () {
    victory.classList.add('hidden');
    overlay.classList.add('hidden');
  };
  /*there are 3 ways to exit the modal window-
  1) clicking on the (X) button
  2) clicking on the overlay
  3) clicking the ESC key
  */
  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
};
messages(
  'Welcome to the PIG GAME!!! \n The first player to 100 points wins!!! \n May the Battle Begin!!! '
);

//function to switch players
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //dice will work only if game is still playing
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    //displayig the image
    diceEl.src = `dice-${dice}.png`;

    //check for rolled 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switching players
      switchPlayer();
    }
  }
});

//holding the score
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      messages(`Player ${Number(activePlayer) + 1} is the winner`);
    } else {
      switchPlayer();
    }
  }
});

//resetting the game
btnNew.addEventListener('click', function () {
  console.log('Hi');
  init();
});
