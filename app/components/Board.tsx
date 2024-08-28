"use client";
import React, { useState } from "react";
import Row from "./Row";
import { BoardPosition, Piece, EnPassan } from "./Interfaces";
import { DragDropProvider } from "@dnd-kit/react";
import {
    getAlgebraicPawnMoves,
    getEnPassanNotation,
} from "./AlgebraicPositionServices/AlgebraicPawnPositionServices";
import { getAlgebraicKnightMoves } from "./AlgebraicPositionServices/AlgebraicKnightPositionServices";
import { getAlgebraicBishopMoves } from "./AlgebraicPositionServices/AlgebraicBishopPositionServices";
import { getAlgebraicRookMoves } from "./AlgebraicPositionServices/AlgebraicRookPositionServices";
import { getAlgebraicQueenMoves } from "./AlgebraicPositionServices/AlgebraicQueenPositionServices";
import { getAlgebraicKingMoves } from "./AlgebraicPositionServices/AlgebraicKingPositionServices";
import { getCastlingParams } from "./AlgebraicPositionServices/AlgebraicCastlingServices";

interface BoardProps {
    activePlayer: string;
    positions: BoardPosition[];
    onPiecePositionChange: (
        id: number,
        piece: Piece,
        pieceInDrag: number,
        enPassanNotation: EnPassan | null
    ) => void;
    onCastle: (kingPiece: Piece, rookPiece: Piece, indices: number[]) => void;
}

