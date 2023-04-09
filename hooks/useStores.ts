import { useCallback } from 'react';
import { Store } from '../types/store';
import { mutate } from 'swr';

export const STORE_KEY = '/stores';

const useStores = () => {
  const initializeStores = useCallback((stores: Store[]) => {
    //새로운 store를 인자로 받아
    mutate(STORE_KEY, stores); // 그데이터를 '/stores'에다가 전역상태로 저장
  }, []);

  return {
    initializeStores,
  };
};
export default useStores;
