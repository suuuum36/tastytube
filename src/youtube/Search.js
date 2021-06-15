import React from 'react';

class Search extends React.Component {
    state = {
        term: ''
    };

    currentText = (e) => {
        this.setState({
            term: e.target.value
        });
    };

    textSubmit = e => {
        e.preventDefault();
        this.props.searchSubmit(this.state.term);
    }

    render() {
        return (
            <div className='search-bar ui segment'>
                <form onSubmit={this.textSubmit} className='ui form'>
                    <div className='field'>
                        <label>검색</label>
                        <input onChange={this.currentText} name='video-search' type="text" value={this.state.term}/>
                        <button>검색</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default Search;
