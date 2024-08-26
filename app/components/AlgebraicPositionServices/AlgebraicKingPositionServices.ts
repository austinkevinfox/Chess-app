import { BoardPosition } from "../Interfaces";
import {
    getNorthFile1Space,
    getEastRank1Space,
    getSouthFile1Space,
    getWestRank1Space,
    getNorthEastDiagonal1Space,
    getNorthWestDiagonal1Space,
    getSouthEastDiagonal1Space,
    getSouthWestDiagonal1Space,
} from "./AlgebraicPositionServices";

export const getAlgebraicKingMoves = (
    file: string,
    rank: string,
    boardPositions: BoardPosition[],
    activePlayer: string
): string[] => {
    const northFile = getNorthFile1Space(
        file + rank,
        boardPositions,
        activePlayer
    );
    const eastRank = getEastRank1Space(
        file + rank,
        boardPositions,
        activePlayer
    );
    const southFile = getSouthFile1Space(
        file + rank,
        boardPositions,
        activePlayer
    );
    const westRank = getWestRank1Space(
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

    return [
        ...northFile,
        ...eastRank,
        ...southFile,
        ...westRank,
        ...northEastDiagonal,
        ...northWestDiagonal,
        ...southEastDiagonal,
        ...southWestDiagonal,
    ];
};
