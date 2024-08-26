"use client";
import React, { useState } from "react";
import Board from "./Board";
import FileRow from "./File/FileRow";
import RankColumn from "./Rank/RankColumn";
import ControlsModal from "./Controls/ControlsModal";
import { BoardPosition, Piece } from "./Interfaces";
import { initialBoardPositions } from "./AlgebraicPositionServices/AlgebraicNotationConstants";
import SidePanel from "./SidePanel";

const Game = () => {
    const [activePlayer, setActivePlayer] = useState("white");
    const [isRankAndFileVisible, setIsRankAndFileVisible] = useState(false);
    const [boardPositions, setBoardPositions] = useState<BoardPosition[]>(
        initialBoardPositions
    );
    const [capturedWhite, setCapturedWhite] = useState<string[]>([]);
    const [capturedBlack, setCapturedBlack] = useState<string[]>([]);

    const toggleActivePlayer = (): void => {
        let player = activePlayer === "white" ? "black" : "white";
        console.log("active play is now", player);
        setActivePlayer(player);
    };

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

    const updatePosition = (
        id: number,
        piece: Piece,
        pieceInDrag: number
    ): void => {
        let tmpBoardPositions: BoardPosition[] = [...boardPositions];
        let dropPosition: BoardPosition = Object.values(tmpBoardPositions)[id];
        let emptyPosition: BoardPosition =
            Object.values(tmpBoardPositions)[pieceInDrag];

        if (dropPosition?.piece) {
            capturePiece(dropPosition);
        }

        dropPosition.piece = piece;
        emptyPosition.piece = null;
        setBoardPositions(tmpBoardPositions);
        toggleActivePlayer();
    };

    return boardPositions ? (
        <>
            <ControlsModal toggleRankAndFile={toggleRankAndFile} />
            <div className="container mx-auto w-fit flex justify-center">
                <SidePanel color="black" isActive={activePlayer === "black"}>
                    {capturedWhite}
                </SidePanel>
                <div className="grid grid-cols-[25px, 1fr] gap-4">
                    <FileRow isVisible={isRankAndFileVisible} />
                    <RankColumn isVisible={isRankAndFileVisible} />
                    <Board
                        activePlayer={activePlayer}
                        positions={boardPositions}
                        onPiecePositionChange={updatePosition}
                    />
                </div>
                <SidePanel color="white" isActive={activePlayer === "white"}>{capturedBlack}</SidePanel>
            </div>
        </>
    ) : null;
};

export default Game;
