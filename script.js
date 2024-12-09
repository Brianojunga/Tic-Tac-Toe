const body = document.querySelector(".container");
const form = document.querySelector(".form");
const para = document.querySelector(".player-turn");
const modal = document.querySelector(".modal");
const winPara = document.querySelector(".win-message");
const reset = document.querySelector(".reset");
const exit = document.querySelector(".exit");



//the game board

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




// win or draw function
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

// get elements function
   function getElements(){
    const container = document.createElement('div');
    container.classList.add("div-container");

    for(let i = 1; i <= 9; i++){
         let div = document.createElement("div");
         div.classList.add(`box`)
         div.classList.add(`box${i}`)
         container.appendChild(div);
    }

    return body.appendChild(container);
}


 // this acts like the game referee
   function gameController(player1, player2){
    const player = [
        {
            name : player1 ||"first player's",
            mark : "X"
        },
        {
            name : player2 || "second player's",
            mark : "O"
        }
    ]

    getElements()

    let activePlayer = player[0];
    let gameOver = false;

    const toggleActivePlayer = (player) => {
      activePlayer =  activePlayer === player[0] ? player[1] : player[0]
    };

    const getActivePlayer = () => activePlayer;

    const board = gameBoard()

    para.textContent = `it's ${getActivePlayer().name} turn`

    function reset(board){
        for(let row = 0; row < board.length; row++){
            for(let col = 0; col < board[row].length; col++)
                board[row][col] = null;
        }
        gameOver = false;
        activePlayer = player[0];
        para.textContent = `it's ${getActivePlayer().name} turn`
    }

    

    function playGame(row, column){
        if (gameOver) return;

        const winDraw = WinOrDraw(board.getBoard())


        if(board.addPlayerMark(row, column, getActivePlayer().mark)){

            const winner = winDraw.winGame()

            if(winner === "X"){
                gameOver = true;
                para.textContent = ""
                winPara.textContent = `${player[0].name} wins the game`
                winPara.style.color = "#1b3d2f"
                modal.showModal()
                return `${player[0].name} wins the game`
            }

            if (winner === "O"){
                gameOver = true;
                para.textContent = ""
                winPara.textContent = `${player[1].name} wins the game`;
                winPara.style.color = "#1b3d2f";
                modal.showModal()
                return `${player[1].name} wins the game` 
            }
        } 
        else{
            alert("The window is already filled")
            
        }

        if(winDraw.tieGame()){
           gameOver = true;
           para.textContent = ""
           winPara.textContent = "Its a tie";
           winPara.style.color = "#504800";
           modal.showModal()
            return "Its a tie"
         }

        toggleActivePlayer(player);

        para.textContent = `it's ${getActivePlayer().name} turn`

    }

    // return all functions defined
    return Object.assign ({}, board, {getActivePlayer}, {playGame}, {reset})

   }


form.addEventListener("submit", (e) =>{
    e.preventDefault();
    form.style.display = "none";
    firstPlayer = document.querySelector("#player1").value;
    secondPlayer = document.querySelector("#player2").value;
    const game = gameController(firstPlayer, secondPlayer);


    const box1 = document.querySelector('.box1');
    const box2 = document.querySelector('.box2');
    const box3 = document.querySelector('.box3');
    const box4 = document.querySelector('.box4');
    const box5 = document.querySelector('.box5');
    const box6 = document.querySelector('.box6');
    const box7 = document.querySelector('.box7');
    const box8 = document.querySelector('.box8');
    const box9 = document.querySelector('.box9');
    const boxes = document.querySelectorAll(".box");

     box1.addEventListener("click", () => {
        game.playGame(0, 0)
        box1.textContent = game.getBoard()[0][0]
     })
    
     box2.addEventListener("click", () => {
        game.playGame(0, 1)
        box2.textContent = game.getBoard()[0][1]
     })

     box3.addEventListener("click", () => {
        game.playGame(0, 2)
        box3.textContent = game.getBoard()[0][2]
     })

     box4.addEventListener("click", () => {
        game.playGame(1, 0)
        box4.textContent = game.getBoard()[1][0]
     })

     box5.addEventListener("click", () => {
        game.playGame(1, 1)
        box5.textContent = game.getBoard()[1][1]
     })

     box6.addEventListener("click", () => {
        game.playGame(1, 2)
        box6.textContent = game.getBoard()[1][2]
     })

     box7.addEventListener("click", () => {
        game.playGame(2, 0)
        box7.textContent = game.getBoard()[2][0]
     })

    box8.addEventListener("click", () => {
        game.playGame(2, 1)
        box8.textContent = game.getBoard()[2][1]
     })
     box9.addEventListener("click", () => {
        game.playGame(2, 2)
        box9.textContent = game.getBoard()[2][2]
     })

     reset.addEventListener("click", () => {
        game.reset(game.getBoard())
        boxes.forEach(box => box.textContent = "");
        modal.close()  
     })

     exit.addEventListener("click", () => {
       body.replaceChildren()
        form.style.display = "block";
        modal.close()
     })    

     form.reset()
    
})







   
 




