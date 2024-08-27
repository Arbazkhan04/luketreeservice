import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { useState, useEffect } from 'react';

const EditModal = ({ isOpen, onClose, onSave, reviewId, initialDate }) => {
  const [date, setDate] = useState(new Date(initialDate));

  useEffect(() => {
    setDate(new Date(initialDate));
  }, [initialDate]);

  if (!isOpen) return null;

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleSave = () => {
    onSave(reviewId, date);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Adjust the modal container */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 sm:mx-auto flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4 text-center">Edit Date</h2>

        <div className="mb-4 flex justify-center">
          <DateTimePicker
            onChange={handleDateChange}
            value={date}
            className="text-center"
          />
        </div>

        <div className="flex justify-center space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
