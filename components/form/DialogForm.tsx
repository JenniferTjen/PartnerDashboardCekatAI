import React from 'react';
import DialogModal from '../DialogModal';
import ReusableForm from './ReusableForm';

const DialogForm = ({ isOpen, onClose, title, formFields, initialValues, onSubmit, validationSchema, isLoading, confirmButtonText, additionalContent }: any) => {
    return (
        <DialogModal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            cancelButton={{
                onClick: onClose,
                disabled: !!isLoading,
                isLoading: !!isLoading,
            }}
            additionalContent={additionalContent}
        >
            <ReusableForm
                initialValues={initialValues}
                formFields={formFields}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
                cancelButton={{
                    className: 'btn btn-outline-danger',
                    onClick: onClose,
                    disabled: !!isLoading,
                    isLoading: !!isLoading,
                    text: 'Cancel',
                }}
                confirmButton={{
                    disabled: !!isLoading,
                    isLoading: !!isLoading,
                    text: confirmButtonText,
                    type: 'submit',
                    className: 'btn btn-primary ltr:ml-4 rtl:mr-4',
                }}
            />
        </DialogModal>
    );
};

export default DialogForm;
