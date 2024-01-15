// LoaderButton.js
import React from "react";
import { Spinner } from "react-bootstrap";
import {
    // BeatLoader,
    // CircleLoader,
  //   BounceLoader,
  //   ClipLoader,
  // FadeLoader,
  //   GridLoader,
  //   HashLoader, 
  //   PropagateLoader,
  //   PulseLoader,
    // RingLoader,
  //   RiseLoader,
  //   ScaleLoader,
    // SyncLoader,
  //   RotateLoader,
} from "react-spinners";
function LoaderButton() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-5">
        <span className="visually-hidden">Loading...</span>

        {/* from react-bootstrap */}
        <Spinner annimation='border' variant='primary' size='sm' /> 

        {/* from react-spinners */}
        {/* <FadeLoader color="blue" size={2} /> */}

        {/* 
      <p>BeatLoader...<BeatLoader color="#ff0000" size={20} /></p><br />
      <CircleLoader color="#0000ff" size={20} />
      <BounceLoader color="#00ff00" size={20} />
      <RotateLoader color="#ff0000" size={20} />
      <SyncLoader color="#ff0000" size={20} />
      <ScaleLoader color="#ff0000" size={20} />
      <RiseLoader color="#ff0000" size={20} />
      <RingLoader color="#ff0000" size={20} />
      <PulseLoader color="#ff0000" size={20} />
      <PropagateLoader color="#ff0000" size={20} />
      <HashLoader color="#ff0000" size={20} />
      <GridLoader color="#ff0000" size={20} />
      <FadeLoader color="#ff0000" size={20} />
      <ClipLoader color="#ff0000" size={20} /> */}
      </div>
    </>
  );
}

export default LoaderButton;
