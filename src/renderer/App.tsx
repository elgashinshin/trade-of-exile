import { AppProvider } from './providers/AppProvider';
import { AppRoutes } from './routes';
import './App.css';

const App = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};

export default App;
