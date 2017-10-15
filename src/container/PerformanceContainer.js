import React from 'react'
import {isUndefined} from 'lodash-es'
import BrowserVersion from '../components/PerformanceList/BrowserVersion'
import OSVersion from '../components/PerformanceList/OSVersion'
import Timestamp from '../components/PerformanceList/Timestamp'
import NavigationTimingChart from '../components/Visualize/NavigationTimingChart'

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
        backgroundColor: '#333',
        color: '#fff',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        fontSize: '14px',
        padding: '10px',
      }}>
        <BrowserVersion browser={data.env.browser}></BrowserVersion>
        <OSVersion os={data.env.os}></OSVersion>
      </div>
      <NavigationTimingChart data={data}></NavigationTimingChart>
    </div>
  )
}

export default PerformanceContainer
