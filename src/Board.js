import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];

    //loops through nrows and columns, comparing Math.random with the chances lights stay on prop. fills array with t or f, depending on random outcome

    for (let i = 0; i < nrows; i++) {
      let innerArray = []
      for (let j = 0; j < ncols; j++) {
        if (Math.random() > chanceLightStartsOn) {
          innerArray.push(true);
        } else {
          innerArray.push(false);
        }
      }
      initialBoard.push(innerArray);
    }
    console.log("this is our board\n\n", initialBoard);
    return initialBoard;
  }

  function hasWon() {

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === true) {
          return false
        }
      }
    }
    return true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // Making a (deep) copy of the oldBoard by looping through it and spreading inner arrays

      console.log("this is our old board\n\n\n", oldBoard);

      let boardCopy = []

      for (let i = 0; i < oldBoard.length; i++) {
        boardCopy.push([...oldBoard[i]]);
      }

      console.log("this is our board copy\n\n\n", boardCopy);


      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy)
      flipCell(y, x + 1, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y + 1, x, boardCopy);
      flipCell(y - 1, x, boardCopy);

      // TODO: return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  console.log("this is hasWon\n\n", hasWon);

  if (hasWon()) {
    return <p> You Win!!!</p>
  }

  // TODO

  //for each true or false in our boardcopy, we want to generate a cell with the coordinates inside the flipCellsAround function
  //and our isLit would have the true or false passed in as well.



  //REVIEW THIS CREATION OF A 'FRONT-END' GAME TABLE!
  let tableBoard = [];

  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
        <Cell
          key={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={() => flipCellsAround(coord)}
        />
      );
    }
    tableBoard.push(<tr>{row}</tr>);
  }



  return (<div>
    <h1>LIGHTS OUT</h1>

    <table className="Board">
      <tbody>
        {tableBoard}
      </tbody>

    </table>
  </div>
  )

  // make table board

  // TODO
}

export default Board;
