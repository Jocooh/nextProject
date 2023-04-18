import React, { useCallback } from 'react';
import Header from '../common/Header';
import { VscFeedback } from 'react-icons/vsc';
import copy from 'copy-to-clipboard';
import { AiOutlineShareAlt } from 'react-icons/ai';
import styles from '../../styles/header.module.scss';
import Link from 'next/link';
import useMap from '@/hooks/useMap';
import { useRouter } from 'next/router';

function HomeHeader() {
  const { resetMapOptions, getMapOptions } = useMap();
  //url변경을 위해서
  const router = useRouter();

  const replaceAndCopyUrl = useCallback(() => {
    //공유하기 버튼을 누르면 map의Options 복사함
    const mapOptions = getMapOptions();
    //복사한 options를 querystring으로 만들어준다.
    const query = `/?zoom=${mapOptions.zoom}&lat=${mapOptions.center[0]}&lng=${mapOptions.center[1]}`;

    router.replace(query); //url query를 해당 query로 대체
    copy(location.origin + query); //location의 origin과 query를 더해 => 현재url을 copy한다.
  }, [router, getMapOptions]);

  return (
    <Header
      onClickLogo={resetMapOptions}
      rightElements={[
        <button
          onClick={replaceAndCopyUrl}
          className={styles.box}
          style={{ marginRight: 8 }}
          aria-label="현재 위치 클립보드 복사"
          key="button"
        >
          <AiOutlineShareAlt size={20} />
        </button>,
        <Link
          href="/feedback"
          className={styles.box}
          aria-label="피드백 페이지로 이동"
          key="link"
        >
          <VscFeedback size={20} />
        </Link>,
      ]}
    />
  );
}

export default HomeHeader;
