import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Store from './store'
import {autorun} from 'mobx'
import {Provider} from 'mobx-react'
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'

const store = new Store()
window.store = store

const customTheme = {
  "tableRow": {
    "selectedColor": "#ffc400",
    "hoverColor": "#ffd600",
    "stripeColor": "rgba(255, 253, 231, 0.13)"
  },
  "tableHeaderColumn": {
    "textColor": "#ffd600"
  },
  "appBar": {
    "color": "#ffd600",
    "height": 50,
    "padding": 18
  }
}

function render() {
  ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme, customTheme)}>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>
    ,document.querySelector('#root'))
}
autorun(() => {
  if(!store.isInitialized) return
  render()
})


registerServiceWorker()
