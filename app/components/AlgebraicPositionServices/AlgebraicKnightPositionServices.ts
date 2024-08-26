import { FILE_LETTERS } from "./AlgebraicNotationConstants";

export const getAlgebraicKnightMoves = (
    file: string,
    rank: string
): string[] => {
    let targetAlgebraicNotations: string[] = [];
    const fileIndex = FILE_LETTERS.indexOf(file);
    const rankNumber = parseInt(rank);

    [-2, -1, 1, 2].forEach((i) => {
        let fileString: string | undefined = FILE_LETTERS[fileIndex + i];

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
