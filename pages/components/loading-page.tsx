import React from 'react';

interface ILoadingProps {
  text: string;
}

const LoadingComponent: React.FC<ILoadingProps> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center fixed inset-0 bg-white bg-opacity-50">
      <div className="relative p-5">
        <div className="animate-spin rounded-full p-2 bg-gradient-to-tr from-blue-500 to-white via-purple-500">
          <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full">
            {/* Possibly include a logo or icon here */}
          </div>
        </div>
      </div>
      <p className="text-center text-black mt-3 px-4">
        {text}
      </p>
    </div>
  );
};

export default LoadingComponent;
