import React from 'react';
import Search from './youtube/Search';
import youtube from './youtube/Api';
import VideoList from './youtube/VideoList';
import VideoPlay from './youtube/VideoPlay';

class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null
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
    };

    selectVideo = (video) => {
        this.setState({selectedVideo: video})
    }

    render() {
        return (
            <div className='ui container' style={{marginTop: '1em'}}>
                <Search searchSubmit={this.searchSubmit}/>
                <div className='ui grid'>
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoPlay video={this.state.selectedVideo}/>
                        </div>
                        <div className="five wide column">
                            <VideoList selectVideo={this.selectVideo} videos={this.state.videos}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
