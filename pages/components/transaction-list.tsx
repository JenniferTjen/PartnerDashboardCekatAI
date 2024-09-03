import React from 'react';
import { timestampDate } from '@/utils/helpers';
import { useRouter } from 'next/router';

interface ITransactionListProps {
    transactionList: any;
}

const TransactionList = (props: ITransactionListProps) => {
    const { transactionList } = props;
    const router = useRouter();

    const handleDownloadClick = (transaction: any) => {
        console.log(transaction?.id)
        router.push(`/billings/invoice/${transaction?.id}`);
        if (transaction?.status === 'pending' && transaction?.payment_link) {
            window.open(transaction?.payment_link, '_blank');
        }
    };

    return (
        <div className="panel mt-3 overflow-hidden border-2 p-0">
            <div className="table-responsive">
                <table className="table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Package</th>
                            <th>Duration</th>
                            <th className="!text-center">Status</th>
                            <th>Transaction Date</th>
                            <th>Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...transactionList]?.reverse()?.map((transaction: any) => {
                            function checkStatusConversation() {
                                if (transaction?.status === 'success') {
                                    return 'bg-primary-light text-primary';
                                } else if (transaction?.status === 'pending') {
                                    return 'bg-orange-100 text-orange-400';
                                } else if (transaction?.status === 'failed') {
                                    return 'bg-[#FACFCF]  text-red-600';
                                } else if (transaction?.status === 'subscribed') {
                                    return 'bg-success-light text-green-600';
                                }
                            }

                            return (
                                <tr key={transaction.id}>
                                    <td>
                                        <div className="flex items-center">
                                            <div className="capitalize">{transaction?.package_type}</div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap text-sm capitalize">{transaction?.package_duration}</td>
                                    <td className={`whitespace-nowrap text-sm capitalize ${checkStatusConversation()}`}>
                                        <div className="flex justify-center font-semibold">{transaction?.status}</div>
                                    </td>
                                    <td className="whitespace-normal text-sm capitalize">{timestampDate(transaction?.created_at)}</td>
                                    <td className="flex justify-center">
                                        <button className="btn-info btn" onClick={() => handleDownloadClick(transaction)} disabled={transaction?.status ===  'failed'}>
                                            Download
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionList;
