import React, { useEffect } from 'react';
import './App.css';

const { kakao } = window;

const MapContainer = ({ searchPlace }) => {

    useEffect(() => {
        const container = document.getElementById('myMap');
        let infowindow = new kakao.maps.InfoWindow({zIndex:1});
        const options = {
            center: new kakao.maps.LatLng(37.45653077159792, 126.95001167584478), // 서울대 위치
            level: 5 // 확대/축소 수준
        };
        const map = new kakao.maps.Map(container, options);
        const zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        const ps = new kakao.maps.services.Places();

        ps.keywordSearch(searchPlace, placesSearchCB);

        function placesSearchCB (data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {

                let bounds = new kakao.maps.LatLngBounds();

                for (let i=0; i<data.length; i++) {
                    displayMarker(data[i]);
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }

                map.setBounds(bounds);
            }
        }

        function displayMarker(place) {
            let marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x)
            });

            kakao.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                infowindow.open(map, marker);
            });
        }

    }, [searchPlace]);

    return (
        <div id='myMap' style={{
            width: '100%',
            height: '100vh'
        }}/>
    );
}

export default MapContainer;


