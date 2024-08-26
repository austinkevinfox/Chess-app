"use client";
import React from "react";
import Controls from "./Controls";

interface ControlsModalProps {
    toggleRankAndFile: () => void;
}

const ControlsModal = ({ toggleRankAndFile }: ControlsModalProps) => {
    const toggleModalButtonVisibility = (
        isMakeVisible: boolean = false
    ): void => {
        let button: HTMLElement | null =
            document.getElementById("modal_open_btn");
        if (isMakeVisible) {
            button?.classList.remove("invisible");
        } else {
            button?.classList.add("invisible");
        }
    };

    return (
        <div className="mb-4">
            <button
                id="modal_open_btn"
                className="btn"
                onClick={() => {
                    if (document) {
                        toggleModalButtonVisibility();
                        (
                            document.getElementById(
                                "my_modal_1"
                            ) as HTMLFormElement
                        ).showModal();
                    }
                }}
            >
                Open Controls
            </button>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Controls</h3>
                    <div className="py-4">
                        <Controls toggleRankAndFile={toggleRankAndFile} />
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button
                                className="btn"
                                onClick={() =>
                                    toggleModalButtonVisibility(true)
                                }
                            >
                                Close Controls
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ControlsModal;
