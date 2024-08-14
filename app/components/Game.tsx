"use client";
import React, { useState } from "react";
import Board from "./Board";
import FileRow from "./File/FileRow";
import RankColumn from "./Rank/RankColumn";
import Controls from "./Controls";

export interface BoardPosition {
    annotation: string;
    piece: string;
}

export const initBoardPositions: BoardPosition[] = [
    { annotation: "blank", piece: "blank" },
    {
        annotation: "a8",
        piece: "&#9820;",
    },
    {
        annotation: "b8",
        piece: "&#9822;",
    },
    {
        annotation: "c8",
        piece: "&#9821;",
    },
    {
        annotation: "d8",
        piece: "&#9819;",
    },
    {
        annotation: "e8",
        piece: "&#9818;",
    },
    {
        annotation: "f8",
        piece: "&#9821;",
    },
    {
        annotation: "g8",
        piece: "&#9822;",
    },
    {
        annotation: "h8",
        piece: "&#9820;",
    },
    {
        annotation: "a7",
        piece: "&#9823",
    },
    {
        annotation: "b7",
        piece: "&#9823",
    },
    {
        annotation: "c7",
        piece: "&#9823",
    },
    {
        annotation: "d7",
        piece: "&#9823;",
    },
    {
        annotation: "e7",
        piece: "&#9823;",
    },
    {
        annotation: "f7",
        piece: "&#9823;",
    },
    {
        annotation: "g7",
        piece: "&#9823;",
    },
    {
        annotation: "h7",
        piece: "&#9823;",
    },
    {
        annotation: "a6",
        piece: "",
    },
    {
        annotation: "b6",
        piece: "",
    },
    {
        annotation: "c6",
        piece: "",
    },
    {
        annotation: "d6",
        piece: "",
    },
    {
        annotation: "e6",
        piece: "",
    },
    {
        annotation: "f6",
        piece: "",
    },
    {
        annotation: "g6",
        piece: "",
    },
    {
        annotation: "h6",
        piece: "",
    },
    {
        annotation: "a5",
        piece: "",
    },
    {
        annotation: "b5",
        piece: "",
    },
    {
        annotation: "c5",
        piece: "",
    },
    {
        annotation: "d5",
        piece: "",
    },
    {
        annotation: "e5",
        piece: "",
    },
    {
        annotation: "f5",
        piece: "",
    },
    {
        annotation: "g5",
        piece: "",
    },
    {
        annotation: "h5",
        piece: "",
    },
    {
        annotation: "a4",
        piece: "",
    },
    {
        annotation: "b4",
        piece: "",
    },
    {
        annotation: "c4",
        piece: "",
    },
    {
        annotation: "d4",
        piece: "",
    },
    {
        annotation: "e4",
        piece: "",
    },
    {
        annotation: "f4",
        piece: "",
    },
    {
        annotation: "g4",
        piece: "",
    },
    {
        annotation: "h4",
        piece: "",
    },
    {
        annotation: "a3",
        piece: "",
    },
    {
        annotation: "b3",
        piece: "",
    },
    {
        annotation: "c3",
        piece: "",
    },
    {
        annotation: "d3",
        piece: "",
    },
    {
        annotation: "e3",
        piece: "",
    },
    {
        annotation: "f3",
        piece: "",
    },
    {
        annotation: "g3",
        piece: "",
    },
    {
        annotation: "h3",
        piece: "",
    },
    {
        annotation: "a2",
        piece: "&#9817",
    },
    {
        annotation: "b2",
        piece: "&#9817",
    },
    {
        annotation: "c2",
        piece: "&#9817",
    },
    {
        annotation: "d2",
        piece: "&#9817",
    },
    {
        annotation: "e2",
        piece: "&#9817",
    },
    {
        annotation: "f2",
        piece: "&#9817",
    },
    {
        annotation: "g2",
        piece: "&#9817",
    },
    {
        annotation: "h2",
        piece: "&#9817",
    },
    {
        annotation: "a1",
        piece: "&#9814",
    },
    {
        annotation: "b1",
        piece: "&#9816",
    },
    {
        annotation: "c1",
        piece: "&#9815",
    },
    {
        annotation: "d1",
        piece: "&#9813",
    },
    {
        annotation: "e1",
        piece: "&#9812",
    },
    {
        annotation: "f1",
        piece: "&#9815",
    },
    {
        annotation: "g1",
        piece: "&#9816",
    },
    {
        annotation: "h1",
        piece: "&#9814",
    },
];

const Game = () => {
    const [isRankAndFileVisible, setIsRankAndFileVisible] = useState(false);
    const [boardPositions, setBoardPositions] =
        useState<BoardPosition[]>(initBoardPositions);

    const toggleRankAndFile = () => {
        let tmpVisibility = isRankAndFileVisible;
        setIsRankAndFileVisible(!tmpVisibility);
    };

    return boardPositions ? (
        <div className="container w-fit grid grid-cols-[25px,1fr] gap-4">
            <Controls toggleRankAndFile={toggleRankAndFile} />
            <FileRow isVisible={isRankAndFileVisible} />
            <RankColumn isVisible={isRankAndFileVisible} />
            <Board positions={boardPositions} />
        </div>
    ) : null;
};

export default Game;
