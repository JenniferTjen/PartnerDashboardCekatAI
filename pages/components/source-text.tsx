import React from 'react';

interface ISourceTextProps {
    textSource: string;
    handleTextSource: (param: any) => void;
    isLoading: boolean;
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

const SourceText = (props: ISourceTextProps) => {
    const { textSource, handleTextSource, isLoading } = props;

    const onHandleTextSource = (e: any) => {
        handleTextSource(e.target.value);
    };
    return (
        <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-black">
            <div className="flex flex-col border">
                <h6 className="border-b p-2 text-xl font-bold">Text</h6>
                <div className="relative p-2">
                    {isLoading && !textSource?.length ? (
                        <Loader />
                    ) : (
                        <textarea className={`w-full border-2 border-dotted hover:outline-none `} rows={20} value={textSource} onChange={onHandleTextSource} />
                    )}
                </div>
                <div className="p-2">
                    <p className="text-center text-sm font-semibold text-gray-400">{textSource ? textSource?.length : 0} Characters</p>
                </div>
            </div>
        </div>
    );
};

export default SourceText;
