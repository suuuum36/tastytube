import axios from 'axios';
const KEY = 'AIzaSyCEBt5M6A0qemJ8QZ9VR4qXBTYkNvWAN2A';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY
    }
})