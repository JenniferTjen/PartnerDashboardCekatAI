import React, { useState } from 'react';
import ImageModal from './ImageModal';

interface CustomImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
}

const CustomImage: React.FC<CustomImageProps> = ({ src, alt, width = '200px', height = '200px' }) => {
  const [hasError, setHasError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {hasError ? (
        <div className="flex justify-center items-center bg-gray-500" style={{ width, height }}>
          Image no longer available
        </div>
      ) : (
        <div className="relative" style={{ width, height }} onClick={handleImageClick}>
          <img src={src} alt={alt} className="object-cover w-full h-full" onError={handleError} />
        </div>
      )}
      <ImageModal src={src} alt={alt} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default CustomImage;
