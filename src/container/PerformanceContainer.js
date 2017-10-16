import React from 'react'
import {isUndefined} from 'lodash-es'
import BrowserVersion from '../components/PerformanceList/BrowserVersion'
import OSVersion from '../components/PerformanceList/OSVersion'
import Timestamp from '../components/PerformanceList/Timestamp'
import TimeLine from '../components/Visualize/TimeLine'
import formatNavigationTiming from '../util/formatNavigationTiming'
import './PerformanceContainer.css'

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
  const timing = formatNavigationTiming(data)
  console.log(JSON.parse(JSON.stringify(data)))

  return (
    <div className="PerformanceContainer">
      <div className="PerformanceContainer-Env">
        <BrowserVersion browser={data.env.browser} />
        <OSVersion os={data.env.os} />
        <Timestamp date={data.date} />
      </div>
      <div className="PerformanceContainer-NavigationTiming">
        <TimeLine timing={timing} title={"Navigation Timing"} />
      </div>
    </div>
  )
}

export default PerformanceContainer
