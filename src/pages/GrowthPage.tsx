import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GrowthTabs from '../components/growth/GrowthTabs';
import GrowthRecord from '../components/growth/GrowthRecord';
import GrowthChart from '../components/growth/GrowthChart';
import GrowthForm from '../components/growth/GrowthForm';
import { useGrowthStore } from '../store/growthStore';
import { GrowthMeasurement } from '../types/growth';
import ConfirmDialog from '../components/common/ConfirmDialog';

const GrowthPage: React.FC = () => {
  const navigate = useNavigate();
  const { records, addRecord, updateRecord, deleteRecord, loadRecords } = useGrowthStore();
  const [activeTab, setActiveTab] = useState<'records' | 'height' | 'weight' | 'head'>('records');
  const [showForm, setShowForm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<GrowthMeasurement | null>(null);
  const [timeRange, setTimeRange] = useState<'6m' | '1y' | '3y'>('6m');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  const handleSave = async (data: GrowthMeasurement) => {
    try {
      if (selectedRecord) {
        await updateRecord(data);
      } else {
        await addRecord(data);
      }
      setShowForm(false);
      setSelectedRecord(null);
      await loadRecords(); // Reload records after save
    } catch (error) {
      console.error('Error saving growth record:', error);
    }
  };

  const handleEdit = (record: GrowthMeasurement) => {
    setSelectedRecord(record);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setRecordToDelete(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (recordToDelete) {
      try {
        await deleteRecord(recordToDelete);
        setShowDeleteDialog(false);
        setRecordToDelete(null);
        await loadRecords(); // Reload records after delete
      } catch (error) {
        console.error('Error deleting growth record:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => navigate(-1)} className="text-gray-600">
            ←
          </button>
          <h1 className="text-lg font-semibold">Growth Records</h1>
          <button 
            onClick={() => setShowForm(true)}
            className="text-pink-500 text-xl"
          >
            +
          </button>
        </div>
        
        <GrowthTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {showForm ? (
        <GrowthForm
          initialData={selectedRecord || undefined}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setSelectedRecord(null);
          }}
        />
      ) : (
        <div className="p-4">
          {activeTab === 'records' ? (
            <div className="space-y-4">
              {records.map((record) => (
                <GrowthRecord
                  key={record.id}
                  record={record}
                  onEdit={handleEdit}
                  onDelete={() => handleDelete(record.id)}
                />
              ))}
            </div>
          ) : (
            <GrowthChart
              data={records}
              type={activeTab}
              timeRange={timeRange}
              gender="female" // This should come from baby profile
            />
          )}
        </div>
      )}

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Record"
        message="Are you sure you want to delete this growth record? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowDeleteDialog(false);
          setRecordToDelete(null);
        }}
      />
    </div>
  );
};

export default GrowthPage;