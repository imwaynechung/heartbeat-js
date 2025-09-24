import React from 'react';
import HeartbeatMonitor from './components/HeartbeatMonitor.jsx';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            💓 Heartbeat Monitor
          </h1>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-600 mb-4">
              This demo uses remote photoplethysmography (rPPG) to measure your heart rate 
              directly in your browser by analyzing subtle changes in skin color.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-amber-800">
                <strong>💡 For best results:</strong> Use in well-lit conditions with minimal movement
              </p>
            </div>
          </div>
        </div>
      <HeartbeatMonitor />
      </div>
    </div>
  );
}


export default App