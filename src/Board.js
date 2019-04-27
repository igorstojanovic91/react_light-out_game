import React, {Component} from "react";
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
    chanceLightStartsOn: 1
  }

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    };
    // TODO: set initial state
    this.createBoard = this.createBoard.bind(this)
    this.flipCellsAround = this.flipCellsAround.bind(this)
    this.makeTable = this.makeTable.bind(this)
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [...Array(this.props.nrows)].map(e => Array(this.props.nrows))
    // TODO: create array-of-arrays of true/false values
    for (var i = 0; i < this.props.nrows; i++) {
      for(var j = 0; j < this.props.ncols; j++) {
        board[i][j] = (Math.random() < this.props.chanceLightStartsOn ? true : false)
      }
    }    

    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);
    console.log(`y: ${y}, x: ${x}`)

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }

    }
    // TODO: flip this cell and the cells around it
    flipCell(y, x)
    flipCell(y-1, x)
    flipCell(y+1, x)
    flipCell(y, x-1)
    flipCell(y, x+1)

    // win when every cell is turned off
    // TODO: determine is the game has been won
    // this.setState({board, hasWon})
    let hasWon = board.every(row => row.every(cell => cell === true));
    this.setState({ board: board, hasWon: hasWon });
    console.log(this.state)
  }

  makeTable() {
    let board = this.state.board
    board = board.map((r, ycoord) => <tr key={`row ${ycoord}`}>
    {r.map((c, xcoord) => 
      <Cell key={`${ycoord}-${xcoord}`} flipCellsAroundMe={this.flipCellsAround} coord={`${ycoord}-${xcoord}`} isLit={c} />
    )}</tr>)

    return board
    
  }


  /** Render game board or winning message. */

  render() {
      return (
        <div>
          {this.state.hasWon ? (
            <div>
              <h1>You win</h1>
            </div>
            ) : (
              <div>
                <table className="Board">
                <tbody>
                {this.makeTable()}
                </tbody>
                </table>
              </div>
            )}
        </div>
      )

  }
}


export default Board;
