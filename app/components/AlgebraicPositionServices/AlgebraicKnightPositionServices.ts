import { BoardPosition } from "../Interfaces";
import { Files } from "./AlgebraicNotationConstants";

declare type FileType = keyof typeof Files;

export const getAlgebraicKnightMoves = (
    file: string,
    rank: string
): string[] => {
    let targetAlgebraicNotations: string[] = [];
    const fileIndex = Files[file as FileType];
    const rankNumber = parseInt(rank);

    [-2, -1, 1, 2].forEach((i) => {
        let fileString: string | undefined = Files[fileIndex + i];

        if (fileString) {
            if (i === -2 || i === 2) {
                [-1, 1].forEach((step) => {
                    let newPositions = getAlgebraicKnightPositionsByStep(
                        fileString,
                        rankNumber,
                        step
                    );
                    targetAlgebraicNotations = [
                        ...targetAlgebraicNotations,
                        ...newPositions,
                    ];
                });
            } else {
                [-2, 2].forEach((step) => {
                    let newPositions = getAlgebraicKnightPositionsByStep(
                        fileString,
                        rankNumber,
                        step
                    );
                    targetAlgebraicNotations = [
                        ...targetAlgebraicNotations,
                        ...newPositions,
                    ];
                });
            }
        }
    });

    return targetAlgebraicNotations;
};

export const getKnightThreats = (
    kingSquareNotation: string,
    positions: BoardPosition[],
    activePlayer: string
): string[] => {
    let knightThreats: string[] = [];
    const tmpPositions = [...positions];
    const [file, rank] = kingSquareNotation.split("");
    const algebraicKnightNotations = getAlgebraicKnightMoves(file, rank);
    algebraicKnightNotations.forEach((notation) => {
        const knightPosition = tmpPositions.find(
            (position) =>
                position.algebraicNotation === notation &&
                position.piece?.name === "knight" &&
                position.piece?.color !== activePlayer
        );
        if (knightPosition) {
            knightThreats.push(knightPosition.algebraicNotation);
        }
    });

    return knightThreats;
};

const getAlgebraicKnightPositionsByStep = (
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
