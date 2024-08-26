import React from "react";
import Square from "./Square";
import { BoardPosition } from "./Interfaces";

interface RowProps {
    id: number;
    activePlayer: string;
    boardPositions: BoardPosition[];
    dropTargets: number[];
}

const colors: string[] = ["bg-white", "bg-slate-300"];

const Row = ({ id, activePlayer, boardPositions, dropTargets }: RowProps) => {
    let tmpColors = [...colors];
    if (id % 2) {
        tmpColors.reverse();
    }
    const bgColors = tmpColors;

    return (
        <div className="flex">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((squareIndex) => {
                const boardPositionIndex = id * 8 + squareIndex;
                const squareId = boardPositionIndex + 1;
                return (
                    <Square
                        key={squareIndex}
                        id={squareId}
                        backgroundColorClass={bgColors[squareIndex % 2]}
                        piece={boardPositions[boardPositionIndex]?.piece}
                        enabled={dropTargets.includes(squareId)}
                        activePlayer={activePlayer}
                    />
                );
            })}
        </div>
    );
};

export default Row;
