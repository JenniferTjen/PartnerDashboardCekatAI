import { FC } from 'react';

interface IconWarningProps {
    className?: string;
}

const IconWarning: FC<IconWarningProps> = ({ className }) => {
    return (
    <svg width="30px" height="30px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#FF0000">
        <path d="M12 7L12 13" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M12 17.01L12.01 16.9989" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
    );
};

export default IconWarning;
