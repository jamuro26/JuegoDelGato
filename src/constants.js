export const TURNS = {
  X: "×",
  O: "o",
}; // sirve para crear los simbolos que vamos a usar en el gato.

//commbinaciones ganadoras del juego de gato.
export const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [3,4,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
]