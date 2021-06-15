import React from 'react';
import './youtube.css';

const VideoItem = ({video , selectVideo}) => {
    return (
        <div onClick={() => selectVideo(video)} className=' video-item item'>
            <img className='ui image' src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
            <div className='content'>
                <div className='header '>{video.snippet.title}</div>
            </div>
        </div>
    )
};
export default VideoItem;