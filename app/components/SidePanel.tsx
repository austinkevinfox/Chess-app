import React from "react";
import { Piece } from "./Interfaces";
import CapturedPieces from "./CapturedPieces";
import Score from "./Score";
import Clock from "./Clock";

interface SidePanelProps {
    activePlayer: string;
    color: string;
    winner: string;
    capturedWhite: Piece[];
    capturedBlack: Piece[];
}

const SidePanel = ({
    activePlayer,
    color,
    winner,
    capturedWhite,
    capturedBlack,
}: SidePanelProps) => {
    const isActive = activePlayer === color && winner.length === 0;
    const children = color === "white" ? capturedBlack : capturedWhite;

    return (
        <div className="mx-4 my-20">
            <div
                className={`h-2 rounded-t-md ${
                    isActive && winner.length === 0
                        ? "bg-green-300"
                        : "bg-slate-300"
                }`}
            />
            <div className="p-4 bg-orange-50 h-auto min-h-96 rounded-b-md">
                <div className="flex justify-between">
                    <Clock isActive={isActive} />
                    <Score
                        color={color}
                        capturedWhite={capturedWhite}
                        capturedBlack={capturedBlack}
                    />
                </div>
                <div className="flex flex-col w-40">
                    {children.filter((piece) => piece.name === "pawn")?.length >
                        0 && (
                        <CapturedPieces
                            type="pawns"
                            pieces={children.filter(
                                (piece) => piece.name === "pawn"
                            )}
                        />
                    )}
                    {children.filter((piece) => piece.name === "knight")
                        ?.length > 0 && (
                        <CapturedPieces
                            type="knights"
                            pieces={children.filter(
                                (piece) => piece.name === "knight"
                            )}
                        />
                    )}
                    {children.filter((piece) => piece.name === "bishop")
                        ?.length > 0 && (
                        <CapturedPieces
                            type="bishops"
                            pieces={children.filter(
                                (piece) => piece.name === "bishop"
                            )}
                        />
                    )}
                    {children.filter((piece) => piece.name === "rook")?.length >
                        0 && (
                        <CapturedPieces
                            type="rooks"
                            pieces={children.filter(
                                (piece) => piece.name === "rook"
                            )}
                        />
                    )}
                    {children.filter((piece) => piece.name === "queen")
                        ?.length > 0 && (
                        <CapturedPieces
                            type="queen"
                            pieces={children.filter(
                                (piece) => piece.name === "queen"
                            )}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SidePanel;
