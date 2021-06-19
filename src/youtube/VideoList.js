import React from 'react';
import VideoItem from './VideoItem';
import { useEffect, useState } from 'react';
import './youtube.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown} from "@fortawesome/free-solid-svg-icons";
import { faCaretUp} from "@fortawesome/free-solid-svg-icons";

const VideoList = ({videos , selectVideo}) => {
    const [show, setShow] = useState(true);
    const [newVideo, setnewVideo] = useState('');

    useEffect (() => {
        if(videos.length !== 0) {
            setnewVideo(videos);
            if(newVideo !== videos) {
                setnewVideo(videos);
                setShow(true);
            }
        }
    })

    const remove = () => {
        if(show) {
            setShow(false)
        } else if(!show) {
            setShow(true)
        }
    } 

    const renderedVideos =  videos.map((video) => {
        return <VideoItem key={video.id.videoId} video={video} selectVideo={selectVideo}/>
    });

    const showList = 
    <div className={videos.length === 0 ? 'none' : 'listDiv'}>
        <div>{videos.length !== 0 ? <div className='hideMenu1' onClick={remove}><FontAwesomeIcon className="downIcon1" icon={faCaretUp}/> youtube 닫기 </div>: null}</div>
        {renderedVideos}
    </div>

    const hideList = 
    <div onClick={remove}>
        <div className='hideDiv2'>{videos.length !== 0 ? <div className='hideMenu2'><FontAwesomeIcon className="downIcon2" icon={faCaretDown}/> <div>youtube 열기</div> </div>: null}</div>
    </div>

    return (
        <div>{show ? <div>{showList}</div> : <div>{hideList}</div>}</div>
    )
    
};

export default VideoList;