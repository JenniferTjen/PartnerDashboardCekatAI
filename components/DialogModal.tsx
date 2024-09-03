import React, { Fragment, ReactNode } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import IconX from '@/components/Icon/IconX';
import CustomButton from './CustomButton';

type DialogModalProps = {
    isOpen: boolean;
    onClose: (value: boolean) => void;
    title?: string;
    children: ReactNode;
    buttonOnClick?: () => void;
    buttonDisabled?: boolean;
    buttonIsLoading?: boolean;
    cancelButton: {
        onClick: () => void;
        disabled: boolean;
        isLoading: boolean;
        // [key: string]: any
    };
    additionalContent?: any;
};

const DialogModal = ({ isOpen, onClose, title, children, buttonOnClick, buttonDisabled, buttonIsLoading, cancelButton, additionalContent }: DialogModalProps) => {
    if (!isOpen) return null;
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" open={isOpen} onClose={cancelButton?.isLoading ? () => {} : onClose} className="relative z-50">
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black bg-opacity-30" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center px-4 py-8">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="panel w-full max-w-4xl overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                {/* Close Button and Title */}
                                <CustomButton
                                    onClick={cancelButton?.onClick}
                                    disabled={cancelButton?.disabled}
                                    isLoading={cancelButton?.isLoading}
                                    className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 ltr:right-4 rtl:left-4 dark:hover:text-gray-600"
                                >
                                    <IconX />
                                </CustomButton>

                                <div className="bg-[#fbfbfb] py-3 text-lg font-medium ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5 dark:bg-[#121c2c]">{title}</div>

                                {/* Content */}
                                <div className={`${additionalContent ? 'flex flex-col md:flex-row' : ''}`}>
                                    <div className={`${additionalContent ? 'w-full md:w-1/2' : ''} p-5`}>{children}</div>
                                    <div className="w-full md:w-1/2">{additionalContent}</div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default DialogModal;
