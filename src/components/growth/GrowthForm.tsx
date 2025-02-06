import React, { useState } from 'react';
import { GrowthMeasurement } from '../../types/growth';

interface GrowthFormProps {
  initialData?: GrowthMeasurement;
  onSave: (data: GrowthMeasurement) => void;
  onCancel: () => void;
}

const GrowthForm: React.FC<GrowthFormProps> = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState<GrowthMeasurement>(
    initialData || {
      id: crypto.randomUUID(),
      date: new Date(),
      height: 0,
      weight: 0,
      headCircumference: 0,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      height: Number(formData.height),
      weight: Number(formData.weight),
      headCircumference: Number(formData.headCircumference)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Date</label>
          <input
            type="date"
            value={formData.date.toISOString().split('T')[0]}
            onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Height (cm)</label>
          <input
            type="number"
            step="0.1"
            value={formData.height || ''}
            onChange={(e) => setFormData({ ...formData, height: parseFloat(e.target.value) || 0 })}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Weight (kg)</label>
          <input
            type="number"
            step="0.01"
            value={formData.weight || ''}
            onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) || 0 })}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Head Circumference (cm)</label>
          <input
            type="number"
            step="0.1"
            value={formData.headCircumference || ''}
            onChange={(e) => setFormData({ ...formData, headCircumference: parseFloat(e.target.value) || 0 })}
            className="w-full p-2 border rounded-lg"
          />
        </div>
      </div>

      <div className="flex space-x-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 border border-gray-300 rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 py-2 bg-pink-500 text-white rounded-lg"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default GrowthForm;