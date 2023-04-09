import { Coordinates } from '../types/store';
import { useCallback } from 'react';
import { mutate } from 'swr';
import type { NaverMap } from '../types/map';
import useSWR from 'swr';

//coordinates : Lat , Lng
export const INITIAL_CENTER: Coordinates = [37.5262411, 126.99289439];
export const INITIAL_ZOOM = 10;

export const MAP_KEY = '/map';

const useMap = () => {
  const { data: map } = useSWR(MAP_KEY);

  const initializeMap = useCallback((map: NaverMap) => {
    mutate(MAP_KEY, map); //'/map'공간에 map을 전역 공간으로 넣는다.
  }, []);

  //morph라는 map의 method를 사용한다. -> 부드러운 이동감을 준다.
  const resetMapOptions = useCallback(() => {
    /** https://navermaps.github.io/maps.js.ncp/docs/naver.maps.Map.html#morph__anchor */
    map.morph(new naver.maps.LatLng(...INITIAL_CENTER), INITIAL_ZOOM);
  }, [map]);

  const getMapOptions = useCallback(() => {
    const mapCenter = map.getCenter(); //네이버 지도 객체
    const center: Coordinates = [mapCenter.lat(), mapCenter.lng()];
    const zoom = map.getZoom(); //현재 지도의 중심 좌표와 줌 레벨을 return 한다.

    return { center, zoom };
  }, [map]);

  return {
    initializeMap,
    resetMapOptions,
    getMapOptions,
  };
};
export default useMap;
