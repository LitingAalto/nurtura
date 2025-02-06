import React from 'react';

interface ModeSwitchDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ModeSwitchDialog: React.FC<ModeSwitchDialogProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-2">Switch Input Mode?</h3>
        <p className="text-gray-600 mb-6">
          Your current data will not be saved. Are you sure you want to switch modes?
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600"
          >
            Switch
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModeSwitchDialog;