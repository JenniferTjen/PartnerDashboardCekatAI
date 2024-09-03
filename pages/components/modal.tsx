import Image from 'next/image';
import React, { useState } from 'react';

interface IModalProps {
    showModal: boolean;
    hideModal: () => void;
    imageUrl?: string;
    text?: string;
}

const Modal = (props: IModalProps) => {
    const { showModal, hideModal, imageUrl, text } = props;

    return (
        <>
            {showModal ? (
                <>
                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                        <div className="relative mx-auto my-6 w-auto max-w-3xl">
                            <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                                <div className="relative flex flex-auto flex-col items-center justify-center p-6">
                                    {imageUrl ? (
                                        <>
                                            <Image unoptimized src={imageUrl} alt="qr" width={200} height={200} className="mt-2" />
                                            <p>{text}</p>
                                        </>
                                    ) : null}
                                </div>
                                <div className="border-blueGray-200 flex items-center justify-center rounded-b border-t border-solid p-6">
                                    <button
                                        className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none focus:outline-none"
                                        type="button"
                                        onClick={hideModal}
                                    >
                                        Close
                                    </button>
                                    {/* <button
                                        className="mb-1 mr-1 rounded bg-primary px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none hover:shadow-lg focus:outline-none active:bg-yellow-700"
                                        type="button"
                                        onClick={hideModal}
                                    >
                                        Submit
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default Modal;
