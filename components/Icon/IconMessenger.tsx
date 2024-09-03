import { FC } from 'react';

interface IconMessengerProps {
    className?: string;
}

const IconMessenger: FC<IconMessengerProps> = ({ className }) => {
    return (
        <svg width="24" height="24" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path fill="#3692FB" d="M256 29.6c-124.3 0-225 93.9-225 209.6 0 66 32.7 124.8 83.9 163.2v79.9l76.6-42.3c20.4 5.7 42.1 8.8 64.5 8.8 124.3 0 225-93.9 225-209.6S380.3 29.6 256 29.6z" />
            <path fill="#FFF" d="M278.4 311.9l-57.3-61.5-111.8 61.5 123-131.4 58.7 61.5 110.4-61.5-123 131.4z" />
        </svg>
    );
};

export default IconMessenger;
