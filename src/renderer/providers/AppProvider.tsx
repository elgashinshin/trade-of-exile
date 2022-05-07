import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import theme from 'renderer/lib/chakra';
import { queryClient } from 'renderer/lib/react-query';
import RootStore from 'renderer/stores/RootStore';

export const Store = React.createContext(new RootStore());
export const AppProvider: React.FC = ({ children }) => {
  return (
    <React.Suspense fallback={<div>...Loading</div>}>
      <Store.Provider value={new RootStore()}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ChakraProvider theme={theme}>{children}</ChakraProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </Store.Provider>
    </React.Suspense>
  );
};
