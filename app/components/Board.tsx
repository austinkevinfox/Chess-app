import React from 'react'
import Row from './Row';
import { BoardPosition } from './Game';

interface BoardProps {
    positions: BoardPosition[];
}

const Board = ({ positions }: BoardProps) => {
  return (
      <div className="border-solid border-8 border-slate-600 drop-shadow-2xl">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((rowId) => (
              <Row key={rowId} id={rowId} boardPositions={positions} />
          ))}
      </div>
  );
}

export default Board