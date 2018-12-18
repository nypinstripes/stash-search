import './styles/main.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';

const renderApp = () => {
  ReactDOM.render(
    <BrowserRouter component={App}>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
    document.getElementById('app-container')
  );
};
renderApp();
