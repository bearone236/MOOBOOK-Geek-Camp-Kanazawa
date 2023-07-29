import React, { useEffect, useRef } from 'react'; // useRefをインポートします
import { Link } from 'react-router-dom';
import '../index.css';
import { usePose } from './posecontext';

const Home = () => {
  const { pose, resetPose } = usePose();
  const linkRef = useRef(null);

  useEffect(() => {
    if (pose === 'enter') {
      console.log('Go');
      if (linkRef.current) {
        linkRef.current.click();
        resetPose();
      }
    }
  }, [pose]);

  return (
    <div className="home">
      {/* <div className="homeMenu" id="operation_button">
        <p>操作説明</p>
      </div> */}
      <div className="homeMenu" id="start_button">
        <Link to={{ pathname: '/book' }} style={{ textDecoration: 'none' }} ref={linkRef}>
          <p>START</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
