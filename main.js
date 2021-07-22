const gameBoard = (() => {
    let boardSquares = new Array(9).fill(null);
    const getBoardState = () => boardSquares;

    const fillBoardSquare = (event) => {
        let boardSquare = parseInt(event.target.getAttribute('data-id'));
        boardSquares[boardSquare] = gameController.getActivePlayer().piece;
        event.target.innerHTML = gameController.getActivePlayer().piece;

        //Remove the event listener, so it is impossible to override a board square value untill game is reset
        event.target.removeEventListener('click', fillBoardSquare);
        gameController.checkGameBoardState();
        gameController.toggleActivePlayer();
        console.table(boardSquares);
    }

    const boardGUI = document.querySelectorAll(".ticTacToeBoardSquare");
    boardGUI.forEach(boardSquare => boardSquare.addEventListener('click', fillBoardSquare));

    return {
        getBoardState
    }
})();

const Player = (piece) => {
    return {piece}
};

const gameController = (() => {
    const player1 = Player('X');
    const player2 = Player('O');

    let activePlayer = player1;
    const toggleActivePlayer = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    };

    const getActivePlayer = () => {return activePlayer};

    const checkGameBoardState = () => {
        let board = gameBoard.getBoardState();

        // Check vertical wins
        for (let i = 0; i < 3; i++){
            if (board[i] !== null && board[i] === board[i + 3] && board[i] === board[i + 6]){
                console.log('vertical win!!!!!!!');
            }    
        }

        // Check horizontal wins
        for (let i = 0; i < 7; i += 3){
            if (board[i] !== null && board[i] === board[i + 1] && board[i] === board[i + 2]){
                console.log('horizontal win!!!!!!!')
            }    
        }

        // Check diagonal wins
        for (let i = 0; i < 3; i += 2){
            if (board[i] !== null && board[i] === board[4] && board[i] === board[8 - i]){
                console.log('diagonal win!!!!!!!')
            }    
        }
    }

    return {getActivePlayer, toggleActivePlayer, checkGameBoardState}
})();

