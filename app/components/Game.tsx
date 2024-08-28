"use client";
import React, { useState, useEffect } from "react";
import Board from "./Board";
import FileRow from "./File/FileRow";
import RankColumn from "./Rank/RankColumn";
import ControlsModal from "./Controls/ControlsModal";
import {
    Game as GameInterface,
    BoardPosition,
    Piece,
    EnPassan,
} from "./Interfaces";
import { initialBoardPositions } from "./AlgebraicPositionServices/AlgebraicNotationConstants";
import SidePanel from "./SidePanel";
import { getKnightThreats } from "./AlgebraicPositionServices/AlgebraicKnightPositionServices";
import { getBishopThreats } from "./AlgebraicPositionServices/AlgebraicBishopPositionServices";

const Game = () => {
    const [gameState, setGameState] = useState<GameInterface>({
        activePlayer: "white",
        boardPositions: initialBoardPositions,
    });
    const [isRankAndFileVisible, setIsRankAndFileVisible] = useState(false);
    const [capturedWhite, setCapturedWhite] = useState<string[]>([]);
    const [capturedBlack, setCapturedBlack] = useState<string[]>([]);
    const [checkMessages, setCheckMessages] = useState<string[] | null>(null);

    useEffect(() => {
        checkKingSafety();
    }, [gameState]);

    const getNextPlayer = (): string =>
        gameState.activePlayer === "white" ? "black" : "white";

    const toggleRankAndFile = (): void => {
        let tmpVisibility = isRankAndFileVisible;
        setIsRankAndFileVisible(!tmpVisibility);
    };

    const capturePiece = (dropPosition: BoardPosition): void => {
        if (dropPosition.piece!.color === "white") {
            let tmpCapturedWhitePieces = [...capturedWhite];
            tmpCapturedWhitePieces.push(dropPosition.piece!.code);
            setCapturedWhite(tmpCapturedWhitePieces);
        } else {
            let tmpCapturedPieces = [...capturedBlack];
            tmpCapturedPieces.push(dropPosition.piece!.code);
            setCapturedBlack(tmpCapturedPieces);
        }
    };

    const checkKingSafety = (): void => {
        const kingSquareNotation = getKingSquare();
        const checkingPlayer = getNextPlayer();
        const knightThreats = getKnightThreats(
            kingSquareNotation,
            gameState.boardPositions,
            gameState.activePlayer
        );
        const bishopThreats = getBishopThreats(
            kingSquareNotation,
            gameState.boardPositions,
            gameState.activePlayer
        );
        let tmpCheckMessages: string[] = [];

        if (knightThreats.length) {
            tmpCheckMessages.push(`${checkingPlayer} knight checks`);
        }

        if (bishopThreats.length) {
            tmpCheckMessages.push(`${checkingPlayer} bishop checks`);
        }

        if (tmpCheckMessages.length) {
            setCheckMessages(tmpCheckMessages);
        } else {
            setCheckMessages(null);
        }
    };

    const getKingSquare = (): string => {
        const tmpGameState = { ...gameState };
        const kingPosition = tmpGameState.boardPositions.find(
            (position) =>
                position.piece?.name === "king" &&
                position.piece?.color === tmpGameState.activePlayer
        );
        return kingPosition!.algebraicNotation;
    };

    const onCastle = (
        kingPiece: Piece,
        rookPiece: Piece,
        indices: number[]
    ): void => {
        const [kingSourceIndex, kingDropId, rookDropId, cornerId] = indices;
        let tmpGameState = { ...gameState };
        let tmpBoardPositions: BoardPosition[] = tmpGameState.boardPositions;
        let kingDropPosition: BoardPosition =
            Object.values(tmpBoardPositions)[kingDropId];
        let rookDropPosition = Object.values(tmpBoardPositions)[rookDropId];
        let originalKingPosition: BoardPosition =
            Object.values(tmpBoardPositions)[kingSourceIndex];
        let cornerPosition = Object.values(tmpBoardPositions)[cornerId];
        kingDropPosition.piece = kingPiece;
        rookDropPosition.piece = rookPiece;
        originalKingPosition.piece = null;
        cornerPosition.piece = null;
        tmpGameState.activePlayer = getNextPlayer();
        setGameState(tmpGameState);
    };

    const updatePosition = (
        id: number,
        piece: Piece,
        pieceInDrag: number,
        enPassanNotation: EnPassan | null
    ) => {
        let tmpGameState = { ...gameState };
        let tmpBoardPositions: BoardPosition[] = tmpGameState.boardPositions;
        let dropPosition: BoardPosition = Object.values(tmpBoardPositions)[id];
        let emptyPosition: BoardPosition =
            Object.values(tmpBoardPositions)[pieceInDrag];

        if (dropPosition?.piece) {
            capturePiece(dropPosition);
        }
        if (enPassanNotation?.captureSquareNotation) {
            const enPassanCapturePosition = tmpBoardPositions.find(
                (position) =>
                    position?.algebraicNotation ===
                    enPassanNotation.captureSquareNotation
            );
            if (enPassanCapturePosition) {
                capturePiece(enPassanCapturePosition);
                enPassanCapturePosition.piece = null;
            }
        }

        dropPosition.piece = piece;
        emptyPosition.piece = null;

        tmpGameState.activePlayer = getNextPlayer();

        setGameState(tmpGameState);
    };

    return (
        <>
            <ControlsModal toggleRankAndFile={toggleRankAndFile} />
            <div className={`h-4 ${checkMessages?.length ? "visible" : "invisible"}`}>
                {checkMessages?.length &&
                    checkMessages.map((cMessage, index) => (
                        <div key={`check-message-${index}`}>{cMessage}</div>
                    ))}
            </div>
            <div className="container mx-auto my-2 w-fit flex justify-center">
                <SidePanel
                    color="black"
                    isActive={gameState.activePlayer === "black"}
                >
                    {capturedWhite}
                </SidePanel>
                <div className="grid grid-cols-[25px, 1fr] gap-4">
                    <FileRow isVisible={isRankAndFileVisible} />
                    <RankColumn isVisible={isRankAndFileVisible} />
                    <Board
                        activePlayer={gameState.activePlayer}
                        positions={gameState.boardPositions}
                        onPiecePositionChange={updatePosition}
                        onCastle={onCastle}
                    />
                </div>
                <SidePanel
                    color="white"
                    isActive={gameState.activePlayer === "white"}
                >
                    {capturedBlack}
                </SidePanel>
            </div>
        </>
    );
};

export default Game;
