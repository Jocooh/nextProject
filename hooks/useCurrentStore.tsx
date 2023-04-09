import { useCallback } from 'react';
import { mutate } from 'swr';
import type { Store } from '../types/store';

export const CURRENT_STORE_KEY = '/current-store';

//전역상태관리
const useCurrentStore = () => {
  const setCurrentStore = useCallback((store: Store) => {
    mutate(CURRENT_STORE_KEY, store);
  }, []);
  //새로운 store을 인자로 받아 swr에  mutate를 이용해 CURRENT_STORE_KEY공간에 store을 저장한다.

  const clearCurrentStore = useCallback(() => {
    mutate(CURRENT_STORE_KEY, null);
  }, []);
  //CURRENT_STORE_KEY을 null로 초기화한다.

  return {
    setCurrentStore,
    clearCurrentStore,
  };
};
export default useCurrentStore;
