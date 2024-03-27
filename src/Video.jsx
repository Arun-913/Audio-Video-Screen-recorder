import React, { useState, useEffect, useRef } from "react";
import { ReactMediaRecorder,useReactMediaRecorder } from "react-media-recorder";
import ReactPlayer from 'react-player';

const Video = () =>{
    const [stream, setStream] = useState(null);
    const videoRef = useRef();
    const { status, startRecording, stopRecording, mediaBlobUrl } =
      useReactMediaRecorder({ video: true });
    const downloadLink = mediaBlobUrl ? mediaBlobUrl : null;

    useEffect(() => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          console.error('getUserMedia is not supported');
          return;
        }
    
        const enableCamera = async () => {
          try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
              videoRef.current.srcObject = mediaStream;
              setStream(mediaStream);
            }
          } catch (error) {
            console.log(`Error accessing camera: ${error.message}`);
          }
        };
    
        enableCamera();
    
        return () => {
          if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
          }
        };
    }, []);

    return <>
    <div className='options'>
        <button className="options-btn" onClick={startRecording} disabled={status === 'recording'}>Start Recording</button>
        <button className="options-btn" onClick={stopRecording} disabled={status !== 'recording'}>Stop Recording</button>
    </div> 
    <div className="options">
        {mediaBlobUrl && <video className="options-btn" src={mediaBlobUrl} controls autoPlay loop style={{ width: '400px', height: '250px' }}/>}
        {!mediaBlobUrl && <video className="options-btn" ref={videoRef} autoPlay playsInline muted style={{ width: '400px', height: '250px' }} />}
    </div>
    {downloadLink && (
        <div className="options">
            <a className="download-link" href={downloadLink} download="recorded_video.mp4">Download Video</a>
        </div>
    )}
    </>
};

export default Video;
