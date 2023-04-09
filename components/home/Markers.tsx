import React from 'react';
import useSWR from 'swr';
import { MAP_KEY } from '../../hooks/useMap';
import { STORE_KEY } from '../../hooks/useStores';
import type { ImageIcon, NaverMap } from '../../types/map';
import type { Store } from '../../types/store';
import Marker from './Marker';
import useCurrentStore, {
  CURRENT_STORE_KEY,
} from '../../hooks/useCurrentStore';

const Markers = () => {
  const { data: map } = useSWR<NaverMap>(MAP_KEY); //전역상태로 관리되는 map data를 겟챠
  const { data: stores } = useSWR<Store[]>(STORE_KEY);

  const { data: currentStore } = useSWR<Store>(CURRENT_STORE_KEY); //current store이라는 전역상태값도 가져온다.
  const { setCurrentStore, clearCurrentStore } = useCurrentStore(); //새로운 마커를 찍기위헤 사용

  if (!map || !stores) return null;

  return (
    <>
      {stores.map((store) => {
        // console.log('store.season', store.season);
        return (
          <Marker
            map={map}
            coordinates={store.coordinates}
            icon={generateStoreMarkerIcon(store.season, false)}
            onClick={() => {
              setCurrentStore(store);
            }}
            key={store.nid}
          />
        );
      })}
      {/* 만약 선택 시 가장 위에 올라오도록 만들어준다 => 그냥 새로 위에 다시 만드는 방법 선택 */}
      {currentStore && (
        <Marker
          map={map}
          coordinates={currentStore.coordinates}
          icon={generateStoreMarkerIcon(currentStore.season, true)}
          onClick={clearCurrentStore} //즉 다시 누르면 clear
          key={currentStore.nid}
        />
      )}
    </>
  );
};
export default Markers;

//아이콘 하나하나의 크기
const MARKER_HEIGHT = 64;
const MARKER_WIDTH = 54;

const NUMBER_OF_MARKER = 13; //13개의 아이콘
const SCALE = 2 / 3; //기존크기에 2/3정도로 만들어주기 위해서

const SCALED_MARKER_WIDTH = MARKER_WIDTH * SCALE;
const SCALED_MARKER_HEIGHT = MARKER_HEIGHT * SCALE;

export function generateStoreMarkerIcon(
  markerIndex: number,
  isSelected: boolean
): ImageIcon {
  /** https://navermaps.github.io/maps.js.ncp/docs/tutorial-8-marker-retina-sprite.example.html */
  return {
    url: isSelected ? 'images/markers-selected.png' : 'images/markers.png',
    size: new naver.maps.Size(SCALED_MARKER_WIDTH, SCALED_MARKER_HEIGHT),
    origin: new naver.maps.Point(SCALED_MARKER_WIDTH * markerIndex, 0), //몇번째 아이콘을 사용할것인지
    scaledSize: new naver.maps.Size(
      SCALED_MARKER_WIDTH * NUMBER_OF_MARKER,
      SCALED_MARKER_HEIGHT //2/3으로 줄인 크기의 아이콘배열들을 리사이징하기 위해서
    ),
  };
}
