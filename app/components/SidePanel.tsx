import React, { useState, useEffect } from "react";
import { decode } from "html-entities";

interface SidePanelProps {
    color: string;
    isActive: boolean;
    children: string[];
}

const SidePanel = ({ color, isActive, children }: SidePanelProps) => {
    return (
        <div
            className={`mx-4 my-20 p-4 bg-orange-50 h-auto ${
                color === "white" ? "ml-20" : ""
            }`}
        >
            <p>
                {color} clock is {isActive ? "running" : "paused"}
            </p>
            <p className="border-solid border-2 px-1 w-fit">
                <span>00</span>
                <span>:</span>
                <span>00</span>
                <span>:</span>
                <span>00</span>
            </p>
            <div>
                {children.map((code: string, index: number) => (
                    <div key={index} className="w-6 h-6 text-4xl">
                        {decode(code)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SidePanel;
