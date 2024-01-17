let map;

function geoFindMe() {
    let address = document.querySelector(".myAddress");
    let mapContainer = document.getElementById('map'), // 지도를 표시할 divS
        mapOption = {
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 2// 지도의 확대 레벨
        };
    // 지도를 표시할 div와 지도 옵션으로 지도를 생성합니다
    map = new kakao.maps.Map(mapContainer, mapOption);
    //마우스 휠 확대 축소 막기
    map.setZoomable(false);
    // copyright의 위치를 오른쪽 아래로 설정하고, 로고와의 위치를 반전시킨다.
    map.setCopyrightPosition(kakao.maps.CopyrightPosition.BOTTOMRIGHT, true);

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    let mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    function getAddr(lat, lng) {
        let geocoder = new kakao.maps.services.Geocoder();
        let coord = new kakao.maps.LatLng(lat, lng);
        let callback = function (result, status) {
            if (status === kakao.maps.services.Status.OK) {
                address.innerHTML = result[0].address.address_name;
            }
        }
        geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    }

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        //현재위치 좌표 저장
        let moveMyLoca = new kakao.maps.LatLng(latitude, longitude);
        //지도 중심으로 이동
        map.setCenter(moveMyLoca);
        //현재 지도 중심 좌표로 주소를 검색한다.
        getAddr(latitude, longitude);
        //마커 생성
        let marker = new kakao.maps.Marker({
            map: map,
            position: moveMyLoca
        });
    }

    function error() {
        alert("현재위치를 가져올 수 없습니다");
    }

    if (!navigator.geolocation) {
        alert("브라우저가 위치 정보를 지원하지 않습니다.");
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}
geoFindMe();
// 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomIn() {
    map.setLevel(map.getLevel() - 1);
}

// 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomOut() {
    map.setLevel(map.getLevel() + 1);
}