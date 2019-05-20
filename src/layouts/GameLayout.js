import React from "react";
import Board from "../components/Board";
import GameInfo from "../components/GameInfo";

const gameLayoutStyle = {
  width: 650,
  height: `calc(90%)`,
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  margin: "auto"
};

const size = 3

class GameLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cells: Array(Math.pow(size, 2)).fill(null),
      currentPlayer: "player 1",
      nextPlayer: "player 2",
      gameState: 0
    };
  }

  handleCellClick(index) {
    const cells = [...this.state.cells]
    cells[index] = this.state.currentPlayer === "player 1" ? "X" : "O"
    const currentPlayer = this.state.nextPlayer
    const nextPlayer = this.state.currentPlayer
    this.setState({
      cells : cells,
      currentPlayer : currentPlayer,
      nextPlayer : nextPlayer,
      gameState : (this.state.gameState + 1) % 2  // 2 : Number of player
    })
  }

  // getDerivedStateFromProps is called before every render,
  // use it to infer new state values from props or state changes.
  static getDerivedStateFromProps(props, state) {
    const cells = state.cells
    let refCells = Array(cells.length).fill(null)
    const numberRowsCell = Math.floor(Math.sqrt(cells.length))
    const magicSquareConst = numberRowsCell * (cells.length + 1) / 2
    let position = [Math.floor(numberRowsCell / 2), numberRowsCell - 1]
    let value = 1
    for (let i = 0 ; i <= cells.length ; ++i) {
      if (position[0] === -1 && position[1] === numberRowsCell) {
        position[0] = 0
        position[1] = numberRowsCell - 2
      } else  {
        if (position[0] < 0) 
          position[0] = numberRowsCell - 1; 
        if (position[1] === numberRowsCell) 
          position[1] = 0; 
      }
      if (refCells[position[0] * numberRowsCell + position[1]])
      {
        position[0] = (position[0] + 1) % numberRowsCell;
        position[1] -= 2;
        if (position[1] < 0)
          position[1] += numberRowsCell
        continue
      }
      else
        refCells[position[0] * numberRowsCell + position[1]] = value++;
        --position[0]
        ++position[1]
    }

    const cellsFirstPlayer = refCells.filter((x, index) => cells[index] === "X").sort().reverse()
    const cellsSecondPlayer = refCells.filter((x, index) => cells[index] === "O").sort().reverse()
       
    let findSum = (array, remaining, index, depth) => {
      if (remaining === 0 && depth === size)
        return true;
      if (remaining < 0 || array.length <= index || depth >= size)
        return false;
      for (let i = index ; i < array.length ; ++i) {
        if (findSum(array, remaining - array[i], i + 1, depth + 1))
          return true
      }
      return false
    }

    let winner = null
    if (findSum(cellsFirstPlayer, magicSquareConst, 0, 0))
        winner = "player 1"
    else if (findSum(cellsSecondPlayer, magicSquareConst, 0, 0))
        winner = "player 2"
    state.winner = winner
    console.log(cells.find(x => x === null))
    if (!winner && cells.find(x => x === null) === undefined)
      state.draw = true
    return state
  }

  render() {
    return (
      <div
        style={gameLayoutStyle}
      >
        <GameInfo gameState={this.state.gameState}
                  currentPlayer={this.state.currentPlayer}
                  winner={this.state.winner}
                  draw={this.state.draw} />
        <Board cells={this.state.cells} onClickCell={(index) => { this.handleCellClick(index) }}
               isEnabled={this.state.winner === null}
               size={size}/>
      </div>
    );
  }
}

export default GameLayout;
