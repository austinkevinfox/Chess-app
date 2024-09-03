import React, { useState, useEffect } from "react";
import { Piece } from "./Interfaces";
import CapturedPieces from "./CapturedPieces";

interface SidePanelProps {
    isActive: boolean;
    children: Piece[];
}

const SidePanel = ({ isActive, children }: SidePanelProps) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> = setInterval(() => null);

        if (isActive) {
            if (time >= 3600000) {
                clearInterval(interval);
            } else {
                interval = setInterval(() => {
                    setTime((prevTime) => prevTime + 1000);
                }, 1000);
            }
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, time]);

    return (
        <div className="mx-4 my-20">
            <div
                className={`h-2 ${isActive ? "bg-green-300" : "bg-slate-300"}`}
            />
            <div className="p-4 bg-orange-50 h-auto">
                <div className="border-solid border-2 px-1 w-fit">
                    <span>
                        {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                    </span>
                    <span>
                        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
                    </span>
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
