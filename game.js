let board = ['', '', '', '', '', '', '', '', '']; //board input tracker

//variables needed for game
let game_over = false;
let curr_sign = `X`;
let player_1 = 'X';
let player_2 = 'O';

//intialize curr_player
let curr_player = player_1;

//the function initializes the game
//parameters: p1, p2 which are both the id of player 1 and player 2
function start_game(p1, p2) {
    initialize_game(p1, p2); //initializes player 1 and 2

    //store them to be used during game in game.html
    sessionStorage.setItem('player_1', player_1);
    sessionStorage.setItem('player_2', player_2);
    window.location.href = 'game.html';
}

//intializes player 1 name and player 2 name
//parameters: p1, p2 which are both the id of player 1 and player 2
function initialize_game(p1, p2) {
    //initialize
    player_1 = document.getElementById(p1).value;
    player_2 = document.getElementById(p2).value;

    //clear the input box
    document.getElementById(p1).value = '';
    document.getElementById(p2).value = '';
}

//occurs only when user is on game.html
if (window.location.pathname.includes('game.html')) {
    //get items that were stored in game initialization
    player_1 = sessionStorage.getItem('player_1');
    player_2 = sessionStorage.getItem('player_2');
    curr_player = player_1; //assumes first player is always player 1

    //Update box showing whose turn it is to play to show player 1's name
    document.getElementById('current_player').textContent =
        curr_player + "'s Turn";
}

//function is responsible of tracking inputs into the tic tac toe board and
//establish whether there is a winner or a draw
//parameter: cell is the current box that was clicked on the 3 * 3 board.
function played(cell) {
    //uses tne data-* attribute which stores data private to cell-->(index)
    cellIndex = cell.getAttribute('data-cell'); //gets index of cell

    if (board[cellIndex] === '' && !game_over) {
        board[cellIndex] = curr_sign; //update back-end board sign
        //update board on screen
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
                //player_2 is next
                curr_player = player_2;
                document.getElementById('current_player').textContent =
                    player_2 + "'s Turn";
                curr_sign = 'O';
            } else {
                //player 1 is next
                curr_player = player_1;
                document.getElementById('current_player').textContent =
                    player_1 + "'s Turn";
                curr_sign = 'X';
            }
        }
    }
}

//function checks if there is a winning combination on the board
function isWinner() {
    //array that stores all winning combinations
    winCombinations = [
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
    for (let combination of winCombinations) {
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

//function is responsible for launching confetti after winner is found
function launchConfetti() {
    //gets the location to display confetti by accessing the id
    confetti_canv = document.getElementById('confetti-canvas');

    confetti.create(confetti_canv, {
        resize: true, //enables it to resize with screen
    })({
        particleCount: 500,
        spread: 100,
        origin: { y: 0.5 },
    });
}

//function is responsible for restarting the game after winner/draw  is found
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
