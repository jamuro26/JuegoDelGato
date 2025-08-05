import { useState } from "react";
import confetti from "canvas-confetti";

import { Square } from "./components/Square.jsx"; // importa el componente square
import { TURNS } from "./constants.js"; // importa las constantes usadas para el juego
import { checkWinnerFrom, checkEndGame } from "./logic/board.js"; // importa componente de uso de la logica del juego del gato.

import { WinnerModal } from "./components/WinnerModal.jsx";

import { saveGameToStorage, resetGameStorage } from "./logic/storage/index.js";

function App() {

  // sirve para crear el tablero, useStare se usa para renderizar el tablero cada vez que hay un juego nuevo.
  const [board, setBoard] = useState( () => {
    const boardFromStorage = window.localStorage.getItem('board') // sirve para inicializar el estado de boardstorage para guardar la informacion.
    if (boardFromStorage) return JSON.parse(boardFromStorage) 
    return Array(9).fill(null)
  })
    
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  //null es que no hay ganador, false es que hay un empate.
  const [winner, setWinner]  = useState(null)

  // funcion para resetear el juego para volver a jugar poe medio de estados sin resetear la pagina. 
  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = (index) => {
    // no actualizamos esta posicion si ya tiene algo
    if(board[index] || winner) return

    //actualizar el tablero
    const newBoard = [...board] // crea una copia del array para no tener que mutar nuevamente el objeto en estado.
    newBoard[index] = turn
    setBoard(newBoard)
    
    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn)
    
    //guardar la partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    //revisar ganador
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      confetti() // se invoca al paquete confetti para mostrar y generar que cuando hay un ganador la app tire confetti
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)){
      setWinner(false)
    }// revisa si el juego termina
  };

  return (
    <main className='board'>
      <h1>Juego del Gato</h1>
      <button onClick={resetGame}>Reiniciar el juego</button>
      <section className='game'>
        {board.map((_, index) => {
          return (
            <Square 
              key={index} 
              index={index} 
              updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
        <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  );
}

export default App;
