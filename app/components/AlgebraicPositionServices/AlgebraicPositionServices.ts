import { Files } from "./AlgebraicNotationConstants";
import { BoardPosition } from "../Interfaces";

declare type FileType = keyof typeof Files;

export const getNorthFile = (
    origin: string,
    boardPositions: BoardPosition[],
    activePlayer: string
) => getFileLine(origin, boardPositions, activePlayer, 1);

export const getNorthFile1Space = (
    origin: string,
    boardPositions: BoardPosition[],
    activePlayer: string
) => getFileLine(origin, boardPositions, activePlayer, 1, true);

export const getSouthFile = (
    origin: string,
    boardPositions: BoardPosition[],
    activePlayer: string
) => getFileLine(origin, boardPositions, activePlayer, -1);

export const getSouthFile1Space = (
    origin: string,
    boardPositions: BoardPosition[],
    activePlayer: string
) => getFileLine(origin, boardPositions, activePlayer, -1, true);

export const getEastRank = (
    origin: string,
    boardPositions: BoardPosition[],
    activePlayer: string
) => getRankLine(origin, boardPositions, activePlayer, 1);

export const getEastRank1Space = (
    origin: string,
    boardPositions: BoardPosition[],
    activePlayer: string
) => getRankLine(origin, boardPositions, activePlayer, 1, true);

export const getWestRank = (
    origin: string,
    boardPositions: BoardPosition[],
    activePlayer: string
) => getRankLine(origin, boardPositions, activePlayer, -1);

export const getWestRank1Space = (
    origin: string,
    boardPositions: BoardPosition[],
    activePlayer: string
) => getRankLine(origin, boardPositions, activePlayer, -1, true);

export const getNorthWestDiagonal = (
    origin: string,
    boardPositions: BoardPosition[],
    activePlayer: string
) => getDiagonal(origin, boardPositions, activePlayer, -1, 1);

export const getNorthWestDiagonal1Space = (
    origin: string,
    boardPositions: BoardPosition[],
    activePlayer: string
) => getDiagonal(origin, boardPositions, activePlayer, -1, 1, true);

export const getNorthEastDiagonal = (
    origin: string,
    boardPositions: BoardPosition[],
    activePlayer: string
) => getDiagonal(origin, boardPositions, activePlayer, 1, 1);

export const getNorthEastDiagonal1Space = (
    origin: string,
    boardPositions: BoardPosition[],
    activePlayer: string
) => getDiagonal(origin, boardPositions, activePlayer, 1, 1, true);

export const getSouthWestDiagonal = (
    origin: string,
    boardPositions: BoardPosition[],
    activePlayer: string
) => getDiagonal(origin, boardPositions, activePlayer, -1, -1);

export const getSouthWestDiagonal1Space = (
    origin: string,
    boardPositions: BoardPosition[],
    activePlayer: string
) => getDiagonal(origin, boardPositions, activePlayer, -1, -1, true);

export const getSouthEastDiagonal = (
    origin: string,
    boardPositions: BoardPosition[],
    activePlayer: string
) => getDiagonal(origin, boardPositions, activePlayer, 1, -1);

export const getSouthEastDiagonal1Space = (
    origin: string,
    boardPositions: BoardPosition[],
    activePlayer: string
) => getDiagonal(origin, boardPositions, activePlayer, 1, -1, true);

const getDiagonal = (
    origin: string,
    boardPositions: BoardPosition[],
    activePlayer: string,
    fileIncrement: number,
    rankIncrement: number,
    isLimit1Space = false
) => {
    const [originFileString, originRankString] = origin.split("");
    const originFileIndex = Files[originFileString as FileType];
    const originRank = parseInt(originRankString);
    let nextFileIndex = originFileIndex + fileIncrement;
    let nextRank = originRank + rankIncrement;
    let nextNotation = Files[nextFileIndex] + nextRank;
    let nextPosition = boardPositions.find(
        (position) => position.algebraicNotation === nextNotation
    );
    let diagonal: string[] = [];
    let isLimitReached = false;

    while (nextPosition && !isLimitReached) {
        isLimitReached = isLimit1Space;
        if (nextPosition.piece === null) {
            diagonal.push(nextPosition.algebraicNotation);
            nextFileIndex += fileIncrement;
            nextRank += rankIncrement;
            nextNotation = Files[nextFileIndex] + nextRank;
            nextPosition = boardPositions.find(
                (position) => position.algebraicNotation === nextNotation
            );
        } else if (nextPosition.piece.color !== activePlayer) {
            diagonal.push(nextPosition.algebraicNotation);
            nextPosition = undefined;
        } else {
            nextPosition = undefined;
        }
    }

    return diagonal;
};

const getFileLine = (
    origin: string,
    boardPositions: BoardPosition[],
    activePlayer: string,
    rankIncrement: number,
    isLimit1Space = false
) => {
    const [originFileString, originRankString] = origin.split("");
    const originRank = parseInt(originRankString);
    let nextRank = originRank + rankIncrement;
    let nextNotation = originFileString + nextRank;
    let nextPosition = boardPositions.find(
        (position) => position.algebraicNotation === nextNotation
    );
    let fileLine: string[] = [];
    let isLimitReached = false;

    while (nextPosition && !isLimitReached) {
        isLimitReached = isLimit1Space;
        if (nextPosition.piece === null) {
            fileLine.push(nextPosition.algebraicNotation);
            nextRank += rankIncrement;
            nextNotation = originFileString + nextRank;
            nextPosition = boardPositions.find(
                (position) => position.algebraicNotation === nextNotation
            );
        } else if (nextPosition.piece.color !== activePlayer) {
            fileLine.push(nextPosition.algebraicNotation);
            nextPosition = undefined;
        } else {
            nextPosition = undefined;
        }
    }

    return fileLine;
};

const getRankLine = (
    origin: string,
    boardPositions: BoardPosition[],
    activePlayer: string,
    fileIncrement: number,
    isLimit1Space = false
) => {
    const [originFileString, originRankString] = origin.split("");
    const originFileIndex = Files[originFileString as FileType];
    let nextFileIndex = originFileIndex + fileIncrement;
    let nextNotation = Files[nextFileIndex] + originRankString;
    let nextPosition = boardPositions.find(
        (position) => position.algebraicNotation === nextNotation
    );
    let rankLine: string[] = [];
    let isLimitReached = false;

    while (nextPosition && !isLimitReached) {
        isLimitReached = isLimit1Space;
        if (nextPosition.piece === null) {
            rankLine.push(nextPosition.algebraicNotation);
            nextFileIndex += fileIncrement;
            nextNotation = Files[nextFileIndex] + originRankString;
            nextPosition = boardPositions.find(
                (position) => position.algebraicNotation === nextNotation
            );
        } else if (nextPosition.piece.color !== activePlayer) {
            rankLine.push(nextPosition.algebraicNotation);
            nextPosition = undefined;
        } else {
            nextPosition = undefined;
        }
    }

    return rankLine;
};
