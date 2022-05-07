import { useContext } from 'react';
import { Store } from 'renderer/providers/AppProvider';

export const useStore = () => {
  const store = useContext(Store);
  return store;
};
