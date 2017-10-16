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
 * @example
 * <PerformanceContainer store={store} params={params} />
 */
function PerformanceContainer({store, params}) {
  const data = store.getPerformanceDataById(params)
  if (isUndefined(data)) return <div>no match id</div>
  console.log(JSON.parse(JSON.stringify(data)))

  return (
    <div>
      <div>
        <BrowserVersion browser={data.env.browser} />
        <OSVersion os={data.env.os} />
        <Timestamp date={data.date} />
      </div>
      <NavigationTimingChart data={data} />
    </div>
  )
}

export default PerformanceContainer
