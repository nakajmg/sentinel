import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
import {propTypes} from './store'
import RouterView from './router/RouterView'
import FA from 'react-fontawesome'
import './App.css'

/**
 * App
 */
@inject('store')
@observer
class App extends Component {
  /**
   * @return {element} <div>
   */
  render() {
    return (
      <div className="App-Container">
        <div className="App-Header" title="SENTINEL">
          <a className="App-HeaderLink"
            onClick={() => {
            this.props.store.router.push('/')
          }}>
            <FA name="line-chart" />
            <span>
              SENTINEL
            </span>
          </a>
        </div>
        <RouterView className="RouterView"></RouterView>
      </div>
    )
  }
}



App.propTypes = propTypes

export default App
