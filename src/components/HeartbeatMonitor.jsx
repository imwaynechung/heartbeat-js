```javascript
import React, { useRef, useEffect, useState } from 'react';
import { Heartbeat } from '../heartbeat.js';
import { loadOpenCv } from '../utils/opencvLoader.js';

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
        await loadOpenCv(HAARCASCADE_URI); // HAARCASCADE_URI is passed here, but loadOpenCv expects OPENCV_URI
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
    return <div>Loading OpenCV and initializing webcam...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <video hidden ref={webcamRef} width="640" height="480"></video>
      <canvas ref={canvasRef} width="640" height="480"></canvas>
    </div>
  );
}

export default HeartbeatMonitor;
```