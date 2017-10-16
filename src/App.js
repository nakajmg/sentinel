import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
import {propTypes} from './store'
import RouterView from './router/RouterView'
import FA from 'react-fontawesome'

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
      <div>
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
        <RouterView></RouterView>
      </div>
    )
  }
}



App.propTypes = propTypes

export default App
