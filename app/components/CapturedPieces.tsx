import React from 'react'
import { Piece } from './Interfaces'
import { decode } from "html-entities";


const CapturedPieces = ({pieces, type}: {pieces: Piece[], type: string}) => {
  return (
      <div data-test={`captured-${type}`} className="flex w-6 h-6 text-4xl">
          {pieces
              .map((piece: Piece, index: number) => (
                  <div key={index}>{decode(piece.code)}</div>
              ))}
      </div>
  );
}

export default CapturedPieces