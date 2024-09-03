import React from 'react';
import CustomButton from './CustomButton';

type FooterButtonFormProps = {
    confirmButtonOnClick: () => void;
    confirmButtonDisabled: boolean;
    confirmButtontext: string;
    confirmButtonIsLoading: boolean;
    cancelButtonOnClick: () => void;
    cancelButtonDisabled: boolean;
    cancelButtontext?: string;
    cancelButtonIsLoading: boolean;
};

const FooterButtonForm = ({
    confirmButtonOnClick,
    confirmButtonDisabled,
    confirmButtontext,
    confirmButtonIsLoading,
    cancelButtonOnClick,
    cancelButtonDisabled,
    cancelButtontext,
    cancelButtonIsLoading,
}: FooterButtonFormProps) => {
    return (
        <div className="mt-8 flex items-center justify-end  px-4 py-4">
            <CustomButton
                className="btn btn-outline-danger"
                onClick={cancelButtonOnClick}
                disabled={cancelButtonDisabled}
                text={cancelButtontext ? cancelButtontext : 'Cancel'}
                isLoading={cancelButtonIsLoading}
            />

            <CustomButton
                className="btn btn-primary ltr:ml-4 rtl:mr-4"
                onClick={confirmButtonOnClick}
                disabled={confirmButtonDisabled}
                text={confirmButtontext ? confirmButtontext : 'Confirm'}
                isLoading={confirmButtonIsLoading}
            />
        </div>
    );
};

export default FooterButtonForm;
