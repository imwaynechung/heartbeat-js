export const OPENCV_URI = "https://docs.opencv.org/master/opencv.js";

// Global state to track OpenCV loading
let opencvLoadingPromise = null;

// Load opencv when needed
export async function loadOpenCv(uri) {
  // Check if OpenCV is already loaded
  if (typeof window !== 'undefined' && window.cv && window.cv.Mat) {
    console.log("OpenCV is already loaded and ready!");
    return Promise.resolve();
  }
  
  // Check if loading is already in progress
  if (opencvLoadingPromise) {
    console.log("OpenCV loading already in progress, waiting for existing promise...");
    return opencvLoadingPromise;
  }
  
  // Start new loading process
  opencvLoadingPromise = new Promise(function(resolve, reject) {
    console.log("Starting to load OpenCV from:", uri);
    
    // Check if script is already in DOM
    const existingScript = document.querySelector(`script[src="${uri}"]`);
    if (existingScript) {
      console.log("OpenCV script already exists in DOM, waiting for initialization...");
      if (window.cv && window.cv.Mat) {
        resolve();
        return;
      }
      // Wait for existing script to initialize
      window.cv = window.cv || {};
      window.cv['onRuntimeInitialized'] = () => {
        console.log("OpenCV runtime initialized from existing script!");
        resolve();
      };
      return;
    }
    
    var tag = document.createElement('script');
    tag.src = uri;
    tag.async = true;
    tag.type = 'text/javascript'
    tag.onload = () => {
      console.log("OpenCV script loaded, waiting for runtime initialization...");
      window.cv = window.cv || {};
      cv['onRuntimeInitialized'] = () => {
        console.log("OpenCV runtime initialized and ready!");
        resolve();
      }
    };
    tag.onerror = () => {
      console.error("Failed to load OpenCV script from:", uri);
      opencvLoadingPromise = null; // Reset on error
      throw new URIError("opencv didn't load correctly.");
    };
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  });
  
  return opencvLoadingPromise;
}