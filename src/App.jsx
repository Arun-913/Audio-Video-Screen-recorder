import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { ReactMediaRecorder,useReactMediaRecorder } from "react-media-recorder";
import ReactPlayer from 'react-player';
import Audio from "./Audio";
import Screen from "./Screen";
import Video from "./Video";

const App = () => {
  const [displayScreen, setDisplayScreen] = useState('video');
  const [activeButton, setActiveButton] = useState('video');

  const handleButtonClick = (type) => {
    console.log("type : ", type);
    setActiveButton(type);
    setDisplayScreen(type);
  };

  return (<>
    <div className="title">Select Recording</div>
    <div className="options">
        <button
          className={`options-btn ${activeButton === 'audio' ? 'active' : ''}`}
          onClick={() => handleButtonClick('audio')}
        >
          Audio
        </button>
        <button
          className={`options-btn ${activeButton === 'video' ? 'active' : ''}`}
          onClick={() => handleButtonClick('video')}
        >
          Video
        </button>
        <button
          className={`options-btn ${activeButton === 'screen' ? 'active' : ''}`}
          onClick={() => handleButtonClick('screen')}
        >
          Screen
        </button>
      </div>

    {displayScreen == 'video' ? <Video/> : <></>}
    {displayScreen == 'audio' ? <Audio/> : <></>}
    {displayScreen == 'screen' ? <Screen/> : <></>}
  </>);
};

export default App;