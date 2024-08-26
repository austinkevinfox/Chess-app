import { BoardPosition } from "../Interfaces";
import {
    getNorthFile,
    getEastRank,
    getSouthFile,
    getWestRank,
} from "./AlgebraicPositionServices";

export const getAlgebraicRookMoves = (
    file: string,
    rank: string,
    boardPositions: BoardPosition[],
    activePlayer: string
): string[] => {
    const northFile = getNorthFile(file + rank, boardPositions, activePlayer);
    const eastRank = getEastRank(file + rank, boardPositions, activePlayer);
    const southFile = getSouthFile(file + rank, boardPositions, activePlayer);
    const westRank = getWestRank(file + rank, boardPositions, activePlayer);

    console.log('westRank', westRank);

    return [...northFile, ...eastRank, ...southFile, ...westRank];
};
