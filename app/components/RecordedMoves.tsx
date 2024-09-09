import React from 'react'
import { MoveRecord } from './Interfaces'

interface RecordedMovesProps {
    moves: MoveRecord[];
}

const RecordedMoves = ({ moves}: RecordedMovesProps) => {
  return (
      <div className="flex justify-end">
          <ol className="list-decimal mr-10">
              {moves.map((move, index) => (
                  <li key={`move-${index + 1}`}>
                      {move.white} {move.black}
                  </li>
              ))}
          </ol>
      </div>
  );
}

export default RecordedMoves