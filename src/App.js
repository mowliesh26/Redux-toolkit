import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './slice/store';
import LoginPage from './compo/LoginPage';
import FormPage from './compo/FormPage';
import CardPage from './compo/Cardpage';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            
            <Route path="/" element={<LoginPage />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/cards" element={<CardPage />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
