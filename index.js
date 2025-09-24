import {Heartbeat} from './heartbeat.js';

const OPENCV_URI = "https://docs.opencv.org/master/opencv.js";
const HAARCASCADE_URI = "haarcascade_frontalface_alt.xml"

// Load opencv when needed
async function loadOpenCv(uri) {
  return new Promise(function(resolve, reject) {
    console.log("Starting to load OpenCV from:", uri);
    var tag = document.createElement('script');
    tag.src = uri;
    tag.async = true;
    tag.type = 'text/javascript'
    tag.onload = () => {
      console.log("OpenCV script loaded, waiting for runtime initialization...");
      cv['onRuntimeInitialized'] = () => {
        console.log("OpenCV runtime initialized and ready!");
        resolve();
      }
    };
    tag.onerror = () => {
      console.error("Failed to load OpenCV script from:", uri);
      throw new URIError("opencv didn't load correctly.");
    };
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  });
}

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
