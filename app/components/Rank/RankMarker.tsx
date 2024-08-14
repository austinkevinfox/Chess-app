import React from 'react'

interface RankMarkerProps {
    id: number;
}

const RankMarker = ({ id }: RankMarkerProps) => {
  return <div className="h-24 flex items-center justify-center">{id}</div>;
}

export default RankMarker