import React, { useState } from 'react';
import IconTrash from '@/components/Icon/IconTrash';
import Loading from './loading';
import DeleteConfirmation from '@/components/DeleteConfirmation';

interface ISourceWebsiteProps {
    sitemapSource: string;
    handleSitemapSource: (param: any) => void;
    fetchedLinks: any;
    trainedLinks: any;
    onFetchLink: () => void;
    handleRemoveSelectedLink: (param: number) => void;
    handleDeleteDocument: (param: string) => void;
    handleTrainSpecificLink: (param: any) => void;
    handleAddSingleLink: (param: string) => void;
    isLoadingLink: boolean;
    isLoading: boolean;
    isLoadingFetchLinks: boolean;
    selectedLink: string;
    isDeleting: boolean
}

const SourceWebsite = (props: ISourceWebsiteProps) => {
    const {
        sitemapSource,
        isLoadingLink,
        fetchedLinks,
        trainedLinks,
        onFetchLink,
        handleRemoveSelectedLink,
        handleDeleteDocument,
        handleTrainSpecificLink,
        handleAddSingleLink,
        handleSitemapSource,
        isLoading,
        isLoadingFetchLinks,
        selectedLink,
        isDeleting
    } = props;

    const [newLink, setNewLink] = React.useState<string>('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const [deleteLinkId, setDeleteLinkId] = useState<any>(null)

    const onHandleSitemapSource = (e: any) => {
        handleSitemapSource(e.target.value);
    };

    const onHandleAddSingleLink = () => {
        handleAddSingleLink(newLink?.trim());
        setNewLink('');
    };

    const LoadingLink = () => {
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

    return (
        <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 dark:border-[#191e3a] dark:bg-black">
            <div className="flex flex-col border">
                <h6 className="border-b p-2 text-xl font-bold">Website</h6>
                <div className="p-2">
                    <form>
                        <div className="mb-3 flex w-full flex-row">
                            <div className="w-3/4">
                                <label htmlFor="name">Crawl</label>
                                <input id="name" type="text" placeholder="https://www.example.com" className="form-input" value={sitemapSource} onChange={onHandleSitemapSource} />
                            </div>
                            <button type="button" className="btn btn-primary w-1/4 self-end ltr:ml-4 rtl:mr-4" disabled={isLoadingFetchLinks} onClick={onFetchLink}>
                                {isLoadingFetchLinks ? 'Loading...' : 'Fetch links'}
                            </button>
                        </div>
                    </form>
                    <p className="text-xs text-gray-400">This will crawl the link starting with the URL (not including files on the website).</p>
                    <p className="text-xs text-gray-400">Maximum 30 fetched links</p>
                </div>
                <div className="mt-6 p-2">
                    <p className="text-base font-semibold">Fetched Links: {fetchedLinks?.length ? '' : '-'}</p>
                    <ul className="p-2">
                        {fetchedLinks &&
                            fetchedLinks?.map((link: string, idx: number) => {
                                function onHandleRemoveLink() {
                                    handleRemoveSelectedLink(idx);
                                }

                                function onTrainSpecificLink() {
                                    handleTrainSpecificLink(link);
                                }

                                return (
                                    <li key={idx} className={`mt-1 flex flex-row ${isLoadingLink ? 'list-none' : ''}`}>
                                        {isLoadingLink && selectedLink === link ? (
                                            <LoadingLink />
                                        ) : (
                                            <button className="btn btn-outline-primary mr-1 p-1 text-xs" onClick={onTrainSpecificLink}>
                                                Train
                                            </button>
                                        )}

                                        <p className="self-center">- {link}</p>
                                        {!isLoadingLink ? (
                                            <button onClick={onHandleRemoveLink}>
                                                <IconTrash className="ml-2 h-4 w-4 text-red-600 hover:text-red-800" />
                                            </button>
                                        ) : null}
                                    </li>
                                );
                            })}
                    </ul>

                    <div className="flex flex-row gap-x-1 py-2">
                        <input type="text" className="form-input w-1/3" value={newLink} onChange={(e) => setNewLink(e.target.value)} />
                        <button className="btn btn-outline-warning p-2 text-xs" onClick={onHandleAddSingleLink}>
                            Add
                        </button>
                        
                    </div>
                    <p className="text-xs text-gray-400">This will input a single webpage URL</p>
                </div>
                <div className="mt-6 p-2">
                    <p className="text-base font-semibold">Trained Links: {trainedLinks?.length ? '' : '-'}</p>
                    <div className="p-2">
                        {isLoading ? (
                            <LoadingLink />
                        ) : (
                            <ul>
                                {trainedLinks?.map((link: any) => {
                                    // console.log(link, "link")
                                    function onDeleteTrainedLink() {
                                        handleDeleteDocument(link?.id);
                                    }
                                    return (
                                        <li key={link?.id} className="flex flex-row">
                                            <p className="text-green-600">- {link?.url}</p>
                                            <b className="ml-2">{link?.content?.length} characters</b>
                                            <button onClick={() => {
                                                setDeleteLinkId(link?.id)
                                                setIsDeleteModalOpen(true)
                                            }}>
                                                <IconTrash className="ml-2 h-4 w-4 text-red-600 hover:text-red-800" />
                                            </button>
                                            <DeleteConfirmation
                                                isOpen={isDeleteModalOpen && deleteLinkId === link?.id}
                                                onClose={() => setIsDeleteModalOpen(false)}
                                                onConfirm={() => {
                                                    handleDeleteDocument(link?.id)
                                                    setDeleteLinkId(null)
                                                }}
                                                name={link?.url}
                                                title="Website"
                                                isLoading={isDeleting}
                                                note={`You don't have to retrain your chatbot.`}
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SourceWebsite;
