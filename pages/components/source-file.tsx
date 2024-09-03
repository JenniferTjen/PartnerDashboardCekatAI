import React, { useState } from 'react';
import DragDropFile from '@/components/DragDropFile';
import IconTrash from '@/components/Icon/IconTrash';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import { log } from 'console';

interface IFilesProps {
    handleFileChange: (param: any) => void;
    handleRemoveSelectedFile: (param: any) => void;
    handleDeleteDocument: (param: string) => void;
    includedFiles: any;
    selectedFiles: any;
    isLoading: boolean;
    isDeleting: boolean;
}
const Loader = () => {
    return (
        <>
            <style jsx>{`
                .loader {
                    border: 6px solid #f3f3f3;
                    border-top: 6px solid #3498db;
                    border-radius: 50%;
                    animation: spin 2s linear infinite;
                }

                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
            <div className="loader mr-2 h-[30px] w-[30px]"></div>
        </>
    );
};

const SourceFile = (props: IFilesProps) => {
    const { handleFileChange, handleRemoveSelectedFile, handleDeleteDocument, includedFiles, selectedFiles, isLoading, isDeleting } = props;
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<any>(false)
    const [deleteFileId, setDeleteFileId] = useState<any>(null);
    return (
        <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-black">
            <div className="flex flex-col border">
                <h6 className="border-b p-2 text-xl font-bold">Files</h6>
                <div className="p-2">
                    <DragDropFile handleSelectFile={handleFileChange} />
                    <p className="mt-2 text-center text-xs">If you are uploading a PDF, make sure you can highlight the text</p>
                </div>

                <div className="mt-6 p-2">
                    <p className="text-base font-semibold">Already Included Files: {includedFiles?.length ? '' : '-'}</p>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <ul className="p-2">
                            {includedFiles?.map((document: any) => {
                                function onDeleteDocument() {
                                    handleDeleteDocument(document?.id);
                                }

                                function extractFileName() {
                                    const parts = document?.url?.split('/');
                                    const fileName = parts[parts?.length - 1];
                                    return fileName;
                                }
                                return (
                                    <li key={document?.id} className="flex flex-row items-center">
                                        <p>- {extractFileName()}</p>
                                        <b className="ml-2">{document?.content?.length} characters</b>
                                        <button onClick={() => {
                                            setDeleteFileId(document?.id)
                                            setIsDeleteModalOpen(true)
                                            }}>
                                            <IconTrash className="ml-2 h-4 w-4 text-red-600 hover:text-red-800" />
                                        </button>
                                        < DeleteConfirmation 
                                        isOpen={isDeleteModalOpen && deleteFileId === document?.id}
                                        onClose={() => {
                                            setIsDeleteModalOpen(false)
                                            setDeleteFileId(null)
                                        }}
                                        onConfirm={() => {
                                            handleDeleteDocument(document?.id)
                                            setDeleteFileId(null)
                                        }}
                                        name={extractFileName()}
                                        title="File"
                                        isLoading={isDeleting}
                                        note={`You don't have to retrain your chatbot.`}
                                    />
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>

                <div className="mt-6 p-2">
                    <p className="text-base font-semibold">To be added: {selectedFiles?.length ? '' : '-'}</p>
                    <ul className="p-2">
                        {selectedFiles?.map((document: any, idx: number) => { 
                            return (
                                <li key={idx} className="flex flex-row">
                                    <p>- {document?.name}</p>
                                    <button onClick={() => {
                                        handleRemoveSelectedFile(idx)
                                        }}>
                                        <IconTrash className="ml-2 h-4 w-4 text-red-600 hover:text-red-800" />
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SourceFile;
