import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';


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
 * - hasWon: boolean, true when board is all off
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

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  }
  constructor(props) {
    super(props);
    // TODO: set initial state
    this.state = {
      hasWon: false,
      board: this.createBoard()
    }
    this.createBoard = this.createBoard.bind(this);
    this.flipCellsAround = this.flipCellsAround.bind(this);
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for (let x = 0; x < this.props.ncols; x++) {
        row.push(Math.random() < this.props.chanceLightStartsOn)
      }
      board.push(row)
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */
  // coord say where it is in the board
  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);
    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    // TODO: flip this cell and the cells around it
    flipCell(y, x);
    flipCell(y + 1, x);
    flipCell(y - 1, x);
    flipCell(y, x + 1);
    flipCell(y, x - 1);
    // win when every cell is turned off

    // TODO: determine if the game has been won
    let hasWon = board.every(row => row.every(cell => !cell));
    this.setState({ board, hasWon });
  }


  /** Render game board or winning message. */

  render() {
    let tableBoard = this.state.board.map((row, rowNum) =>
      <tr key={rowNum}>
        {row.map((cell, colNum) =>
          <Cell
            key={`${rowNum}-${colNum}`}
            isLit={cell}
            flipCellsAroundMe={() => this.flipCellsAround(`${rowNum}-${colNum}`)} />
        )}
      </tr>
    )

    return (
      <div>
        {this.state.hasWon ? (
          <div className="winner">
            <div className="neon-orange">You</div>
            <div className="neon-blue">Win!</div>
          </div>
        ) : (
            <div className="Board">
              <div className="Board-title">
                <div className="neon-orange">Lights</div>
                <div className="neon-blue">Out</div>
              </div>
              <table >
                <tbody className="Board-tbody">{tableBoard}</tbody>
              </table>
            </div>
          )}
      </div>

    )
  }
}


export default Board;
