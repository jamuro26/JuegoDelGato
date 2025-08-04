 
 import { WINNER_COMBOS } from "../constants"

 export const checkWinnerFrom = (boardToCheck) =>{
    //revisar las combinaciones ganadoras.
    for (const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      if (
        boardToCheck[a] && // 0 -> x u o 
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a] // x u o
      }
    }
    //si no hay ganador
    return null
  }

  //revisa si ya el juego termino para determinar si hay empate, cuando ya todos los espacios esten llenos en el tablero
  export const checkEndGame = (newBoard) =>{
    return newBoard.every((square) => square !== null)
  }