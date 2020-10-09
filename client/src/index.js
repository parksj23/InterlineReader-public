import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@openfonts/nanum-gothic_korean'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(<CookiesProvider><App /></CookiesProvider>, document.getElementById('root'));
registerServiceWorker();
