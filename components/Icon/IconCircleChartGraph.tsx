const IconCircleChartGraph = ({ strokeColor = "#000000" }) => {
    return (
        <svg className="w-12 h-12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <path 
                    style={{ 
                        fill: 'none', 
                        stroke: strokeColor, 
                        strokeLinecap: 'round', 
                        strokeLinejoin: 'round', 
                        strokeWidth: '1.2px', 
                        fillRule: 'evenodd' 
                    }} 
                    d="M12,2A10,10,0,1,0,22,12H12Z"
                ></path>
                <path 
                    style={{ 
                        fill: 'none', 
                        stroke: strokeColor, 
                        strokeLinecap: 'round', 
                        strokeLinejoin: 'round', 
                        strokeWidth: '1.2px', 
                        fillRule: 'evenodd' 
                    }} 
                    d="M15,9h6.54077A10.02174,10.02174,0,0,0,15,2.45923Z"
                ></path>
            </g>
        </svg>
    );
}

export default IconCircleChartGraph;
