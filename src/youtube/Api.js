import axios from "axios";
const KEY = "AIzaSyCEBt5M6A0qemJ8QZ9VR4qXBTYkNvWAN2A";
const KEY2 = "AIzaSyBD-aMI11UsF2ytr2lQCCBQx3IP89YvcGI";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    part: "snippet",
    maxResults: 7,
    key: KEY2,
  },
});
