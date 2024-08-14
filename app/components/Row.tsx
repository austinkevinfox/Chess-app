import React from "react";
import Square from "./Square";
import { BoardPosition } from "./Game";

interface RowProps {
    id: number;
    boardPositions: BoardPosition[];
}

const colors: string[] = ["bg-white", "bg-slate-300"];

const Row = ({ id, boardPositions }: RowProps) => {
    let tmpColors = [...colors];
    if (id % 2) {
        tmpColors.reverse();
    }
    const bgColors = tmpColors;

    return (
        <div className="flex">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((squareIndex) => {
                const squareId = id * 8 + squareIndex;
                return (
                    <Square
                        key={squareIndex}
                        id={squareId}
                        backgroundColorClass={bgColors[squareIndex % 2]}
                        piece={boardPositions[squareId].piece}
                    />
                );
            })}
        </div>
    );
};

export default Row;
