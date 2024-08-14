import React from "react";
import FilerMarker from "./FilerMarker";

interface FileRowProps {
    isVisible: boolean;
}

const FileRow = ({ isVisible }: FileRowProps) => {
    return (
        <div
            className={`col-start-2 flex border-solid border-2 border-slate-200 ${
                isVisible ? "visible" : "invisible"
            }`}
        >
            {["a", "b", "c", "d", "e", "f", "g", "h"].map((fileId) => (
                <FilerMarker key={fileId} id={fileId} />
            ))}
        </div>
    );
};

export default FileRow;
