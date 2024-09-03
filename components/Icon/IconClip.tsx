import { FC } from 'react';

interface IconClipProps {
    className?: string;
}

const IconClip: FC<IconClipProps> = ({ className }) => {
    return (
        <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <rect x="1.2043" y="19.6345" width="16.2643" height="6.97729" rx="2.5" transform="rotate(-39.8889 1.2043 19.6345)" stroke="currentColor" />
            <rect x="1.2043" y="19.6345" width="16.2643" height="6.97729" rx="2.5" transform="rotate(-39.8889 1.2043 19.6345)" stroke="currentColor" />
            <rect x="6.2043" y="11.6345" width="16.2643" height="6.97729" rx="2.5" transform="rotate(-39.8889 6.2043 11.6345)" stroke="currentColor" />
            <rect x="6.2043" y="11.6345" width="16.2643" height="6.97729" rx="2.5" transform="rotate(-39.8889 6.2043 11.6345)" stroke="currentColor" />
        </svg>
    );
};

export default IconClip;
