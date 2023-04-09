import { Fragment, useEffect } from 'react';
import Header from '../components/common/Header';
import styles from '../styles/header.module.scss';
import Link from 'next/link';
import { VscFeedback } from 'react-icons/vsc';
import { AiOutlineShareAlt } from 'react-icons/ai';
import MapSection from '../components/home/MapSection';
import { Store } from '../types/store';
import useStores from '../hooks/useStores';
import { NextPage } from 'next';

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
      <Header
        rightElements={[
          <button
            onClick={() => {
              alert('복사!');
            }}
            className={styles.box}
            style={{ marginRight: 8 }}
            key="button"
          >
            <AiOutlineShareAlt size={20} />
          </button>,
          <Link href="/feedback" className={styles.box} key="link">
            <VscFeedback size={20} />
          </Link>,
        ]}
      />
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
