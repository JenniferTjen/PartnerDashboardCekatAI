import { FC } from 'react';

interface IconDocumentProps {
    className?: string;
}

const IconDocument: FC<IconDocumentProps> = ({ className }) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M0.5 1H15M15 1L19 5M15 1V5H19M19 5V19H0.5V0.5" stroke="currentColor" />
        </svg>
    );
};

export default IconDocument;
