import React from 'react'
import {isUndefined} from 'lodash-es'
import BrowserVersion from '../components/PerformanceList/BrowserVersion'
import OSVersion from '../components/PerformanceList/OSVersion'
import Timestamp from '../components/PerformanceList/Timestamp'
import TimingChart from '../components/Visualize/TimingChart'

/**
 * @param {Object} props
 * @param {Store} props.store
 * @param {Object} props.params
 */
function PerformanceContainer({store, params}) {
  const data = store.getPerformanceDataById(params)
  if (isUndefined(data)) return <div>no match id</div>
  console.log(JSON.parse(JSON.stringify(data)))
  return (
    <div>
      <div style={{
        backgroundColor: 'white',
        color: 'black',
        textAlign: 'center'
      }}>
        <Timestamp date={data.date}></Timestamp>
        <BrowserVersion browser={data.env.browser}></BrowserVersion>
        <OSVersion os={data.env.os}></OSVersion>
      </div>
      <TimingChart data={data}></TimingChart>
    </div>
  )
}

export default PerformanceContainer
