"use client";
import React, { useState } from "react";
import Row from "./Row";
import { BoardPosition, Piece } from "./Interfaces";
import { DragDropProvider } from "@dnd-kit/react";
import { getAlgebraicPawnMoves } from "./AlgebraicPositionServices/AlgebraicPawnPositionServices";
import { getAlgebraicKnightMoves } from "./AlgebraicPositionServices/AlgebraicKnightPositionServices";
import { getAlgebraicBishopMoves } from "./AlgebraicPositionServices/AlgebraicBishopPositionServices";
import { getAlgebraicRookMoves } from "./AlgebraicPositionServices/AlgebraicRookPositionServices";
import { getAlgebraicQueenMoves } from "./AlgebraicPositionServices/AlgebraicQueenPositionServices";
import { getAlgebraicKingMoves } from "./AlgebraicPositionServices/AlgebraicKingPositionServices";

interface BoardProps {
    activePlayer: string;
    positions: BoardPosition[];
    onPiecePositionChange: (
        id: number,
        piece: Piece,
        pieceInDrag: number
    ) => void;
}

const Board = ({
    activePlayer,
    positions,
    onPiecePositionChange,
}: BoardProps) => {
    const [dropTargets, setDropTargets] = useState<number[]>([]);
    const [pieceInDrag, setPieceInDrag] = useState<number>(0);

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
            targetAlgebraicNotations = getAlgebraicKingMoves(
                file,
                rank,
                tmpPositions,
                activePlayer
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

    const getTargetIndices = (squareSource: BoardPosition) => {
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
                    getTargetIndices(positions[dragFrom]);
                }
            }}
            onDragEnd={(e) => {
                if (e.operation) {
                    let source = e.operation.source!;
                    let sourceId: any = source.id;
                    let sourcePositionIndex =
                        parseInt(sourceId?.replace("draggable-", "")) - 1;
                    let targetId: any = e.operation.target?.id;

                    if (targetId) {
                        onPiecePositionChange(
                            targetId - 1,
                            positions[sourcePositionIndex].piece!,
                            pieceInDrag
                        );
                    } else {
                        alert("You cannot move there");
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
