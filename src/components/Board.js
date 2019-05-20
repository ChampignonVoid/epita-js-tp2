import React from "react";
import Cell from "./Cell";

const boardStyle = {
  display: "grid",
  width: "600px",
  height: "calc(100%)",
  gridAutoRows: "auto"
};

const getBoardStyle = (size) => {
  const gridStyle = "auto-flow dense / " + "1fr ".repeat(size)
  return {...boardStyle, grid: gridStyle}
}

const Board = ({ cells = [], onClickCell = () => {}, size = 1 }) => (
  <div style={getBoardStyle(size)}>{cells.map((c, index) => <Cell key={index} // Added key in order to remove the warning
                                                         cellState={c}
                                                         onClick={() => onClickCell(index)}
                                                         customStyle={{width: 600 / size,
                                                                       height: 600 / size}} />)}</div>
);

export default Board;
