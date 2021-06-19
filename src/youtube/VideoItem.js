import React from 'react';
import './youtube.css';

const VideoItem = ({video , selectVideo}) => {
    return (
        <div className='oneVideo' onClick={() => selectVideo(video)}>
            <img className='thumbnail' src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
            <div className='content'>
                <div className='header'>{video.snippet.title}</div>
                <div className='channel'>{video.snippet.channelTitle}</div>
                <div className='description'>{video.snippet.description}</div>
            </div>
        </div>
    )
};
export default VideoItem;