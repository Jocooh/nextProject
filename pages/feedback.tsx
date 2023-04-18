import { Fragment } from 'react';
import Header from '../components/common/Header';
import { NextSeo } from 'next-seo';

export default function Feedback() {
  return (
    <Fragment>
      {/* 각페이지마다 들어가면 브라우저의 title이 바뀌는 것을 확인가능 */}
      <NextSeo
        title="피드백"
        description="매장 지도 서비스에 대한 피드백을 받습니다."
      />
      <Header />
      <main></main>
    </Fragment>
  );
}
