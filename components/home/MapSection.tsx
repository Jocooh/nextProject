import Map from './Map';
import type { NaverMap } from '../../types/map';
import useMap, { INITIAL_CENTER, INITIAL_ZOOM } from '@/hooks/useMap';
import Markers from './Markers';
import useCurrentStore from '@/hooks/useCurrentStore';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import type { Coordinates } from '../../types/store';

const MapSection = () => {
  //url쿼리로부터 zoom과center값을 받는다.
  const router = useRouter();
  //router의 asPath를 사용
  //참고)https://developer.mozilla.org/ko/docs/Web/API/URLSearchParams
  const query = useMemo(() => new URLSearchParams(router.asPath.slice(1)), []);
  // console.log('router.asPath', router.asPath); /?zoom=10&lat=37.5262411&lng=126.99289439
  const initialZoom = useMemo(
    () => (query.get('zoom') ? Number(query.get('zoom')) : INITIAL_ZOOM),
    [query]
  );
  const initialCenter = useMemo<Coordinates>(
    () =>
      query.get('lat') && query.get('lng')
        ? [Number(query.get('lat')), Number(query.get('lng'))]
        : INITIAL_CENTER,
    [query]
  );

  //onLoadMap
  const { initializeMap } = useMap();
  const { clearCurrentStore } = useCurrentStore();
  //swr를 이용하여 map을 전역상태로 관리한다.
  const onLoadMap = (map: NaverMap) => {
    initializeMap(map); //map이 함수로 인해서 전역객체가 됨
    naver.maps.Event.addListener(map, 'click', clearCurrentStore); //map이 클릭됬을때 clear함수 실행
  };
  return (
    <>
      <Map
        onLoad={onLoadMap}
        initialCenter={initialCenter}
        initialZoom={initialZoom}
      />
      <Markers />
    </>
  );
};
export default MapSection;
