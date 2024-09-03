import React from 'react';
import IconWarning from './Icon/IconWarning';

type DeleteConfirmationProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  name: string;
  title: string;
  isLoading?: boolean; // Add this prop
  note?: string
};

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  isOpen,
  onClose,
  onConfirm,
  name,
  title,
  isLoading,
  note
}) => {
  // Keep the dialog open if it's loading
  if (!isOpen && !isLoading) return null;
  return (
    <div className="fixed inset-0 bg-black !bg-opacity-30 flex justify-center items-center p-4 z-50"
      onClick={ isLoading ? () => {} :  onClose}
    >
      <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full flex ">
        <div className='mb-2 mr-3'>
          <IconWarning/>
        </div>
        <div>
          <h2 className="text-lg font-bold">Delete {title}</h2>
          <p className="mt-2">{`Are you sure you want to delete "${name}"? This action cannot be undone.`}</p>
          <p className="mt-2 font-bold"> {note ? note : ''}</p>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              className={`bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={onClose}
              disabled={isLoading} // Disable button when loading
            >
              Cancel
            </button>
            <button
              className={`bg-red-500 px-4 py-2 text-white rounded hover:bg-red-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={onConfirm}
              disabled={isLoading} // Disable button when loading
            >
              {isLoading? 'Deleting...' : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
