import React, { useState, useEffect } from "react";
import "./MapContainer.css";
import {
  setJjim,
  getJjim,
  deleteJjim,
  signInWithGoogle,
  auth,
} from "./Firebase";

const { kakao } = window;

const MapContainer = ({ searchPlace, searchSubmit, currentUser }) => {
  let markers = [];
  const [jjimLists, setJjimLists] = useState();
  useEffect(() => {
    setJjimLists(getJjim(currentUser));
  }, [currentUser]);

  useEffect(() => {
    const container = document.getElementById("myMap");
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const options = {
      center: new kakao.maps.LatLng(37.45653077159792, 126.95001167584478), // 서울대 위치
      level: 5, // 확대/축소 수준
    };
    const map = new kakao.maps.Map(container, options);
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.BOTTOMRIGHT);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB, {
      category_group_code: "FD6",
    });

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료되면 검색 목록 및 마커를 표출합니다
        displayPlaces(data);

        // 페이지 번호 표출
        displayPagination(pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
      }
    }

    // 검색 결과 목록과 마커를 표출하는 함수
    function displayPlaces(places) {
      const listEl = document.getElementById("placesList"),
        menuEl = document.getElementById("menu_wrap"),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds(),
        listStr = "";

      // 검색 결과 목록에 추가된 항목들을 제거
      removeAllChildNods(listEl);

      // 지도에 표시되고 있는 마커를 제거
      removeMarker();

      for (let i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시
        const placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
          marker = addMarker(placePosition, i),
          itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위해 LatLngBounds 객체에 좌표를 추가
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을 때 해당 장소 인포윈도우에 장소명을 표시
        // mouseout 했을 때는 인포윈도우 제거
        (function (marker, title) {
          kakao.maps.event.addListener(marker, "mouseover", function () {
            displayInfowindow(marker, title);
          });

          kakao.maps.event.addListener(marker, "mouseout", function () {
            infowindow.close();
          });

          kakao.maps.event.addListener(marker, "click", function () {
            console.log(title);
            searchSubmit(title);
          });
          itemEl.onmouseover = function () {
            displayInfowindow(marker, title);
          };

          itemEl.onmouseout = function () {
            infowindow.close();
          };
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
      }

      // 검색결과 항목들을 검색결과 목록 Element에 추가
      listEl.appendChild(fragment);
      menuEl.scrollTop = 0;

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정
      map.setBounds(bounds);
    }

    // 검색결과 항목을 Element로 반환하는 함수
    function getListItem(index, places) {
      let placeName = places.place_name;
      let el = document.createElement("li"),
        itemStr =
          '<span class="markerbg marker_' +
          (index + 1) +
          '"></span>' +
          '<div class="info">' +
          "<h5>" +
          places.place_name +
          "</h5>";

      if (places.road_address_name) {
        itemStr +=
          "<span>" +
          places.road_address_name +
          "</span>" +
          '<span class="jibun gray">' +
          places.address_name +
          "</span>";
      } else {
        itemStr += "<span>" + places.address_name + "</span>";
      }

      itemStr += '<span class="tel">' + places.phone + "</span>" + "</div>";
      el.innerHTML = itemStr;
      el.className = "item";
      el.addEventListener("click", function (e) {
        console.log(placeName);
        searchSubmit(placeName);
      });
      const jjimBtn = document.createElement("button");
      jjimBtn.innerHTML = jjimLists
        ? jjimLists.indexOf(places.place_name) == -1
          ? "찜"
          : "취소"
        : "찜";
      jjimBtn.addEventListener("click", (e) => {
        e.preventDefault();
        !currentUser &&
          window.confirm("로그인 후 이용하시겠습니까?") &&
          signInWithGoogle() &&
          (currentUser = auth.user);

        currentUser && jjimLists
          ? jjimBtn.innerHTML === "찜"
            ? setJjim(places, currentUser)
            : deleteJjim(currentUser, places.place_name)
          : setJjim(places, currentUser);
        setJjimLists(getJjim(currentUser));
        currentUser && jjimBtn.innerHTML === "찜"
          ? (jjimBtn.innerHTML = "취소")
          : (jjimBtn.innerHTML = "찜");
      });
      el.appendChild(jjimBtn);

      return el;
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수
    function addMarker(position, idx, title) {
      const imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        ),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });

      marker.setMap(map); // 지도 위에 마커를 표출
      markers.push(marker); // 배열에 생성된 마커를 추가

      return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거
    function removeMarker() {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    // 검색결과 목록 하단에 페이지번호를 표시하는 함수
    function displayPagination(pagination) {
      let paginationEl = document.getElementById("pagination");
      let fragment = document.createDocumentFragment();
      let i;

      // 기존에 추가된 페이지번호를 삭제
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (i = 1; i <= pagination.last; i++) {
        let el = document.createElement("a");
        el.href = "#";
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = "on";
        } else {
          el.onclick = (function (i) {
            return function () {
              pagination.gotoPage(i);
            };
          })(i);
        }

        fragment.appendChild(el);
      }
      paginationEl.appendChild(fragment);
    }

    // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수
    // 인포윈도우에 장소명을 표시
    function displayInfowindow(marker, title) {
      let content;
      content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

      infowindow.setContent(content);
      infowindow.open(map, marker);
    }

    // 검색결과 목록의 자식 Element를 제거하는 함수
    function removeAllChildNods(el) {
      while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }
    }
  }, [searchPlace, currentUser]);

  return (
    <div>
      <div>
        <div id="myMap" />
        <div id="menu_wrap">
          <ul id="placesList"></ul>
          <div id="pagination" />
        </div>
      </div>
    </div>
  );
};

export default MapContainer;
