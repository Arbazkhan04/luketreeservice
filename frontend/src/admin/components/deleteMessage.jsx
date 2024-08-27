import React from 'react';

const ConfirmDelete = ({ isOpen, onClose, onSave, reviewId }) => {
  if (!isOpen) return null;

  const handleSave = () => {
    onSave(reviewId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Adjust the modal container */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 sm:mx-auto flex flex-col items-center">
        {/* Accessibility improvements: aria attributes */}
        <h2 className="text-xl font-semibold mb-4 text-center" aria-live="assertive">
          Are you sure you want to delete this review?
        </h2>

        {/* Button container with adjusted spacing */}
        <div className="flex justify-center space-x-4 mt-4">
          {/* Cancel button with accessibility considerations */}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Cancel deletion"
          >
            Cancel
          </button>
          {/* Delete button with accessibility considerations */}
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            aria-label="Confirm deletion"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
