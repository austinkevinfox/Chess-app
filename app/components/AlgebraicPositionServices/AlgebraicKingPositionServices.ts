import { BoardPosition } from "../Interfaces";
import { Files } from "./AlgebraicNotationConstants";
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
import { getKnightThreats } from "./AlgebraicKnightPositionServices";
import { getBishopThreats } from "./AlgebraicBishopPositionServices";
declare type FileType = keyof typeof Files;

export const getAlgebraicKingMoves = (
    file: string,
    rank: string,
    boardPositions: BoardPosition[],
    activePlayer: string,
    isKingSideCastleAvailable: boolean,
    isQueenSideCastleAvailable: boolean
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

    if (isKingSideCastleAvailable) {
        const castlingPosition = activePlayer === "white" ? "g1" : "g8";
        eastRank.push(castlingPosition);
    }

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

    if (isQueenSideCastleAvailable) {
        const castlingPosition = activePlayer === "white" ? "c1" : "c8";
        westRank.push(castlingPosition);
    }

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

    // Premptively remove squares of immediate jeopardy
    const threats = getThreatsToKing({
        boardPositions,
        activePlayer,
    });
    const kingFileIndex = Files[file as FileType];
    const kingRank = parseInt(rank);
    let squaresUnderAttack: string[] = [];

    // Get squares adjacent to king and threatened by bishop
    threats.bishopThreats.forEach((bishopNotation) => {
        const [bishopFileStr, bishopRankStr] = bishopNotation.split("");
        const bishopFileIndex = Files[bishopFileStr as FileType];
        const bishopRank = parseInt(bishopRankStr);
        const fileDirection: string =
            kingFileIndex < bishopFileIndex ? "west" : "east";
        const rankDirection: string = kingRank < bishopRank ? "north" : "south";
        const nextFileIncrement = fileDirection === "east" ? -1 : 1;
        const nextFile: string = Files[kingFileIndex + nextFileIncrement];
        const nextRankIncrement = rankDirection === "south" ? -1 : 1;
        const nextRank = kingRank + nextRankIncrement;
        squaresUnderAttack.push(nextFile! + nextRank!);
    });

    return [
        ...northFile,
        ...eastRank,
        ...southFile,
        ...westRank,
        ...northEastDiagonal,
        ...northWestDiagonal,
        ...southEastDiagonal,
        ...southWestDiagonal,
    ].filter((square) => !squaresUnderAttack.includes(square));
};

interface Threats {
    knightThreats: string[];
    bishopThreats: string[];
}
export const getThreatsToKing = ({
    boardPositions,
    activePlayer,
}: {
    boardPositions: BoardPosition[];
    activePlayer: string;
}): Threats => {
    let threats: Threats = { knightThreats: [], bishopThreats: [] };
    const kingSquareNotation = getKingSquare({
        boardPositions,
        activePlayer,
    });
    const knightThreats = getKnightThreats(
        kingSquareNotation,
        boardPositions,
        activePlayer
    );
    threats.knightThreats = knightThreats;
    const bishopThreats = getBishopThreats(
        kingSquareNotation,
        boardPositions,
        activePlayer
    );
    threats.bishopThreats = bishopThreats;

    return threats;
};

const getKingSquare = ({
    boardPositions,
    activePlayer,
}: {
    boardPositions: BoardPosition[];
    activePlayer: string;
}): string => {
    const kingPosition = boardPositions.find(
        (position) =>
            position.piece?.name === "king" &&
            position.piece?.color === activePlayer
    );
    return kingPosition!.algebraicNotation;
};
