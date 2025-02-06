import React from 'react';
import TimerDisplay from './TimerDisplay';
import ManualInput from './ManualInput';
import ConfirmDialog from '../../common/ConfirmDialog';
import ModeSwitchDialog from '../../common/ModeSwitchDialog';
import ReminderIcon from '../../reminder/ReminderIcon'; // Import is fine

interface BreastfeedingTimerProps {
  existingActivity: any; // Replace 'any' with the actual type
  onSave: () => void;
  onDelete: () => void;
  duration: number;
  onDurationChange: (duration: number) => void;
  startTime: Date | null;
  onTimeChange: (time: Date) => void;
  isManualMode: boolean;
  onModeSwitch: () => void;
  showModeSwitchDialog: boolean;
  onModeSwitchConfirm: () => void;
  onModeSwitchCancel: () => void;
  showExitDialog: boolean;
  showDeleteDialog: boolean;
  onExitDialogClose: () => void;
  onDeleteDialogClose: () => void;
  activeTimer: 'left' | 'right' | null;
  setActiveTimer: (side: 'left' | 'right' | null) => void;
}

const BreastfeedingTimer: React.FC<BreastfeedingTimerProps> = ({
  existingActivity,
  onSave,
  onDelete,
  duration,
  onDurationChange,
  startTime,
  onTimeChange,
  isManualMode,
  onModeSwitch,
  showModeSwitchDialog,
  onModeSwitchConfirm,
  onModeSwitchCancel,
  showExitDialog,
  showDeleteDialog,
  onExitDialogClose,
  onDeleteDialogClose,
  activeTimer,
  setActiveTimer
}) => {
  const handleTimerToggle = (side: 'left' | 'right') => {
    if (activeTimer === side) {
      setActiveTimer(null);
    } else {
      setActiveTimer(side);
    }
  };

  return (
    <>
      {!existingActivity && (
        <div className="flex justify-center space-x-4 p-4">
          <button
            onClick={onModeSwitch} // Assign the onModeSwitch function to onClick
            className={`px-6 py-2 rounded-full ${!isManualMode ? 'bg-pink-500 text-white' : 'bg-gray-100'}`}
          >
            Timer
          </button>
          <button
            onClick={onModeSwitch} // Assign the onModeSwitch function to onClick
            className={`px-6 py-2 rounded-full ${isManualMode ? 'bg-pink-500 text-white' : 'bg-gray-100'}`}
          >
            Manual Input
          </button>
        </div>
      )}

      {isManualMode ? (
        <ManualInput
          duration={duration} // Assign the duration prop
          setDuration={onDurationChange} // Assign the onDurationChange function
          startTime={startTime} // Assign the startTime prop
          setStartTime={onTimeChange} // Assign the onTimeChange function
        />
      ) : (
        <TimerDisplay
          activeTimer={activeTimer} // Assign the activeTimer prop
          duration={duration} // Assign the duration prop
          onTimerToggle={handleTimerToggle} // Assign the handleTimerToggle function
          onDurationChange={onDurationChange} // Assign the onDurationChange function
        />
      )}

      <button
        onClick={onSave} // Assign the onSave function to onClick
        className="bg-pink-500 text-white p-4 mx-4 mb-4 rounded-full text-lg font-medium"
      >
        {existingActivity ? 'Update' : 'Save'}
      </button>

      {/* USE THE ReminderIcon HERE */}
      <ReminderIcon />  {/* Example: Just render it.  You'll likely want to style and position it properly. */}

      <ConfirmDialog
        isOpen={showExitDialog} // Assign the showExitDialog prop
        title="Exit without saving?"
        message="You have unsaved feeding data. Do you want to save before exiting?"
        onConfirm={onSave} // Assign the onSave function
        onCancel={onExitDialogClose} // Assign the onExitDialogClose function
      />

      <ConfirmDialog
        isOpen={showDeleteDialog} // Assign the showDeleteDialog prop
        title="Delete Record"
        message="Are you sure you want to delete this record? This action cannot be undone."
        onConfirm={onDelete} // Assign the onDelete function
        onCancel={onDeleteDialogClose} // Assign the onDeleteDialogClose function
      />

      <ModeSwitchDialog
        isOpen={showModeSwitchDialog} // Assign the showModeSwitchDialog prop
        onConfirm={onModeSwitchConfirm} // Assign the onModeSwitchConfirm function
        onCancel={onModeSwitchCancel} // Assign the onModeSwitchCancel function
      />
    </>
  );
};

export default BreastfeedingTimer;