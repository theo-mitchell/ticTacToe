const gameBoard = (() => {
    let boardSquares = new Array(9).fill(null);
    const getBoardState = () => boardSquares;

    const fillBoardSquare = (event) => {
        let boardSquare = parseInt(event.target.getAttribute('data-id'));
        boardSquares[boardSquare] = gameController.getActivePlayer().piece;
        event.target.innerHTML = gameController.getActivePlayer().piece;

        //Remove the event listener, so it is impossible to override a board square value untill game is reset
        event.target.removeEventListener('click', fillBoardSquare);
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

    // const playGameRound = () => {
    //     let tempSquareIndex = 0;
    //     let gameOver = false;
    //     while (gameOver !== true){
    //         console.table(gameBoard.getBoardState());
    //         console.log("Current piece turn:", activePlayer.piece);
    //         console.log("Which square are we filling?")
    //     }
    // };

    // const checkGameBoardState = () => {

    // }

    return {getActivePlayer, toggleActivePlayer}
})();

// gameController.playGameRound()
