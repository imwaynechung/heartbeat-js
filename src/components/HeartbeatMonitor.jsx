import React, { useRef, useEffect, useState } from 'react';
import { Heartbeat } from '../../heartbeat.js';
import { loadOpenCv, OPENCV_URI } from '../utils/opencvLoader.js';

const HAARCASCADE_URI = "haarcascade_frontalface_alt.xml";

function HeartbeatMonitor() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let heartbeatInstance = null;

    const initializeHeartbeat = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Attempting to load OpenCV...");
        await loadOpenCv(OPENCV_URI);
        console.log("OpenCV loaded successfully.");

        if (webcamRef.current && canvasRef.current) {
          console.log("Initializing Heartbeat instance...");
          heartbeatInstance = new Heartbeat(
            webcamRef.current,
            canvasRef.current,
            HAARCASCADE_URI,
            30, // targetFps
            6,  // windowSize
            250 // rppgInterval
          );
          await heartbeatInstance.init();
          console.log("Heartbeat demo initialized successfully!");
        } else {
          throw new Error("Webcam or canvas elements not available.");
        }
      } catch (err) {
        console.error("Error during Heartbeat initialization:", err);
        setError(err.message || "Failed to initialize heartbeat monitor.");
      } finally {
        setLoading(false);
      }
    };

    initializeHeartbeat();

    return () => {
      if (heartbeatInstance) {
        console.log("Stopping Heartbeat instance on component unmount...");
        heartbeatInstance.stop();
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-gray-600 text-lg">Loading OpenCV and initializing webcam...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center mb-3">
          <div className="text-red-500 text-xl mr-3">⚠️</div>
          <h3 className="text-red-800 font-semibold">Error</h3>
        </div>
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl w-full">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
          <div className="relative">
            <video 
              hidden 
              ref={webcamRef} 
              width="640" 
              height="480"
              className="rounded-lg"
            />
            <canvas 
              ref={canvasRef} 
              width="640" 
              height="480"
              className="rounded-lg border-2 border-gray-200 shadow-md max-w-full h-auto"
            />
            <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-medium">
              🔴 Live
            </div>
          </div>
          
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 rounded-xl shadow-lg text-center min-w-[200px]">
              <div className="text-sm font-medium opacity-90 mb-1">Heart Rate</div>
              <div className="text-3xl font-bold" id="bpm-display">-- BPM</div>
              <div className="text-xs opacity-75 mt-1">Beats per minute</div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Monitoring active</span>
              </div>
              <p className="text-xs text-gray-500 max-w-xs">
                Position your face in the frame and stay still for accurate readings
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-blue-600 font-semibold text-sm">Technology</div>
              <div className="text-gray-700 text-xs mt-1">Remote Photoplethysmography</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-green-600 font-semibold text-sm">Detection</div>
              <div className="text-gray-700 text-xs mt-1">OpenCV Face Recognition</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-purple-600 font-semibold text-sm">Analysis</div>
              <div className="text-gray-700 text-xs mt-1">Real-time Signal Processing</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default HeartbeatMonitor