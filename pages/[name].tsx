import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Store } from '@/types/store';
import styles from '../../styles/detail.module.scss';
import DetailHeader from '@/components/home/DetailHeader';
import DetailContent from '@/components/home/DetailContent';

interface Props {
  store: Store;
}

const StoreDetail: NextPage<Props> = ({ store }) => {
  const expanded = true;
  return (
    <div
      className={`${styles.detailSection} ${styles.expanded} ${styles.selected} `}
    >
      <DetailHeader
        currentStore={store}
        expanded={expanded}
        onClickArrow={() => null}
      />
      <DetailContent currentStore={store} expanded={expanded} />
    </div>
  );
};

//[name]이라는 자리에 어떤 것이 올껀지 정해줘야한다. =>getStaticPaths
export const getStaticPaths: GetStaticPaths = async () => {
  const stores = (await import('../public/stores.json')).default;
  const paths = stores.map((store) => ({ params: { name: store.name } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const stores = (await import('../public/stores.json')).default;
  const store = stores.find((store) => store.name === params?.name);

  return { props: { store } };
};
