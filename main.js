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
        gameController.checkGameBoardState();
        gameController.toggleActivePlayer();
        console.table(boardSquares);
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

const Player = (piece, pieceImageSource) => {
    return {piece, pieceImageSource}
};

const gameController = (() => {
    const player1 = Player('X', '/img/X.png');
    const player2 = Player('O', '/img/O.png');

    let activePlayer = player1;
    const toggleActivePlayer = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    };

    const getActivePlayer = () => {return activePlayer};
    const getWinner = (piece) => {return [player1, player2].find(player => player.piece === piece)}

    const checkGameBoardState = () => {
        let board = gameBoard.getState();
        let winner = null;

        // Check vertical wins
        for (let i = 0; i < 3; i++){
            if (board[i] !== null && board[i] === board[i + 3] && board[i] === board[i + 6]){
                console.log('vertical win!!!!!!!');
                winner = getWinner(board[i]);
                console.log(winner);
            }    
        }

        // Check horizontal wins
        for (let i = 0; i < 7; i += 3){
            if (board[i] !== null && board[i] === board[i + 1] && board[i] === board[i + 2]){
                console.log('horizontal win!!!!!!!');
                winner = getWinner(board[i]);
                console.log(winner);
            }    
        }

        // Check diagonal wins
        for (let i = 0; i < 3; i += 2){
            if (board[i] !== null && board[i] === board[4] && board[i] === board[8 - i]){
                console.log('diagonal win!!!!!!!');
                winner = getWinner(board[i]);
                console.log(winner);
            }    
        }
    }

    return {getActivePlayer, toggleActivePlayer, checkGameBoardState}
})();

//Resets the game once initially to add event listeners to board squares.
gameBoard.resetGame();