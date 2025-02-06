import React, { useState, useEffect } from 'react'; // Import useEffect
import { useNavigate } from 'react-router-dom';
import type { FeedingLog, SleepLog, DiaperLog } from '../../types/tracking';

const ActivityLogs: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'feeding' | 'sleep' | 'diaper'>('feeding');
    const [feedingLogs, setFeedingLogs] = useState<FeedingLog[]>([]); // State for feeding logs
    const [sleepLogs, setSleepLogs] = useState<SleepLog[]>([]);       // State for sleep logs
    const [diaperLogs, setDiaperLogs] = useState<DiaperLog[]>([]);     // State for diaper logs

    const tabs = [
        { id: 'feeding', label: 'Feeding' },
        { id: 'sleep', label: 'Sleep' },
        { id: 'diaper', label: 'Diaper' },
    ];

    const handleFeedingClick = () => {
        navigate('/feeding');
    };

    // Example useEffect to fetch data (replace with your actual API call)
    useEffect(() => {
        async function fetchData() {
            // Replace these with your actual API calls
            const feedingData = await fetchFeedingLogs(); // Assume this function fetches feeding logs
            const sleepData = await fetchSleepLogs();     // Assume this function fetches sleep logs
            const diaperData = await fetchDiaperLogs();   // Assume this function fetches diaper logs

            setFeedingLogs(feedingData);
            setSleepLogs(sleepData);
            setDiaperLogs(diaperData);
        }

        fetchData();
    }, []); // Empty dependency array means this runs only once on component mount


    // Dummy fetch functions - replace with your actual API calls
    async function fetchFeedingLogs(): Promise<FeedingLog[]> {
        // Replace with your actual API call
        return [{ id: '1', timestamp: new Date(), type: 'formula', amount: 120 }]; // Example data
    }

    async function fetchSleepLogs(): Promise<SleepLog[]> {
        // Replace with your actual API call
        return [{ id: '1', startTime: new Date(), endTime: new Date(), duration: 3600, quality: 'good' }]; // Example data (duration in seconds)
    }

    async function fetchDiaperLogs(): Promise<DiaperLog[]> {
        // Replace with your actual API call
        return [{ id: '1', timestamp: new Date(), type: 'Wet' }]; // Example data
    }


    return (
        <div className="bg-white rounded-lg p-4 shadow">
            <div className="flex space-x-2 mb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => {
                            setActiveTab(tab.id as typeof activeTab);
                            if (tab.id === 'feeding') {
                                handleFeedingClick();
                            }
                        }}
                        className={`px-4 py-2 rounded-lg ${
                            activeTab === tab.id
                                ? 'bg-purple-500 text-white'
                                : 'bg-gray-100 text-gray-700'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="mt-4">
                {activeTab === 'feeding' && (
                    <div>
                        <h3 className="font-semibold mb-2">Feeding Log</h3>
                        {/* Feeding log content */}
                        {feedingLogs.map(log => (
                            <div key={log.id}>
                                {/* Display feeding log data here */}
                                {log.foodType} - {log.amount}ml
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === 'sleep' && (
                    <div>
                        <h3 className="font-semibold mb-2">Sleep Log</h3>
                        {/* Sleep log content */}
                        {sleepLogs.map(log => (
                            <div key={log.id}>
                                {/* Display sleep log data here */}
                                Start: {log.startTime.toLocaleTimeString()} - End: {log.endTime.toLocaleTimeString()}
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === 'diaper' && (
                    <div>
                        <h3 className="font-semibold mb-2">Diaper Log</h3>
                        {/* Diaper log content */}
                        {diaperLogs.map(log => (
                            <div key={log.id}>
                                {/* Display diaper log data here */}
                                Type: {log.type}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ActivityLogs;
