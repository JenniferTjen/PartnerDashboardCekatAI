const IconTimer = ({ size = "w-5 h-5", strokeColor = "#000000"}) => {
    return (
        <svg className={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 13V9" stroke={strokeColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10 2H14" stroke={strokeColor} stroke-width="1.5" stroke-linecap="round"/>
        <path d="M7.5 5.20404C8.82378 4.43827 10.3607 4 12 4C16.9706 4 21 8.02944 21 13C21 17.9706 16.9706 22 12 22C7.02944 22 3 17.9706 3 13C3 11.3607 3.43827 9.82378 4.20404 8.5" stroke={strokeColor} stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        
    );
}

export default IconTimer;
