import React from 'react';

interface ImageModalProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, alt, isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50" onClick={onClose}>
      <div
        className="relative bg-white p-4 rounded-lg max-w-[70vw] max-h-[70vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={src} alt={alt} className="w-full h-auto object-contain max-h-[calc(70vh-2rem)]" />
        <button onClick={onClose} className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
