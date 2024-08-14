'use client';
import React from "react";
import { decode } from "html-entities";

interface SquareProps {
    id: number;
    backgroundColorClass: string;
    piece: string;
}

const Square = ({ id, backgroundColorClass, piece }: SquareProps) => {
    return (
        <div
            className={`w-24 h-24 cursor-pointer flex items-center justify-center text-8xl ${backgroundColorClass}`}
        >
            {piece.length ? decode(piece) : ""}
        </div>
    );
};

export default Square;
