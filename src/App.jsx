```javascript
import React from 'react';
import HeartbeatMonitor from './components/HeartbeatMonitor.jsx';

function App() {
  return (
    <div>
      <h1>Heartbeat demo</h1>
      <p>This demo runs a simple variant of rPPG directly in your browser to measure your heart rate based on subtle changes in skin color.</p>
      <p>For best results, try in a constantly well lit space with minimal device and subject motion.</p>
      <br />
      <HeartbeatMonitor />
    </div>
  );
}

export default App;
```