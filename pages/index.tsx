import { Fragment, useEffect } from 'react';
import MapSection from '../components/home/MapSection';
import { Store } from '../types/store';
import useStores from '../hooks/useStores';
import { NextPage } from 'next';
import HomeHeader from '@/components/home/Header';

interface Props {
  stores: Store[];
}
const Home: NextPage<Props> = ({ stores }) => {
  // console.log(stores);  매장 불러오기 확인
  const { initializeStores } = useStores();

  useEffect(() => {
    initializeStores(stores); //jsonData가 여기
  }, [initializeStores, stores]);

  return (
    <Fragment>
      <HomeHeader />
      <main style={{ width: '100%', height: '100%' }}>
        <MapSection />
      </main>
    </Fragment>
  );
};
export default Home;

export async function getStaticProps() {
  //routes이용해서 가져와보기
  const stores = (await import('../public/stores.json')).default;

  return {
    props: { stores },
    revalidate: 60 * 60,
  };
}
