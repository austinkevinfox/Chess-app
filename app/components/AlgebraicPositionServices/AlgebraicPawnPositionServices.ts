import { BoardPosition } from "../Interfaces";
import {
    getNorthFile1Space,
    getSouthFile1Space,
    getNorthEastDiagonal1Space,
    getNorthWestDiagonal1Space,
    getSouthEastDiagonal1Space,
    getSouthWestDiagonal1Space,
} from "./AlgebraicPositionServices";

export const getAlgebraicPawnMoves = (
    file: string,
    rank: string,
    boardPositions: BoardPosition[],
    activePlayer: string
): string[] => {
    let pawnMoves: string[];

    if (activePlayer === "white") {
        const northFile = getNorthFile1Space(
            file + rank,
            boardPositions,
            activePlayer
        );
        const northEastDiagonal = getNorthEastDiagonal1Space(
            file + rank,
            boardPositions,
            activePlayer
        );
        const northWestDiagonal = getNorthWestDiagonal1Space(
            file + rank,
            boardPositions,
            activePlayer
        );

        pawnMoves = [...northFile];

        if (
            isPawnAbleToCapture(boardPositions, northEastDiagonal, activePlayer)
        ) {
            pawnMoves = [...pawnMoves, ...northEastDiagonal];
        }

        if (
            isPawnAbleToCapture(boardPositions, northWestDiagonal, activePlayer)
        ) {
            pawnMoves = [...pawnMoves, ...northWestDiagonal];
        }
    } else {
        const southFile = getSouthFile1Space(
            file + rank,
            boardPositions,
            activePlayer
        );
        const southEastDiagonal = getSouthEastDiagonal1Space(
            file + rank,
            boardPositions,
            activePlayer
        );
        const southWestDiagonal = getSouthWestDiagonal1Space(
            file + rank,
            boardPositions,
            activePlayer
        );

        pawnMoves = [...southFile];

        if (
            isPawnAbleToCapture(boardPositions, southEastDiagonal, activePlayer)
        ) {
            pawnMoves = [...pawnMoves, ...southEastDiagonal];
        }

        if (
            isPawnAbleToCapture(boardPositions, southWestDiagonal, activePlayer)
        ) {
            pawnMoves = [...pawnMoves, ...southWestDiagonal];
        }
    }

    return pawnMoves;
};

const isPawnAbleToCapture = (
    boardPositions: BoardPosition[],
    targetPositions: string[],
    activePlayer: string
): boolean =>
    boardPositions.find(
        (position) => position.algebraicNotation === targetPositions[0]
    )?.piece?.color !== activePlayer;

const getAlgebraicPawnPositionsByStep = (
    file: string,
    rank: number,
    step: number
): string[] => {
    let result: string[] = [];
    let tmpRank = rank + step;
    if (tmpRank >= 1 && tmpRank <= 8) {
        result.push(file + tmpRank);
    }
    return result;
};
