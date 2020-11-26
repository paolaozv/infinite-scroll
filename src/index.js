import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import AppUseCallback from './AppUseCallback';
import AppWithApi from './AppWithApi';
import { AppProvider } from './context';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <AppWithApi />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
