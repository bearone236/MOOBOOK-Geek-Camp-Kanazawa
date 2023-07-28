import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import io from 'socket.io-client';
import '../App.css';

const socket = io('http://localhost:3000');

const videoConstraints = {
  width: 150,
  height: 100,
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
      <div className="videocontainer">
        <Webcam audio={false} ref={webcamRef} videoConstraints={videoConstraints} />
      </div>
      {capturing ? <button onClick={handleStopCaptureClick}>Stop Capture</button> : <button onClick={handleStartCaptureClick}>Start Capture</button>}
    </div>
  );
};

export default CameraComponent;
