import React from "react";

// FIXME: change message and color based on `gameState`'s value
const GameInfo = ({ gameState = "stale", currentPlayer = "unkown", winner = null, draw = null }) => (
  !winner ? draw ? <h3>DRAW !!!!!!</h3>
                 : <h3 style={{color:gameState ? "blue" : "green"}}>It's your turn {currentPlayer}</h3>
          : <h3 style={{color:"yellow"}}>{winner} wins!</h3>
);

export default GameInfo;
