import IconTrash from '@/components/Icon/IconTrash';
import React, { useState } from 'react';
import Loading from './loading';
import DeleteConfirmation from '@/components/DeleteConfirmation';

interface ISourceQnaProps {
    handleQnaChange: (index: any, field: any, value: any) => void;
    qnaSource: any;
    handleAddSection: () => void;
    handleDeleteDocument: (param: string) => void;
    handleDeleteSection: (param: number) => void;
    isLoading: boolean;
    isDeleting: boolean
}

const SourceQna = (props: ISourceQnaProps) => {
    const { handleQnaChange, handleAddSection, handleDeleteDocument, handleDeleteSection, qnaSource, isLoading, isDeleting } = props;
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const [deleteQnA, setDeleteQnA] = useState<any>(null)

    return (
        <>
            {isLoading ? (
                <div className="h-screen bg-white">
                    <Loading />
                </div>
            ) : (
                <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-black">
                    <div className="flex flex-col border">
                        <h6 className="border-b p-2 text-xl font-bold">Q&A</h6>
                        {qnaSource?.map((section: any, index: number) => {
                            return (
                                <div key={index} className="mx-2 my-4 border">
                                    <form className="px-2 pt-4">
                                        <div className="mb-5">
                                            <label htmlFor={`question-${index}`}>Question</label>
                                            <textarea
                                                id="name"
                                                placeholder="Apa itu Cekat AI?"
                                                className="w-full border p-2 focus:outline-none"
                                                rows={3}
                                                value={section?.question}
                                                onChange={(e) => handleQnaChange(index, 'question', e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-5">
                                            <label htmlFor={`answer-${index}`}>Answer</label>
                                            <textarea
                                                id="name"
                                                placeholder="Cekat AI adalah aplikasi paling mantap"
                                                className="w-full border p-2 focus:outline-none"
                                                rows={3}
                                                value={section?.answer}
                                                onChange={(e) => handleQnaChange(index, 'answer', e.target.value)}
                                            />
                                        </div>
                                        <div className="my-2 flex items-center justify-end">
                                            <button type="button" onClick={() => {
                                                if (section.id) {
                                                    setDeleteQnA(section.id)
                                                    setIsDeleteModalOpen(true)
                                                } else {
                                                    handleDeleteSection(index);
                                                }
                                            }}>
                                                <IconTrash className="text-red-600" />
                                            </button>
                                            <DeleteConfirmation 
                                                isOpen={isDeleteModalOpen && (section?.id ? deleteQnA === section.id : deleteQnA === index )}
                                                onClose={() => setIsDeleteModalOpen(false)}
                                                onConfirm={() => {
                                                    if (section?.id) {
                                                        handleDeleteDocument(section?.id);
                                                        setDeleteQnA(null)
                                                    }
                                                }}
                                                name={"Q&A"}
                                                title="Q&A"
                                                isLoading={isDeleting}
                                                note={section?.id ? `You don't have to retrain your chatbot.` : ''}
                                            />
                                        </div>
                                    </form>
                                </div>
                            );
                        })}
                        <div className="mx-2 my-2 flex items-center justify-end">
                            <button type="button" className="btn btn-primary" onClick={handleAddSection}>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SourceQna;
