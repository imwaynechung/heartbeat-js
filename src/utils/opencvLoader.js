```javascript
const OPENCV_URI = "https://docs.opencv.org/master/opencv.js";

// Load opencv when needed
export async function loadOpenCv(uri) {
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
      reject(new URIError("opencv didn't load correctly."));
    };
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  });
}
```