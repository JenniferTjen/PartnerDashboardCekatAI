import React, { useEffect } from 'react';
interface ISourcesProps {
    totalIncludedFiles: number;
    onUploadDocument: (params: any) => void;
    totalTextCharacters: number;
    totalTrainedLinks: number;
    totalCharacters: number;
    totalQna: number;
    isLoading: boolean;
    isLoadingLink: boolean;
    isDeleting: boolean;
}
const Sources = (props: ISourcesProps) => {
    const { totalIncludedFiles, isLoading, isLoadingLink, onUploadDocument, totalTextCharacters, totalTrainedLinks, totalCharacters, totalQna, isDeleting } = props;

    return (
        <>
            <style jsx>{`
                @keyframes fadeIn {
                    0%,
                    100% {
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                }

                .btn.loading span {
                    display: inline-block;
                }

                .btn.loading span:nth-child(2) {
                    animation: fadeIn 1s infinite;
                    animation-delay: 0.5s;
                }

                .btn.loading span:nth-child(3) {
                    animation: fadeIn 1s infinite;
                    animation-delay: 1s;
                }
            `}</style>
            <div className="ml-4 flex h-1/2 w-1/4 flex-col border-2 border-[#ebedf2] bg-white p-4">
                <h6 className="text-center text-base font-semibold">Sources</h6>
                <div className="mt-8">
                    <p className="font-bold">
                        {totalIncludedFiles ? totalIncludedFiles : 0} {totalIncludedFiles <= 1 ? 'File' : 'Files'}
                    </p>
                    <p className="font-bold">{totalTextCharacters ? totalTextCharacters : 0} Text Input Characters</p>
                    <p className="font-bold">
                        {totalTrainedLinks ? totalTrainedLinks : 0} {totalTrainedLinks <= 1 ? 'Link' : 'Links'}{' '}
                    </p>
                    <p className="font-bold">{totalQna ? totalQna : 0} Q&A</p>
                    <p className="font-bold">Total detected characters: {totalCharacters}</p>
                </div>

                <button className={`btn btn-primary mt-4 w-3/4 self-center  text-white ${isLoading || isLoadingLink ? 'loading' : ''}`} onClick={onUploadDocument} disabled={isLoading || isLoadingLink}>
                    <span>{isLoading || isLoadingLink || isDeleting ? 'Training' : 'Save Knowledge Source'}</span>
                    <span>{isLoading || isLoadingLink  || isDeleting ? '...' : ''}</span>
                </button>
            </div>
        </>
    );
};

export default Sources;
