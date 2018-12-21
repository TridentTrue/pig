/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

let scores, roundScore, activePlayer;
const dice = document.querySelector('.dice');
newGame();

function newGame() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;

    document.querySelectorAll('.player-panel').forEach(element => {
        element.classList.remove('active');
        element.classList.remove('winner');
    });
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelectorAll('.player-name').forEach((element, index) => {
        element.textContent = `Player ${index + 1}`;
    });
    document.querySelectorAll('.player-score, .player-current-score').forEach(element => {
        element.textContent = '0';
    });
    document.querySelectorAll('.btn-hold, .btn-roll').forEach(element => {
        element.style.display = 'block';
    });
};

function nextPlayer() {
    roundScore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelectorAll('.player-current-score').forEach(element => {
        element.textContent = 0;
    });
    document.querySelectorAll('.player-panel').forEach(element => {
        element.classList.toggle('active');
    });
    dice.style.display = 'none';
};

document.querySelector('.btn-new').addEventListener('click', newGame);

document.querySelector('.btn-roll').addEventListener('click', () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    dice.style.display = 'block';
    dice.src = `dice-${roll}.png`;

    if (roll !== 1) {
        roundScore += roll;
        document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
    } else {
        nextPlayer();
    }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
    scores[activePlayer] += roundScore;
    document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
    if (scores[activePlayer] >= 100) {
        document.querySelector(`#score-${activePlayer}`).textContent = 'Winner!';
        dice.style.display = 'none';
        let classes = document.querySelector(`.player-${activePlayer}-panel`).classList;
        classes.remove('active');
        classes.add('winner');
        document.querySelectorAll('.btn-hold, .btn-roll').forEach(element => {
            element.style.display = 'none';
        });
    } else {
        nextPlayer();
    }
});
