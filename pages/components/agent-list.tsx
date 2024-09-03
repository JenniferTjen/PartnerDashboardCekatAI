import React, { useState } from 'react';
import { timestampDate } from '@/utils/helpers';
import Loading from './loading';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import { useSelector } from 'react-redux';

interface IAgentListProps {
    data: any;
    handleDeleteAgent: (param: string) => void;
    isLoading: boolean;
    loadingDelete: boolean;
    selectedId: string;
    handleResendVerification: (email: string) => void;
    lastSent: any;
    isDeleting: any
}

const AgentList = (props: IAgentListProps) => {
    const { data, handleDeleteAgent, isLoading, loadingDelete, selectedId, handleResendVerification, lastSent, isDeleting } = props;
    const [isDeleteModal, setIsDeleteModal] = useState<any>(false)
    const [deleteAgentId, setDeleteAgentId] = useState<any>(null)
    const profileData = useSelector((state: any) => state.agent.profileData);
    
    return (
        <div className="panel mt-5 overflow-hidden border-0 p-0">
            {isLoading ? (
                <Loading />
            ) : (
                <div className="table-responsive">
                    <table className="table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Agent Name</th>
                                <th>Agent Role</th>
                                <th>Agent Email</th>
                                <th>Verified</th>
                                <th className="">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((agent: any) => {
                                function onResendVerification() {
                                    handleResendVerification(agent);
                                }
                                return (
                                    <tr key={agent?.id}>
                                        <td>
                                            <div className="flex w-max items-center gap-x-2">
                                                <p className="capitalize">{agent?.name}</p>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap capitalize">{agent?.role}</td>
                                        <td className="whitespace-nowrap capitalize">{agent?.email}</td>
                                        <td className="whitespace-nowrap">{agent?.is_verified ? 'Verified' : 'Unverified'}</td>
                                        <td>
                                            <div className="flex gap-4">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => {
                                                        setIsDeleteModal(true)
                                                        setDeleteAgentId(agent?.id)
                                                    }}
                                                    disabled={agent?.is_active || (loadingDelete && selectedId === agent?.id) || agent?.id === profileData.id}
                                                >
                                                    {loadingDelete && selectedId === agent?.id ? 'Deleting...' : 'Delete'}
                                                </button>
                                                <DeleteConfirmation
                                                    isOpen={isDeleteModal && deleteAgentId === agent?.id}
                                                    onClose={() => {
                                                        setIsDeleteModal(false)
                                                        setDeleteAgentId(null)
                                                    }}
                                                    onConfirm={() => {
                                                        handleDeleteAgent(agent?.id)
                                                        setDeleteAgentId(null)
                                                    }}
                                                    name={agent.name}
                                                    title="Contact"
                                                    isLoading={isDeleting[agent?.id]}
                                                />
                                                {!agent?.is_verified ? (
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-success"
                                                        onClick={onResendVerification}
                                                        disabled={Date.now() - (lastSent[agent.email] || 0) < 60000}
                                                    >
                                                        {Date.now() - (lastSent[agent.email] || 0) < 60000 ? 'Email has been sent' : 'Send Email Verification'}
                                                    </button>
                                                ) : null}
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

export default AgentList;
