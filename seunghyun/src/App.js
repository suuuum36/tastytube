import React, { useRef, useEffect } from "react";
import './App.css';

const { kakao } = window;


const options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
    level: 3, //지도의 레벨(확대, 축소 정도)
};

function App() {
    useEffect(() => {
        const container = document.getElementById('myMap');
        const options = {
            center: new kakao.maps.LatLng(37.45657761349089, 126.95003849793633),
            level: 5
        };
        const map = new kakao.maps.Map(container, options);
    }, []);

    return (
        <div id='myMap' style={{
    width: '100%',
    height: '100vh'
    }}/>
    );
}

export default App;
