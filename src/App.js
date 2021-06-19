import React from 'react';
import Search from './youtube/Search';
import youtube from './youtube/Api';
import VideoList from './youtube/VideoList';
import VideoPlay from './youtube/VideoPlay';
import './youtube/youtube.css';
import MapContainer from './MapContainer';
import SearchPlace from './SearchPlace';

class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null,
        showVideo : true
    }

    searchSubmit = async (searchQuery) => {
        const response = await youtube.get('/search', {
            params: {
                q: searchQuery
            }
        })
        this.setState({ 
            videos: response.data.items
        })
        console.log(response.data);
    };


    selectVideo = (video) => {
        this.setState({selectedVideo: video})
    }

    render() {
        return (
            <div className='ui container' style={{marginTop: '1em'}}>
                <VideoList selectVideo={this.selectVideo} videos={this.state.videos}/>
                <VideoPlay video={this.state.selectedVideo} />
                <SearchPlace searchSubmit={this.searchSubmit}/>
            </div>
        )
    }
}


export default App;
