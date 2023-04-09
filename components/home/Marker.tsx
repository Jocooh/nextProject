import { useEffect } from 'react';
import type { Marker } from '../../types/map';

const Marker = ({ map, coordinates, icon, onClick }: Marker): null => {
  //mount시
  useEffect(() => {
    let marker: naver.maps.Marker | null = null;
    if (map) {
      /** 참고) 네이버마커클래스 이용 => https://navermaps.github.io/maps.js.ncp/docs/tutorial-2-Marker.html */
      marker = new naver.maps.Marker({
        map: map,
        position: new naver.maps.LatLng(...coordinates),
        icon,
      });
    }
    //만약 온클릭을 했다?
    if (onClick) {
      naver.maps.Event.addListener(marker, 'click', onClick);
    }

    return () => {
      marker?.setMap(null);
    };
  }, [map]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default Marker;
