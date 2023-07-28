import React, { useEffect, useRef } from 'react';
import * as handpose from '@tensorflow-models/handpose';
import { usePose } from './posecontext'; // 追加

const Testcamera = () => {
  const videoRef = useRef(null);
  const outputRef = useRef(null);
  const debugRef = useRef(null);
  const { setPose } = usePose();

  useEffect(() => {
    let prevX = null;
    let prevY = null;
    const threshold = 10;
    // const distThreshold = 5;

    async function setupCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      videoRef.current.srcObject = stream;

      return new Promise((resolve) => {
        videoRef.current.onloadedmetadata = () => {
          resolve(videoRef.current);
        };
      });
    }

    async function main() {
      const video = await setupCamera();
      video.play();

      const model = await handpose.load();

      // 手の検出を繰り返す
      setInterval(async () => {
        const predictions = await model.estimateHands(video, true); // Flip camera input

        // 各予測結果を描画
        predictions.forEach((prediction) => {
          const landmarks = prediction.landmarks;
          const tip0 = landmarks[5];
          const tip1 = landmarks[6];
          const tip2 = landmarks[7];
          // console.log(landmarks[0][2]);

          //   const dist = Math.hypot(tip0[0] - tip1[0], tip0[1] - tip1[1]);
          //   debug.textContent = `dist: ${dist}`;
          const angle =
            (((tip0[0] - tip1[0]) * (tip2[0] - tip1[0]) + (tip0[1] - tip1[1]) * (tip2[1] - tip1[1]) + (tip0[2] - tip1[2]) * (tip2[2] - tip1[2])) /
              (Math.sqrt((tip0[0] - tip1[0]) ** 2 + (tip0[1] - tip1[1]) ** 2 + (tip0[2] - tip1[2]) ** 2) *
                Math.sqrt((tip2[0] - tip1[0]) ** 2 + (tip2[1] - tip1[1]) ** 2 + (tip2[2] - tip1[2]) ** 2))) *
            -1;
          debugRef.current.textContent = `angle: ${angle}`;
          if (angle < 0) {
            outputRef.current.textContent = '手が閉じています';
            setPose('enter');
          } else {
            outputRef.current.textContent = '手が開いています';
          }

          if (prevX && prevY) {
            const x_dist = landmarks[0][0] - prevX;
            const y_dist = landmarks[0][1] - prevY;
            if (x_dist < -1 * threshold) {
              // Flip x-axis detection
              outputRef.current.textContent += `, 手が左に移動しました`;
              setPose('right');
            } else if (x_dist > threshold) {
              // Flip}< prevX) { // Flip x-axis detection
              outputRef.current.textContent += `, 手が右に移動しました`;
            } else {
              outputRef.current.textContent += ', 手は左右には動いていません';
            }

            if (y_dist < -1 * threshold) {
              outputRef.current.textContent += ', 手が上に移動しました';
            } else if (y_dist > threshold) {
              outputRef.current.textContent += ', 手が下に移動しました';
            } else {
              outputRef.current.textContent += ', 手は上下には動いていません';
            }
          }
          prevX = landmarks[0][0];
          prevY = landmarks[0][1];
        });
      }, 100);
    }

    main();
  });
  return (
    <div>
      <video ref={videoRef} id="video" width="150" height="100" autoPlay playsInline muted style={{ transform: 'scaleX(-1)' }}></video>
      <p ref={outputRef} id="output" className="output"></p>
      <p ref={debugRef} id="debug" className="debug"></p>
    </div>
  );
};

export default Testcamera;
