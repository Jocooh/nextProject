import Map from './Map';
import type { NaverMap } from '../../types/map';
import useMap from '@/hooks/useMap';
import Markers from './Markers';
import useCurrentStore from '@/hooks/useCurrentStore';

const MapSection = () => {
  const { initializeMap } = useMap();
  const { clearCurrentStore } = useCurrentStore();

  //swr를 이용하여 map을 전역상태로 관리한다.
  const onLoadMap = (map: NaverMap) => {
    initializeMap(map); //map이 함수로 인해서 전역객체가 됨
    naver.maps.Event.addListener(map, 'click', clearCurrentStore); //map이 클릭됬을때 clear함수 실행
  };
  return (
    <>
      <Map onLoad={onLoadMap} />
      <Markers />
    </>
  );
};
export default MapSection;
