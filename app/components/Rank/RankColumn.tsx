import React from 'react'
import RankMarker from './RankMarker';

interface RankColumnProps {
    isVisible: boolean;
}

const RankColumn = ({ isVisible }: RankColumnProps) => {
    return (
        <div
            className={`px-4 border-solid border-2 border-slate-200 ${
                isVisible ? "visible" : "invisible"
            }`}
        >
            {[8, 7, 6, 5, 4, 3, 2, 1].map((rankId) => (
                <RankMarker key={rankId} id={rankId} />
            ))}
        </div>
    );
};

export default RankColumn