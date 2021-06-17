import React, { useState } from 'react';
import './youtube.css';

const VideoPlay = ({video}) => {

    if (!video) {
        return <div></div>;
    } 


    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
    console.log(typeof(video));

    
    return (
        <div className="playingDiv">
            <div className="pRemove">
                <div className="pButton"> &lt;&lt; </div>
            </div>
            <div className='pVideo'>
                <iframe src={videoSrc} allowFullScreen title='Video player'/>
            </div>
            <div className='pContent'>
                <div className='pHeader'>{video.snippet.title}</div>
            </div>
        </div>

    )
}

export default VideoPlay;