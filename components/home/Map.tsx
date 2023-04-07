import React, { useEffect, useRef } from 'react';
import Script from 'next/script';
import { Coordinates } from '../../types/store';
import { NaverMap } from '../../types/map';
import { INITIAL_CENTER, INITIAL_ZOOM } from '../../hooks/useMap';

type Props = {
  mapId?: string;
  initialCenter?: Coordinates;
  initialZoom?: number;
  onLoad?: (map: NaverMap) => void;
};

const Map = ({
  mapId = 'map',
  initialCenter = INITIAL_CENTER, // NITIAL_CENTER = [37.5262411, 126.99289439];
  initialZoom = INITIAL_ZOOM, //10
  onLoad, //map이 로드되면 콘솔에 찍힘
}: Props) => {
  const mapRef = useRef<NaverMap | null>(null);

  //https://navermaps.github.io/maps.js.ncp/docs/naver.maps.html#.MapOptions
  const initializeMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(...initialCenter),
      zoom: initialZoom,
      minZoom: 9,
      scaleControl: false,
      mapDataControl: false,
      logoControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT,
      },
    };
    //https://navermaps.github.io/maps.js.ncp/docs/naver.maps.Map.html
    const map = new window.naver.maps.Map(mapId, mapOptions); //map instance , mapId: 지도를 넣을 HTML요소의 id // mapOptions: 지도의 옵션 객체
    mapRef.current = map; //useRef의 현재 값  = current
    if (onLoad) {
      onLoad(map);
    }
  };

  useEffect(() => {
    return () => {
      mapRef.current?.destroy(); //다른 페이지가면 지도 없애기
    };
  }, []);

  //https://nextjs.org/docs/api-reference/next/script#onready
  return (
    <>
      <Script
        strategy="afterInteractive" //로딩의 우선순위 설정
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`}
        onReady={initializeMap} //mount될때마다 지도를 부르기 위해 실행 (OnLoad의 경우 처음 한번만 실행된다.)
      />
      <div id={mapId} style={{ width: '100%', height: '100%' }} />
    </>
  );
};

export default Map;
