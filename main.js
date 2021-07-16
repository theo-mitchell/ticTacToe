const gameBoard = (() => {
    let boardSquares = new Array(9).fill(null);
    const getBoardState = () => boardSquares;
    const fillSquare = (piece, position) => boardSquares[position] = piece;
    return {
        fillSquare,
        getBoardState
    }
})();

const Player = (piece) => {
    let isTurn = piece === 'X' ? true : false;
    return {piece, isTurn}
};
player1 = Player('X');
player2 = Player('O');

// const gameController = (() => {

// })();

gameBoard.fillSquare(player1.piece, 3);
console.log(gameBoard.getBoardState());
