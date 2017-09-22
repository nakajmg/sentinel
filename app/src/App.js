import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
import {propTypes} from './store'
import {AppBar} from 'material-ui'
import {grey800} from 'material-ui/styles/colors'
import PerformanceList from './components/PerformanceList'
import RouterView from './RouterView'

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
      <div style={{
        backgroundColor: grey800,
        height: '100vh'
      }}>
        <AppBar
          title="SENTINEL"
          showMenuIconButton={false}
        />
        {/*
        <PerformanceList items={this.props.store.perfData}></PerformanceList>
        <button onClick={this.props.store.updatePerfData}>reload</button>
        */}
        <RouterView></RouterView>
      </div>
    )
  }
}



App.propTypes = propTypes

export default App
