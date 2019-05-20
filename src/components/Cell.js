import React from "react";

const cellStyle = {
  display: "block",
  border: "1px solid #333",
  outline: "none",
  textAlign: "center",
  lineHeight: "200px",
  cursor: "pointer"
};

class Cell extends React.Component {
  constructor(props) {
    super(props)
    this.state = {mouseOver : false}
  }

  handleMouseHover(event) {
    this.setState({mouseOver : true})
  }

  handleMouseOut(event) {
    this.setState({mouseOver : false})
  }

  getValueFromCellState() {
    const cellState = this.props.cellState
    if (cellState === "O" || cellState === "X")
      return cellState
    return ""
  }

  render() {
    return <div style={{...cellStyle, ...this.props.customStyle, backgroundColor : this.state.mouseOver ? "red" : "white"}}
                onMouseOver={e => this.handleMouseHover(e)}
                onMouseOut={e => this.handleMouseOut(e)}
                onClick={e => !this.props.cellState ? this.props.onClick(e) : () => {}}>{this.getValueFromCellState()}</div>;
  }
}

export default Cell;
