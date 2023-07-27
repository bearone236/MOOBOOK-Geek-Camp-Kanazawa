import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};

const CameraComponent = () => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);

  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm',
    });

    mediaRecorderRef.current.ondataavailable = handleDataAvailable;
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(({ data }) => {
    if (data && data.size > 0) {
      let reader = new FileReader();
      reader.onload = function(evt) {
        socket.emit('videoData', new Uint8Array(evt.target.result));
      };
      reader.readAsArrayBuffer(data);
    }
  }, []);

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  return (
    <div>
      <Webcam audio={false} ref={webcamRef} videoConstraints={videoConstraints} />
      {capturing ? <button onClick={handleStopCaptureClick}>Stop Capture</button> : <button onClick={handleStartCaptureClick}>Start Capture</button>}
    </div>
  );
};

export default CameraComponent;
