import React, { useEffect } from "react";
import "./App.css";
import jjimData from "./jjimData";
const { kakao } = window;

const JjimOnMap = ({ searchPlace }) => {
  useEffect(() => {
    const container = document.getElementById("myMap");
    let infowindow = new kakao.maps.InfoWindow({zIndex: 1});
    const options = {
      center: new kakao.maps.LatLng(37.45653077159792, 126.95001167584478), // 서울대 위치
      level: 5,
    };

    const map = new kakao.maps.Map(container, options);

    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    ````
    jjimData.forEach((el) => {
      new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(el.lat, el.lng),
        title: el.title,
      })
    });
  }

  return <div id = "myMap" style={{width: "100vw", height: "100vh"}}></div>;

}
export default JjimOnMap;
