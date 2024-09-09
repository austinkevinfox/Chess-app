import React from 'react'

interface FileMarkerProps {
    id: string;
}

const FilerMarker = ({ id }: FileMarkerProps) => {
  return (
      <div
          className="w-20 flex items-center justify-center"
      >
          {id}
      </div>
  );
}

export default FilerMarker