const Board = ({
    activePlayer,
    positions,
    onPiecePositionChange,
    onCastle,
}: BoardProps) => {
    const [isWhiteKingSideCastleAvailable, setIsWhiteKingSideCastleAvailable] =
        useState(true);
    const [
        isWhiteQueenSideCastleAvailable,
        setIsWhiteQueenSideCastleAvailable,
    ] = useState(true);
    const [isBlackKingSideCastleAvailable, setIsBlackKingSideCastleAvailable] =
        useState(true);
    const [
        isBlackQueenSideCastleAvailable,
        setIsBlackQueenSideCastleAvailable,
    ] = useState(true);
    const [dropTargets, setDropTargets] = useState<number[]>([]);
    const [pieceInDrag, setPieceInDrag] = useState<number>(0);
    const [enPassanNotation, setEnPassanNotation] = useState<EnPassan | null>(
        null
    );

    const getMovesByPiece = (
        pieceToMove: string,
        file: string,
        rank: string
    ) => {
        const tmpPositions = [...positions];
        let possibleMoves: number[] = [];
        let targetAlgebraicNotations: string[] = [];

        if (pieceToMove === "pawn") {
            targetAlgebraicNotations = getAlgebraicPawnMoves(
                file,
                rank,
                tmpPositions,
                enPassanNotation,
                activePlayer
            );
        }

        if (pieceToMove === "knight") {
            targetAlgebraicNotations = getAlgebraicKnightMoves(file, rank);
            targetAlgebraicNotations = targetAlgebraicNotations.filter(
                (notation) => {
                    let position = tmpPositions.find(
                        (item) => item.algebraicNotation === notation
                    );
                    return (
                        position?.piece === null ||
                        position?.piece.color !== activePlayer
                    );
                }
            );
        }

        if (pieceToMove === "bishop") {
            targetAlgebraicNotations = getAlgebraicBishopMoves(
                file,
                rank,
                tmpPositions,
                activePlayer
            );
        }

        if (pieceToMove === "rook") {
            targetAlgebraicNotations = getAlgebraicRookMoves(
                file,
                rank,
                tmpPositions,
                activePlayer
            );
        }

        if (pieceToMove === "queen") {
            targetAlgebraicNotations = getAlgebraicQueenMoves(
                file,
                rank,
                tmpPositions,
                activePlayer
            );
        }

        if (pieceToMove === "king") {
            const isKingSideCastleAvailable =
                activePlayer === "white"
                    ? isWhiteKingSideCastleAvailable
                    : isBlackKingSideCastleAvailable;
            const isQueenSideCastleAvailable =
                activePlayer === "white"
                    ? isWhiteQueenSideCastleAvailable
                    : isBlackQueenSideCastleAvailable;
            targetAlgebraicNotations = getAlgebraicKingMoves(
                file,
                rank,
                tmpPositions,
                activePlayer,
                isKingSideCastleAvailable,
                isQueenSideCastleAvailable
            );
        }

        possibleMoves = targetAlgebraicNotations.map(
            (notation) =>
                tmpPositions.findIndex(
                    (position) => position.algebraicNotation === notation
                ) + 1
        );

        setDropTargets(possibleMoves);
    };

    const startDrag = (squareSource: BoardPosition): void => {
        const [file, rank] = squareSource.algebraicNotation.split("");
        const pieceToMove = squareSource.piece!.name;
        getMovesByPiece(pieceToMove, file, rank);
    };

    return (
        <DragDropProvider
            onDragStart={(e) => {
                if (e.operation) {
                    let source = e.operation.source!;
                    let sourceId: any = source.id;
                    let dragFrom =
                        parseInt(sourceId?.replace("draggable-", "")) - 1;
                    setPieceInDrag(dragFrom);
                    startDrag(positions[dragFrom]);
                }
            }}
            onDragEnd={(e) => {
                if (e.operation) {
                    const source = e.operation.source!;
                    const sourceId: any = source.id;
                    const sourcePositionIndex =
                        parseInt(sourceId?.replace("draggable-", "")) - 1;
                    const targetId: any = e.operation.target?.id;
                    const targetPosition = [...positions][targetId - 1];

                    /* On drop,
                     * check for en passan capture which is dependent upon the previous move,
                     * and get en passan notation dependent upon the current move.
                     */
                    const isEnPassanCapture =
                        targetPosition?.algebraicNotation ===
                        enPassanNotation?.landingSquareNotation;

                    if (targetId) {
                        const tmpEnPassan = getEnPassanNotation({
                            positions,
                            squareIndex: sourcePositionIndex,
                            target: targetId,
                            source: pieceInDrag,
                            activePlayer,
                        });

                        setEnPassanNotation(tmpEnPassan);

                        // Check for castling
                        if (positions[pieceInDrag].piece?.name === "rook") {
                            if (
                                isWhiteKingSideCastleAvailable &&
                                sourcePositionIndex === 63
                            ) {
                                setIsWhiteKingSideCastleAvailable(false);
                            }
                            if (
                                isWhiteQueenSideCastleAvailable &&
                                sourcePositionIndex === 56
                            ) {
                                setIsWhiteQueenSideCastleAvailable(false);
                            }
                            if (
                                isBlackKingSideCastleAvailable &&
                                sourcePositionIndex === 7
                            ) {
                                setIsBlackKingSideCastleAvailable(false);
                            }
                            if (
                                isBlackQueenSideCastleAvailable &&
                                sourcePositionIndex === 0
                            ) {
                                setIsBlackQueenSideCastleAvailable(false);
                            }
                        }

                        if (
                            positions[pieceInDrag].piece?.name === "king" &&
                            (isWhiteKingSideCastleAvailable ||
                                isWhiteQueenSideCastleAvailable ||
                                isBlackKingSideCastleAvailable ||
                                isBlackQueenSideCastleAvailable)
                        ) {
                            const castlingParams: number[] = getCastlingParams({
                                activePlayer,
                                sourcePositionIndex,
                                targetId,
                                isWhiteKingSideCastleAvailable,
                                isWhiteQueenSideCastleAvailable,
                                isBlackKingSideCastleAvailable,
                                isBlackQueenSideCastleAvailable,
                            });

                            if (activePlayer === "white") {
                                if (castlingParams.length) {
                                    onCastle(
                                        positions[pieceInDrag].piece!,
                                        positions[castlingParams.at(-1)!]
                                            .piece!,
                                        castlingParams
                                    );
                                } else {
                                    onPiecePositionChange(
                                        targetId - 1,
                                        positions[sourcePositionIndex].piece!,
                                        pieceInDrag,
                                        null
                                    );
                                }

                                setIsWhiteKingSideCastleAvailable(false);
                                setIsWhiteQueenSideCastleAvailable(false);
                            }

                            if (activePlayer === "black") {
                                if (castlingParams.length) {
                                    onCastle(
                                        positions[pieceInDrag].piece!,
                                        positions[castlingParams.at(-1)!]
                                            .piece!,
                                        castlingParams
                                    );
                                } else {
                                    onPiecePositionChange(
                                        targetId - 1,
                                        positions[sourcePositionIndex].piece!,
                                        pieceInDrag,
                                        null
                                    );
                                }
                                setIsBlackKingSideCastleAvailable(false);
                                setIsBlackQueenSideCastleAvailable(false);
                            }
                        } else {
                            onPiecePositionChange(
                                targetId - 1,
                                positions[sourcePositionIndex].piece!,
                                pieceInDrag,
                                isEnPassanCapture ? enPassanNotation : null
                            );
                        }
                    } else {
                        console.log("invalid move");
                    }
                }
            }}
        >
            <div className="border-solid border-8 border-slate-600 drop-shadow-2xl">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((rowId) => (
                    <Row
                        key={rowId}
                        id={rowId}
                        activePlayer={activePlayer}
                        boardPositions={positions}
                        dropTargets={dropTargets}
                    />
                ))}
            </div>
        </DragDropProvider>
    );
};

export default Board;
