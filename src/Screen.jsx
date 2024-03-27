import React, { useState, useEffect, useRef } from "react";
import { ReactMediaRecorder,useReactMediaRecorder } from "react-media-recorder";
import ReactPlayer from 'react-player';

const Screen = () =>{
    const [stream, setStream] = useState(null);
    const [recordingType, setRecordingType] = useState('screen');
    const videoRef = useRef();
    const { status, startRecording, stopRecording, mediaBlobUrl } =
        useReactMediaRecorder({ screen: true });
    const downloadLink = mediaBlobUrl ? mediaBlobUrl : null;

    return <>
        <div className='options'>
            <button className="options-btn" onClick={startRecording} disabled={status === 'recording'}>Start Recording</button>
            <button className="options-btn" onClick={stopRecording} disabled={status !== 'recording'}>Stop Recording</button>
        </div> 
        <div className="options">
            {mediaBlobUrl && <video className="options-btn" src={mediaBlobUrl} controls autoPlay loop style={{ width: '400px', height: '250px' }}/>}
        </div>
        {downloadLink && (
        <div className="options">
            <a className="download-link" href={downloadLink} download="recorded_video.mp4">Download Video</a>
        </div>
    )}
    </>
};

export default Screen;
