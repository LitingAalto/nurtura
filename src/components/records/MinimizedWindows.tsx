import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWindowStore, MinimizedWindow } from '../../store/windowStore';

const MinimizedWindows: React.FC = () => {
  const navigate = useNavigate();
  const { minimizedWindows, restoreWindow, closeWindow } = useWindowStore();
  const [showPreview, setShowPreview] = useState(false);

  const handleWindowClick = (window: MinimizedWindow) => {
    if (minimizedWindows.length === 1) {
      const restoredWindow = restoreWindow(window.id);
      if (restoredWindow) {
        navigate(`/${restoredWindow.type}`, { state: { ...restoredWindow.state } });
      }
    } else {
      setShowPreview(!showPreview);
    }
  };

  const handleRestore = (window: MinimizedWindow) => {
    const restoredWindow = restoreWindow(window.id);
    if (restoredWindow) {
      navigate(`/${restoredWindow.type}`, { state: { ...restoredWindow.state } });
    }
    setShowPreview(false);
  };

  if (minimizedWindows.length === 0) return null;

  return (
    <div className="fixed bottom-20 right-4 flex flex-col items-end">
      {showPreview && minimizedWindows.length > 1 && (
        <div className="bg-white rounded-lg shadow-lg mb-2 overflow-hidden">
          {minimizedWindows.map((window) => (
            <div
              key={window.id}
              className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
              onClick={() => handleRestore(window)}
            >
              <div className="flex items-center">
                <span className="text-xl mr-2">{window.icon}</span>
                <div>
                  <div className="font-medium">{window.title}</div>
                  <div className="text-xs text-gray-500">
                    {window.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeWindow(window.id);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex space-x-2">
        {minimizedWindows.map((window) => (
          <button
            key={window.id}
            onClick={() => handleWindowClick(window)}
            className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-xl"
          >
            {window.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MinimizedWindows;