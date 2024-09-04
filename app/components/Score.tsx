import React from "react";
import { Piece } from "./Interfaces";
import { PieceValues } from "./AlgebraicPositionServices/AlgebraicNotationConstants";

interface ScoreProps {
    color: string;
    capturedWhite: Piece[];
    capturedBlack: Piece[];
}
declare type PieceValueKey = keyof typeof PieceValues;

const Score = ({ color, capturedWhite, capturedBlack }: ScoreProps) => {
    let whiteScore = 0;
    let blackScore = 0;

    ["pawn", "knight", "bishop", "rook", "queen"].forEach((name) => {
        const value = PieceValues[name as PieceValueKey];
        const whitePieces = capturedWhite?.filter(
            (piece) => piece.name === name
        );
        const blackPieces = capturedBlack?.filter(
            (piece) => piece.name === name
        );

        if (blackPieces?.length) {
            whiteScore += blackPieces.length * value;
        }
        if (whitePieces.length) {
            blackScore += whitePieces.length * value;
        }
    });

    let scoreDisplay = "";

    if (color === "white" && whiteScore > blackScore) {
        scoreDisplay = `+${whiteScore - blackScore}`;
    }
    if (color === "black" && blackScore > whiteScore) {
        scoreDisplay = `+${blackScore - whiteScore}`;
    }

    return <div>{scoreDisplay}</div>;
};

export default Score;
