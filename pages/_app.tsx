import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import SEO from '../seo.config';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* config내용을 props로 내림 */}
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  );
}
