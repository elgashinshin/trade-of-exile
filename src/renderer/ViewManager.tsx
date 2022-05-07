import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { useContext } from 'react';
import { observer } from 'mobx-react';
import App from './App';
import theme from './utils/theme';
import Notifications from './components/pages/Notifications';

const ViewManager = () => {
  return (

        <Routes>
          <Route path={'/alert'} element={<Notifications />} />
          <Route path={'/*'} element={<App />} />
        </Routes>
        );
};

export default observer(ViewManager);
