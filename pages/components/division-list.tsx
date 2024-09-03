import React, { useState } from 'react';
import { timestampDate } from '@/utils/helpers';
import Loading from './loading';
import DeleteConfirmation from '@/components/DeleteConfirmation';

interface IDivisionListProps {
    data: any;
    handleDeleteDivision: (param: string) => void;
    handleEditDivision: (param: any) => void;
    isLoading: boolean;
    loadingDelete: boolean;
    selectedId: string;
    isDeleting: any
}

const DivisionList = (props: IDivisionListProps) => {
    const { data, handleDeleteDivision, handleEditDivision, isLoading, loadingDelete, selectedId, isDeleting } = props;
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const [deleteDivisionId, setDeleteDivisionId] = useState<any>(null)

    return (
        <div className="panel mt-5 overflow-hidden border-0 p-0">
            {isLoading ? (
                <Loading />
            ) : (
                <div className="table-responsive">
                    <table className="table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Division Name</th>
                                <th>Created At</th>
                                <th className="!text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((division: any) => {
                                function onDeleteDivision() {
                                    handleDeleteDivision(division);
                                }
                                function onEditDivision() {
                                    handleEditDivision(division);
                                }

                                return (
                                    <tr key={division?.id}>
                                        <td>
                                            <div className="flex w-max items-center gap-x-2">
                                                <p className="capitalize">{division?.name}</p>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap">{timestampDate(division?.created_at)}</td>
                                        <td>
                                            <div className="flex items-center justify-center gap-4">
                                                <button type="button" className="btn btn-sm btn-outline-primary" onClick={onEditDivision}>
                                                    Edit
                                                </button>
                                                <button type="button" className="btn btn-sm btn-outline-danger" 
                                                    // onClick={onDeleteDivision} disabled={loadingDelete && selectedId === division?.id}
                                                    onClick={() => {
                                                        setIsDeleteModalOpen(true);
                                                        setDeleteDivisionId(division?.id);
                                                    }}
                                                >
                                                    {loadingDelete && selectedId === division?.id ? 'Deleting...' : 'Delete'}
                                                </button>
                                                <DeleteConfirmation
                                                    isOpen={isDeleteModalOpen&& deleteDivisionId === division?.id}
                                                    onClose={() => {
                                                        setIsDeleteModalOpen(false);
                                                        setDeleteDivisionId(null);
                                                    }}
                                                    onConfirm={() => {
                                                        handleDeleteDivision(division?.id)
                                                        setDeleteDivisionId(null);
                                                    }}
                                                    name={division.name}
                                                    title="Division"
                                                    isLoading={isDeleting[division?.id]}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default React.memo(DivisionList);
