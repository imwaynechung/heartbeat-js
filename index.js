import {Heartbeat} from './heartbeat.js';
import { loadOpenCv, OPENCV_URI } from './src/utils/opencvLoader.js';

const HAARCASCADE_URI = "haarcascade_frontalface_alt.xml"

console.log("Creating Heartbeat demo instance...");
let demo = new Heartbeat("webcam", "canvas", HAARCASCADE_URI, 30, 6, 250);
console.log("Demo instance created, loading OpenCV...");
var ready = loadOpenCv(OPENCV_URI);
ready.then(function() {
  console.log("OpenCV loaded successfully, initializing demo...");
  demo.init().then(() => {
    console.log("Demo initialization completed successfully!");
  }).catch((error) => {
    console.error("Demo initialization failed:", error);
  });
}).catch((error) => {
  console.error("OpenCV loading failed:", error);
});
