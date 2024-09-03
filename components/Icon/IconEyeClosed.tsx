import { FC } from 'react';

interface IconEyeClosedProps {
    className?: string;
    color?: string
}

const IconEyeClosed: FC<IconEyeClosedProps> = ({ className, color }) => {
    return (
       <svg width="20px" height="20px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#444444" className={className}>
            <path d="M19.5 16L17.0248 12.6038" stroke="#444444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M12 17.5V14" stroke="#444444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M4.5 16L6.96895 12.6124" stroke="#444444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M3 8C6.6 16 17.4 16 21 8" stroke="#444444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
    );
};

export default IconEyeClosed;
