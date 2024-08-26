import { BoardPosition } from "../Interfaces";
import {
    getNorthEastDiagonal,
    getNorthWestDiagonal,
    getSouthEastDiagonal,
    getSouthWestDiagonal,
} from "./AlgebraicPositionServices";

export const getAlgebraicBishopMoves = (
    file: string,
    rank: string,
    boardPositions: BoardPosition[],
    activePlayer: string
): string[] => {
    const northWestDiagonal = getNorthWestDiagonal(
        file + rank,
        boardPositions,
        activePlayer
    );
    const northEastDiagonal = getNorthEastDiagonal(
        file + rank,
        boardPositions,
        activePlayer
    );
    const southWestDiagonal = getSouthWestDiagonal(
        file + rank,
        boardPositions,
        activePlayer
    );
    const southEastDiagonal = getSouthEastDiagonal(
        file + rank,
        boardPositions,
        activePlayer
    );

    return [
        ...northWestDiagonal,
        ...northEastDiagonal,
        ...southWestDiagonal,
        ...southEastDiagonal,
    ];
};
