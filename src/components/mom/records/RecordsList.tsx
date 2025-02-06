import React from 'react';
import { useRecordsStore } from '../../../store/recordsStore';
import { MomRecord } from '../../../types/mom';

interface RecordsListProps {
  selectedDate: Date;
}

const RecordsList: React.FC<RecordsListProps> = ({ selectedDate }) => {
  const { momRecords, updateMomRecord, addMomRecord } = useRecordsStore();

  const getRecordForDate = (date: Date): MomRecord => { // Explicitly return MomRecord
    const existingRecord = momRecords.find(record => {
      // Ensure record.date is a Date object
      const recordDate = record.date instanceof Date ? record.date : new Date(record.date);
      return recordDate.toDateString() === date.toDateString();
    });

    if (existingRecord) {
      return {
        ...existingRecord,
        date: existingRecord.date instanceof Date ? existingRecord.date : new Date(existingRecord.date)
      };
    }

    // Create new record with proper Date object
    return {
      date: new Date(date),
      period: null,
      weight: null,
      mood: null,
      vitamins: [],
      habits: [],
      diary: '',
      symptoms: ''
    };
  };

  const currentRecord: MomRecord = getRecordForDate(selectedDate); // Explicitly type currentRecord

  const handlePeriodChange = (hasPeriod: boolean) => {
    const updatedRecord = {
      ...currentRecord,
      period: hasPeriod,
      id: currentRecord.id || crypto.randomUUID()
    };

    if (currentRecord.id) {
      updateMomRecord(updatedRecord);
    } else {
      addMomRecord(updatedRecord);
    }
  };

  const handleWeightChange = (weight: number) => {
    const updatedRecord = {
      ...currentRecord,
      weight,
      id: currentRecord.id || crypto.randomUUID()
    };

    if (currentRecord.id) {
      updateMomRecord(updatedRecord);
    } else {
      addMomRecord(updatedRecord);
    }
  };

  const handleMoodChange = (mood: string) => {
    const updatedRecord = {
      ...currentRecord,
      mood,
      id: currentRecord.id || crypto.randomUUID()
    };

    if (currentRecord.id) {
      updateMomRecord(updatedRecord);
    } else {
      addMomRecord(updatedRecord);
    }
  };

  const handleVitaminToggle = (vitamin: string) => {
    const vitamins = currentRecord.vitamins || [];
    const updatedVitamins = vitamins.includes(vitamin)
      ? vitamins.filter(v => v !== vitamin)
      : [...vitamins, vitamin];

    const updatedRecord = {
      ...currentRecord,
      vitamins: updatedVitamins,
      id: currentRecord.id || crypto.randomUUID()
    };

    if (currentRecord.id) {
      updateMomRecord(updatedRecord);
    } else {
      addMomRecord(updatedRecord);
    }
  };

  const handleHabitToggle = (habit: string) => {
    const habits = currentRecord.habits || [];
    const updatedHabits = habits.includes(habit)
      ? habits.filter(h => h !== habit)
      : [...habits, habit];

    const updatedRecord = {
      ...currentRecord,
      habits: updatedHabits,
      id: currentRecord.id || crypto.randomUUID()
    };

    if (currentRecord.id) {
      updateMomRecord(updatedRecord);
    } else {
      addMomRecord(updatedRecord);
    }
  };

  const handleTextInput = (field: 'diary' | 'symptoms', text: string) => {
    const updatedRecord = {
      ...currentRecord,
      [field]: text,
      id: currentRecord.id || crypto.randomUUID()
    };

    if (currentRecord.id) {
      updateMomRecord(updatedRecord);
    } else {
      addMomRecord(updatedRecord);
    }
  };

  const moods = [
    { icon: '😊', label: 'Joyful' },
    { icon: '😃', label: 'Content' },
    { icon: '😐', label: 'Neutral' },
    { icon: '😔', label: 'Down' },
    { icon: '😢', label: 'Depressed' }
  ];

  const vitamins = [
    { icon: '🐟', label: 'Fish oil' },
    { icon: '💊', label: 'Multivitamins' },
    { icon: '🥛', label: 'Calcium' }
  ];

  const habits = [
    { icon: '🍎', label: 'Fruits' },
    { icon: '💧', label: 'Water' },
    { icon: '🏃‍♀️', label: 'Exercise' },
    { icon: '🚶‍♀️', label: 'Walk' },
    { icon: '🚽', label: 'Dump' }
  ];

  return (
    <div className="space-y-4 p-4">
      {/* Period */}
      <div className="bg-white p-4 rounded-lg flex justify-between items-center">
        <span>Period has come</span>
        <div className="flex space-x-2">
          <button
            onClick={() => handlePeriodChange(true)}
            className={`px-4 py-1 rounded-full ${
              currentRecord.period === true
                ? 'bg-pink-500 text-white'
                : 'border border-pink-500 text-pink-500'
            }`}
          >
            Yes
          </button>
          <button
            onClick={() => handlePeriodChange(false)}
            className={`px-4 py-1 rounded-full ${
              currentRecord.period === false
                ? 'bg-pink-500 text-white'
                : 'border border-pink-500 text-pink-500'
            }`}
          >
            No
          </button>
        </div>
      </div>

      {/* Weight */}
      <div className="bg-white p-4 rounded-lg flex justify-between items-center">
        <span>Weight</span>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={currentRecord.weight || ''}
            onChange={(e) => handleWeightChange(Number(e.target.value))}
            placeholder="Enter weight"
            className="w-20 p-2 border rounded-lg text-center"
          />
          <span className="text-gray-500">kg</span>
        </div>
      </div>

      {/* Mood */}
      <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <span>Mood</span>
          <div className="flex space-x-4">
            {moods.map(mood => (
              <button
                key={mood.label}
                onClick={() => handleMoodChange(mood.label)}
                className={`text-2xl ${
                  currentRecord.mood === mood.label ? '' : 'opacity-50'
                }`}
              >
                {mood.icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Vitamins */}
      <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <span>Vitamins</span>
          <button className="text-pink-500">+</button>
        </div>
        <div className="flex space-x-4">
          {vitamins.map(vitamin => (
            <button
              key={vitamin.label}
              onClick={() => handleVitaminToggle(vitamin.label)}
              className={`text-2xl ${
                currentRecord.vitamins?.includes(vitamin.label) ? '' : 'opacity-50'
              }`}
            >
              {vitamin.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Good Habits */}
      <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <span>Good Habits</span>
          <button className="text-pink-500">+</button>
        </div>
        <div className="flex flex-wrap gap-4">
          {habits.map(habit => (
            <button
              key={habit.label}
              onClick={() => handleHabitToggle(habit.label)}
              className={`text-2xl ${
                currentRecord.habits?.includes(habit.label) ? '' : 'opacity-50'
              }`}
            >
              {habit.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Diary */}
      <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <span>Diary</span>
          <button className="text-pink-500">+</button>
        </div>
        <textarea
          value={currentRecord.diary || ''}
          onChange={(e) => handleTextInput('diary', e.target.value)}
          placeholder="Write your thoughts..."
          className="w-full p-2 border rounded-lg"
          rows={3}
        />
      </div>

      {/* Symptoms */}
      <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <span>Symptoms</span>
          <button className="text-pink-500">+</button>
        </div>
        <textarea
          value={currentRecord.symptoms || ''}
          onChange={(e) => handleTextInput('symptoms', e.target.value)}
          placeholder="Record any symptoms..."
          className="w-full p-2 border rounded-lg"
          rows={3}
        />
      </div>
    </div>
  );
};

export default RecordsList;