import React, { useState } from 'react';

const ToggleButton = () => {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    return (
        <button
            onClick={handleToggle}
            className={`px-4 py-2 font-semibold text-white rounded ${isToggled ? 'bg-blue-500' : 'bg-gray-500'}`}
        >
            {isToggled ? 'On' : 'Off'}
        </button>
    );
};

export default ToggleButton;