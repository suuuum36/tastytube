import React, { useEffect, useState } from 'react';
import './youtube.css';

const VideoPlay = ({video}) => {
    const [show, setShow] = useState(true);
    const [newVideo, setnewVideo] = useState('');

    useEffect (() => {
        if(newVideo === null) {
            setnewVideo(video);
        } else if(newVideo !== video) {
            setnewVideo(video);
            setShow(true);
        }
    })
    

    const remove = () => {
        if(show) {
            setShow(false)
        } else if(!show) {
            setShow(true)
        }
    } 


    if (!video) {
        return <div></div>;
    } 

    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
    // console.log(typeof(video));

    const showDiv =         
        <div className="playingDiv">
            <div className="pRemove">
                <div className="pButton" onClick={remove}> &lt;&lt; </div>
            </div>
            <div className='pVideo'>
                <iframe src={videoSrc} allowFullScreen title='Video player'/>
            </div>
            <div className='pContent'>
                <div className='pHeader'>{video.snippet.title}</div>
            </div>
        </div>

    const hideDiv =
        <div className="hideDiv" onClick={remove}>
            <div className="pRemove">
                <div className="pButton"> &gt;&gt; </div>
            </div>
        </div>
    
    return (
        <div>{show ? <div>{showDiv}</div> : <div>{hideDiv}</div>}</div>
    )
}

export default VideoPlay;