import React, { useEffect, useState } from "react";

interface ClockProps {
    isActive: boolean;
}

const Clock = ({ isActive }: ClockProps) => {
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
        <div className="border-solid border-2 px-1 w-fit">
            <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
        </div>
    );
};

export default Clock;
