const gameBoard = (() => {
    const boardGUI = document.querySelectorAll(".ticTacToeBoardSquare");
    let boardSquares;
    const getState = () => boardSquares;
   
    const fillBoardSquare = (event) => {
        let boardSquare = parseInt(event.target.getAttribute('data-id'));
        let pieceImg = document.createElement("img"); 
        pieceImg.src = gameController.getActivePlayer().pieceImageSource; 

        boardSquares[boardSquare] = gameController.getActivePlayer().piece;
        event.target.appendChild(pieceImg);
        
        //Remove the event listener, so it is impossible to override a board square value untill game is reset
        event.target.removeEventListener('click', fillBoardSquare);
        gameController.processGameTurn();

        //Prints the board to console at the end of each turn, uncomment for debugging
        // console.table(boardSquares);
    }

    const resetGame = () => {
        boardSquares = new Array(9).fill(null);

        //Add event listeners back so users can click squares
        boardGUI.forEach(boardSquare => boardSquare.addEventListener('click', fillBoardSquare));

        //Make the squares empty again
        boardGUI.forEach(boardSquare => boardSquare.innerHTML = '');
    } 
    

    return {getState, resetGame}
})();

const Player = (piece, pieceImageSource, scoreboardDiv) => {
    let score = 0;
    const recordWin = () => ++score;
    const getScore = () => score;
    return {piece, pieceImageSource, scoreboardDiv, recordWin, getScore}
};

const gameController = (() => {
    const player1 = Player('X', '/img/X.png', document.getElementById("player1Score"));
    const player2 = Player('O', '/img/O.png', document.getElementById("player2Score"));

    let activePlayer = player1;
    const toggleActivePlayer = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    };

    const getActivePlayer = () => {return activePlayer};
    const getWinner = (piece) => {return [player1, player2].find(player => player.piece === piece)}

    const checkGameBoardState = () => {
        let board = gameBoard.getState();
        let winner = null;

        //Check for ties
        if (!board.includes(null)) {
            return "tie";
        }

        // Check vertical wins
        for (let i = 0; i < 3; i++){
            if (board[i] !== null && board[i] === board[i + 3] && board[i] === board[i + 6]){
                console.log('vertical win!!!!!!!');
                winner = getWinner(board[i]);
                return winner;
            }    
        }

        // Check horizontal wins
        for (let i = 0; i < 7; i += 3){
            if (board[i] !== null && board[i] === board[i + 1] && board[i] === board[i + 2]){
                console.log('horizontal win!!!!!!!');
                winner = getWinner(board[i]);
                return winner;
            }    
        }

        // Check diagonal wins
        for (let i = 0; i < 3; i += 2){
            if (board[i] !== null && board[i] === board[4] && board[i] === board[8 - i]){
                console.log('diagonal win!!!!!!!');
                winner = getWinner(board[i]);
                return winner;
            }    
        }

        return null;
    }

    const processGameTurn = () => {
        let winner = checkGameBoardState();
        toggleActivePlayer();

        if (winner !== null) {
            if (winner !== "tie") {
                console.log(winner.piece, "won");
                winner.recordWin();
                winner.scoreboardDiv.innerHTML = winner.getScore();
            }else{
                console.log("Its a tie");
            } 
            gameBoard.resetGame();
        }
    }

    return {getActivePlayer, processGameTurn}
})();

//Resets the game once initially to add event listeners to board squares.
gameBoard.resetGame();