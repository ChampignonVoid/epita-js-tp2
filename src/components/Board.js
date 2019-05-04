import React from "react";
import Cell from "./Cell";

const boardStyle = {
  display: "grid",
  width: "600px",
  height: "calc(100%)",
  grid: "auto-flow dense / 1fr 1fr 1fr",
  gridAutoRows: "auto"
};

const Board = ({ cells = [], onClickCell = () => {} }) => (
  <div style={boardStyle}>{cells.map((c, index) => <Cell key={index} // Added key in order to remove the warning
                                                         cellState={c}
                                                         onClick={() => onClickCell(index)} />)}</div>
);

export default Board;
