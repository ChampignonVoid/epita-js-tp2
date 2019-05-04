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

class GameLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cells: Array(9).fill(null),
      currentPlayer: "player 1",
      nextPlayer: "player 2"
    };
  }

  handleCellClick(index) {
    const cells = this.state.cells
    cells[index] = this.state.currentPlayer === "player 1" ? "X" : "O"

    const currentPlayer = this.state.nextPlayer
    const nextPlayer = this.state.currentPlayer
    this.setState({
      cells : cells,
      currentPlayer : currentPlayer,
      nextPlayer : nextPlayer
    })
  }

  // getDerivedStateFromProps is called before every render,
  // use it to infer new state values from props or state changes.
  static getDerivedStateFromProps(props, state) {
    
    return state;
  }

  render() {
    return (
      <div
        style={gameLayoutStyle}
      >
        <GameInfo currentPlayer={this.state.currentPlayer} />
        <Board cells={this.state.cells} onClickCell={(index) => { this.handleCellClick(index) }}/>
      </div>
    );
  }
}

export default GameLayout;
