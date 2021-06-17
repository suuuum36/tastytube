import React from 'react';
import VideoItem from './VideoItem';
import './youtube.css';

const VideoList = ({videos , selectVideo}) => {
    const renderedVideos =  videos.map((video) => {
        return <VideoItem key={video.id.videoId} video={video} selectVideo={selectVideo}/>
        console.log(video.id);
    });

    return <div className='listDiv'>{renderedVideos}</div>;
};

export default VideoList;