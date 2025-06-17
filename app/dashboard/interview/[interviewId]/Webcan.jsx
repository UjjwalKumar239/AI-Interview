"use client";

import React from "react";
import Webcam from "react-webcam";

const WebcamView = () => {
  return (
    <div className="my-6 border rounded-lg overflow-hidden">
      <Webcam
        audio={false}
        width={320}
        height={240}
        screenshotFormat="image/jpeg"
      />
    </div>
  );
};

export default WebcamView;
