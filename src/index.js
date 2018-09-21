import React from 'react';
import ReactDOM from 'react-dom';
import './build/styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(React.createElement(App), document.getElementById('root'));
registerServiceWorker();
