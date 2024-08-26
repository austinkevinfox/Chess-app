import React from "react";
import { decode } from "html-entities";
import { useDraggable } from "@dnd-kit/react";

interface PieceProps {
    color: string;
    code: string;
    activePlayer: string;
    initSquare: number;
}

const Piece = ({ color, code, initSquare, activePlayer }: PieceProps) => {
    const { ref } = useDraggable({
        id: `draggable-${initSquare}`,
        disabled: color !== activePlayer,
    });

    return code.length ? <div ref={ref}>{decode(code)}</div> : null;
};

export default Piece;
