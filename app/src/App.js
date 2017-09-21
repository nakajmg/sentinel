import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
import {propTypes} from './store'

/**
 * this is App class
 */
@inject('store')
@observer
class App extends Component {
  /**
   * @return <div>
   */
  render() {
    return (
      <div className="App">
        <PerfDataList perfData={this.props.store.perfData}></PerfDataList>
      </div>
    )
  }
}

/**
 * this is data list component
 */
function PerfDataList({perfData}) {
  return (
    <ul>{
      perfData.map((data) => {
        return <li key={data.id}>{data.id}</li>
      })
    }</ul>
  )
}

App.propTypes = propTypes

export default App
