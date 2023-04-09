import { Coordinates } from '../types/store';
import { useCallback } from 'react';
import { mutate } from 'swr';
import type { NaverMap } from '../types/map';

//coordinates : Lat , Lng
export const INITIAL_CENTER: Coordinates = [37.5262411, 126.99289439];
export const INITIAL_ZOOM = 10;

export const MAP_KEY = '/map';

const useMap = () => {
  const initializeMap = useCallback((map: NaverMap) => {
    mutate(MAP_KEY, map); //'/map'공간에 map을 전역 공간으로 넣는다.
  }, []);

  return {
    initializeMap,
  };
};
export default useMap;
