import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './containers/common/App/App';
import reportWebVitals from './reportWebVitals';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter as Browser } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@/shared/themes/defaultTheme';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Browser>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={defaultTheme}>
          <Provider store={store}>
            <App />
          </Provider>
        </ThemeProvider>
      </I18nextProvider>
    </Browser>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
