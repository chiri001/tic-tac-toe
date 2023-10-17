let board = ['', '', '', '', '', '', '', '', ''];
let game_over = false;
let curr_sign = `X`;
let player_1 = 'X';
let player_2 = 'O';
let curr_player = player_1;

function start_game(p1, p2) {
    initialize_game(p1, p2);
    sessionStorage.setItem('player_1', player_1);
    sessionStorage.setItem('player_2', player_2);
    window.location.href = 'game.html';
}

function initialize_game(p1, p2) {
    player_1 = document.getElementById(p1).value;
    player_2 = document.getElementById(p2).value;
    document.getElementById(p1).value = '';
    document.getElementById(p2).value = '';
}

if (window.location.pathname.includes('game.html')) {
    player_1 = sessionStorage.getItem('player_1');
    player_2 = sessionStorage.getItem('player_2');
    curr_player = player_1;
    document.getElementById('current_player').textContent =
        curr_player + "'s Turn";
}
function played(cell) {
    cellIndex = cell.getAttribute('data-cell'); //gets index of cell

    if (board[cellIndex] === '' && !game_over) {
        board[cellIndex] = curr_sign;
        cell.innerHTML = `<h1 class="game_sign"> ${curr_sign} </h1> `;

        //check if winner is found
        if (isWinner()) {
            //game over winner found
            document.getElementById(
                'winner'
            ).textContent = `${curr_player} wins !!`;
            document.getElementById('player-win').style.display = 'flex';
            launchConfetti();
        } else if (board.every((cell) => cell !== '')) {
            //there is a draw since all cells have value but no winner
            document.getElementById(
                'winner'
            ).textContent = `It's a Stalemate !!`;
            document.getElementById('player-win').style.display = 'flex';
        } else {
            //keep playing
            if (curr_sign === 'X') {
                //next player
                curr_player = player_2;
                document.getElementById('current_player').textContent =
                    player_2 + "'s Turn";
                curr_sign = 'O';
            } else {
                curr_player = player_1;
                document.getElementById('current_player').textContent =
                    player_1 + "'s Turn";
                curr_sign = 'X';
            }
        }
    }
}

function isWinner() {
    winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    //if board has any of winning combination then winner is found
    for (let combination of winningCombinations) {
        if (
            board[combination[0]] !== '' &&
            board[combination[0]] === board[combination[1]] &&
            board[combination[1]] === board[combination[2]]
        ) {
            //if board has any of combinations having same sign
            return true;
        }
    }

    return false; //no winning combination found
}

function launchConfetti() {
    confetti_canv = document.getElementById('confetti-canvas');

    confetti.create(confetti_canv, {
        resize: true,
    })({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.3 },
    });
}

function restart_game() {
    //clear the board marks
    let cells = document.querySelectorAll('[data-cell]');
    for (let cell of cells) {
        cell.innerHTML = '';
    }

    //clear backend board
    board = ['', '', '', '', '', '', '', '', ''];

    //reset variables
    game_over = false;
    curr_sign = 'X';
    curr_player = player_1;
    document.getElementById('current_player').textContent =
        curr_player + "'s Turn";

    //remove the winner popup
    document.getElementById('winner').textContent = '';
    document.getElementById('player-win').style.display = 'none';
}
