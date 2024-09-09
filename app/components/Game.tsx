"use client";
import React, { useState, useEffect } from "react";
import Board from "./Board";
import FileRow from "./File/FileRow";
import RankColumn from "./Rank/RankColumn";
import {
    Game as GameInterface,
    BoardPosition,
    Piece,
    EnPassan,
    MoveRecord,
} from "./Interfaces";
import { initialBoardPositions } from "./AlgebraicPositionServices/AlgebraicNotationConstants";
import SidePanel from "./SidePanel";
import {
    isMate,
    getThreatsToKing,
} from "./AlgebraicPositionServices/AlgebraicKingPositionServices";
import RecordedMoves from "./RecordedMoves";
import RankAndFileToggler from "./Controls/RankAndFileToggler";

const Game = () => {
    const [gameState, setGameState] = useState<GameInterface>({
        activePlayer: "",
        boardPositions: [],
    });
    const [moveRecords, setMoveRecords] = useState<MoveRecord[]>([]);
    const [isRankAndFileVisible, setIsRankAndFileVisible] = useState(false);
    const [capturedWhite, setCapturedWhite] = useState<Piece[]>([]);
    const [capturedBlack, setCapturedBlack] = useState<Piece[]>([]);
    const [checkMessages, setCheckMessages] = useState<string[] | null>(null);
    const [winner, setWinner] = useState<string>("");

    useEffect(() => {
        if (gameState?.activePlayer && gameState?.boardPositions) {
            findCheckingThreats();
        } else {
            setGameState({
                activePlayer: "white",
                boardPositions: initialBoardPositions,
            });
        }
    }, [gameState]);

    const getNextPlayer = (): string =>
        gameState!.activePlayer === "white" ? "black" : "white";

    const toggleRankAndFile = (): void => {
        let tmpVisibility = isRankAndFileVisible;
        setIsRankAndFileVisible(!tmpVisibility);
    };

    const capturePiece = (dropPosition: BoardPosition): void => {
        if (dropPosition.piece!.color === "white") {
            let tmpCapturedWhitePieces = [...capturedWhite];
            tmpCapturedWhitePieces.push(dropPosition.piece!);
            setCapturedWhite(tmpCapturedWhitePieces);
        } else {
            let tmpCapturedPieces = [...capturedBlack];
            tmpCapturedPieces.push(dropPosition.piece!);
            setCapturedBlack(tmpCapturedPieces);
        }
    };

    const findCheckingThreats = (): void => {
        const threats = getThreatsToKing({
            boardPositions: gameState!.boardPositions,
            activePlayer: gameState!.activePlayer,
        });
        const checkingPlayer = getNextPlayer();
        let tmpCheckMessages: string[] = [];

        if (threats.knightThreats.length) {
            tmpCheckMessages.push(`${checkingPlayer} knight checks`);
        }

        if (threats.bishopThreats.length) {
            tmpCheckMessages.push(`${checkingPlayer} bishop checks`);
        }

        if (threats.rookThreats.length) {
            tmpCheckMessages.push(`${checkingPlayer} rook checks`);
        }

        if (threats.queenThreats.length) {
            tmpCheckMessages.push(`${checkingPlayer} queen checks`);
        }

        if (tmpCheckMessages.length) {
            if (
                isMate({
                    boardPositions: gameState.boardPositions,
                    activePlayer: gameState.activePlayer,
                })
            ) {
                // let tmpGameState = { ...gameState};
                // tmpGameState.activePlayer = 'check-mate';
                // setGameState(tmpGameState);
                tmpCheckMessages.push("CHECK MATE!");
                setWinner(gameState.activePlayer);
            }
            setCheckMessages(tmpCheckMessages);
        } else {
            setCheckMessages(null);
        }
    };

    const onCastle = (
        kingPiece: Piece,
        rookPiece: Piece,
        indices: number[]
    ): void => {
        const [kingSourceIndex, kingDropId, rookDropId, cornerId] = indices;
        let tmpGameState = { ...gameState! };
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
        let tmpGameState = { ...gameState! };
        let tmpBoardPositions: BoardPosition[] = tmpGameState.boardPositions;
        let dropPosition: BoardPosition = Object.values(tmpBoardPositions)[id];
        let emptyPosition: BoardPosition =
            Object.values(tmpBoardPositions)[pieceInDrag];
        let activePieceSymbol = emptyPosition.piece?.symbol;
        let notationJunction = "";
        let capturingSymbol = "";

        if (dropPosition?.piece) {
            notationJunction = "x";
            capturingSymbol = emptyPosition.piece!.symbol;
            capturePiece(dropPosition);
        }
        if (enPassanNotation?.captureSquareNotation) {
            const enPassanCapturePosition = tmpBoardPositions.find(
                (position) =>
                    position?.algebraicNotation ===
                    enPassanNotation.captureSquareNotation
            );
            if (enPassanCapturePosition) {
                notationJunction = "x";
                capturePiece(enPassanCapturePosition);
                enPassanCapturePosition.piece = null;
            }
        }

        let tmpMoveRecords = [...moveRecords];
        let newMove = "";
        if (activePieceSymbol === "P") {
            if (notationJunction.length > 0) {
                newMove = `${emptyPosition.algebraicNotation}${notationJunction}${dropPosition.algebraicNotation}`;
            } else {
                newMove = dropPosition.algebraicNotation;
            }
        } else {
            newMove = `${activePieceSymbol}${notationJunction}${dropPosition.algebraicNotation}`;
        }

        if (tmpGameState.activePlayer === "white") {
            const whiteMove: MoveRecord = { white: newMove, black: "" };
            tmpMoveRecords.push(whiteMove);
        } else {
            let blackMove: MoveRecord = tmpMoveRecords.at(-1)!;
            blackMove.black = newMove;
        }

        dropPosition.piece = piece;
        emptyPosition.piece = null;

        tmpGameState.activePlayer = getNextPlayer();

        setGameState(tmpGameState);
        setMoveRecords(tmpMoveRecords);
    };

    return gameState?.activePlayer.length > 0 &&
        gameState.boardPositions.length === 64 ? (
        <>
            <div
                className={`h-4 ${
                    checkMessages?.length ? "visible" : "invisible"
                }`}
            >
                {checkMessages?.length &&
                    checkMessages.map((cMessage, index) => (
                        <div key={`check-message-${index}`}>{cMessage}</div>
                    ))}
            </div>
            <div className="container mx-auto my-2 w-fit flex justify-center">
                <SidePanel
                    color="black"
                    activePlayer={gameState.activePlayer}
                    winner={winner}
                    capturedWhite={capturedWhite}
                    capturedBlack={capturedBlack}
                />
                <div className="grid grid-cols-[10px, 1fr] gap-4">
                    <RankAndFileToggler
                        isVisible={isRankAndFileVisible}
                        onClick={toggleRankAndFile}
                    />
                    <FileRow isVisible={isRankAndFileVisible} />
                    <RankColumn isVisible={isRankAndFileVisible} />
                    <Board
                        activePlayer={gameState!.activePlayer}
                        positions={gameState!.boardPositions}
                        onPiecePositionChange={updatePosition}
                        onCastle={onCastle}
                    />
                </div>
                <div>
                    <SidePanel
                        color="white"
                        activePlayer={gameState.activePlayer}
                        winner={winner}
                        capturedWhite={capturedWhite}
                        capturedBlack={capturedBlack}
                    />
                    <RecordedMoves moves={moveRecords} />
                </div>
            </div>
        </>
    ) : (
        <div>Loading...</div>
    );
};

export default Game;
