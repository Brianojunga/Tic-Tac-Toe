function gameBoard(){
    rows = 3;
    columns = 3;
board = []

    for(let i = 0; i < rows; i++){
        board[i] = []
        for(let j = 0; j < columns; j++){
            board[i].push(null);
        }
    }

    const getBoard = () => board;

    function addPlayerMark(row, column, player){
        if(board[row][column] === null){
            board[row][column] = player;
            return true}
            else{
                return false
    } 
    }

    return {getBoard, addPlayerMark}
}


function WinOrDraw(board){
   function winGame(){
    for (let row of board){
        if(row[0] !== null && row[0] === row[1] && row[1]=== row[2] )
            return row[0];
        } 
    
    columns = []
    for(let col = 0; col < board[0].length; col++){
        columns[col] = []
        for(row = 0; row < board.length; row++){
            columns[col].push(board[row][col])
        }
    }

    for (let column of columns){
        if(column[0] !== null && column[0] === column[1] && column[1]=== column[2] )
        return column[0];
    } 

    if(board[1][1] !== null && (board[0][0] === board[1][1] && board[1][1]=== board[2][2]) || (board[0][2] === board[1][1] && board[1][1]=== board[2][0])){
         return board[1][1];
    }
    
        return null
    }
   
    function tieGame(){
        for(let row of board){
            for(let cell of row){
                if(cell === null){
                    return false
                }
            }
        }
        return true
    }

    return {winGame, tieGame}
   }



   function gameController(){
    const player = [
        {
            name : "first player's",
            mark : "X"
        },
        {
            name : "second player's",
            mark : "O"
        }
    ]

    let activePlayer = player[0];
    let gameOver = false;

    const toggleActivePlayer = (player) => {
      activePlayer =  activePlayer === player[0] ? player[1] : player[0]
    };

    const getActivePlayer = () => activePlayer;

    const board = gameBoard()

    function playGame(row, column){
        if (gameOver) return;

        const winDraw = WinOrDraw(board.getBoard())

        console.log(`it's ${getActivePlayer().name} turn`)

        if(board.addPlayerMark(row, column, getActivePlayer().mark)){

            const winner = winDraw.winGame()

            if(winner === "X"){
                gameOver = true;
                return `${player[0].name} wins the game`
            }
            if (winner === "O"){
                gameOver = true;
                return `${player[1].name} wins the game` 
            }
        } 
        else{
            alert("The window is already filled")
            
        }

        if(winDraw.tieGame()){
           gameOver = true;
           return "Its a tie"
         }

        toggleActivePlayer(player);
    }

    return Object.assign ({}, board, {getActivePlayer}, {playGame})
   }

   

//const playBoard = gameBoard()
const game = gameController()
console.log(game.playGame(2, 0))
console.log(game.playGame(1, 0))
console.log(game.playGame(0, 0))
console.log(game.playGame(0, 1))
console.log(game.playGame(1, 1))
console.log(game.playGame(2, 2))
console.log(game.playGame(1, 2))
console.log(game.playGame(0, 2))
console.log(game.playGame(2, 1))

console.log(game.getBoard())

const playgame = gameController()
console.log(playgame.getBoard())