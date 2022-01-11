import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './app';
import reportWebVitals from './reportWebVitals';
import store from './redux/store/index';
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from './utils/web3React'
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

// const sagaMiddleware = createSagaMiddleware();
// const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));

// sagaMiddleware.run(rootSaga);
render(
  <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
    <App />
    </Web3ReactProvider>
  </Provider>,
  document.getElementById('root')
);
if (module.hot) { module.hot.accept(App); }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
