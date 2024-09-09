"use client";
import React from "react";
import { useDroppable } from "@dnd-kit/react";
import { Piece as PieceInterface } from "./Interfaces";
import Piece from "./Piece";

interface SquareProps {
    id: number;
    backgroundColorClass: string;
    piece: PieceInterface | null;
    activePlayer: string;
    enabled: boolean;
}

const Square = ({
    id,
    backgroundColorClass,
    piece,
    activePlayer,
    enabled,
}: SquareProps) => {
    const { isDropTarget, ref } = useDroppable({
        id: id,
        disabled: !enabled,
    });

    return (
        <div
            ref={ref}
            className={`w-20 h-20 cursor-pointer flex items-center justify-center text-8xl ${
                isDropTarget ? "bg-green-400" : backgroundColorClass
            }`}
        >
            {/* <span className={`text-xs`}>{id}</span> */}

            <Piece
                color={piece?.color!}
                code={piece?.code ? piece.code : ""}
                initSquare={id}
                activePlayer={activePlayer}
            />
        </div>
    );
};

export default Square;
