import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Store from './store'

import {Provider} from 'mobx-react'


const store = new Store()
window.store = store

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
    ,document.querySelector('#root'))
}
render()

registerServiceWorker()
