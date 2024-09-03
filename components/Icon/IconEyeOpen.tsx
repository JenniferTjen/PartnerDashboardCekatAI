import { FC } from 'react';

interface IconEyeOpenProps {
    className?: string;
}

const IconEyeOpen: FC<IconEyeOpenProps> = ({ className }) => {
    return (
        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#444444" strokeWidth="1.5" className={className}>
            <path d="M3 13C6.6 5 17.4 5 21 13" stroke="#444444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M12 17C10.3431 17 9 15.6569 9 14C9 12.3431 10.3431 11 12 11C13.6569 11 15 12.3431 15 14C15 15.6569 13.6569 17 12 17Z" fill="#444444" stroke="#444444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
    );
};

export default IconEyeOpen;
