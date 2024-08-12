import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './copmonents/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import {configureStore} from "./services/store";

const store = configureStore({});
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
