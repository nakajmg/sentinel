import React from 'react'
import {isUndefined} from 'lodash-es'
import BrowserVersion from '../components/PerformanceList/BrowserVersion'
import OSVersion from '../components/PerformanceList/OSVersion'
import Timestamp from '../components/PerformanceList/Timestamp'
import TimeLine from '../components/Visualize/TimeLine'
import ResourceTimingList from '../components/ResourceTimingList'
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
  const style = {
    backgroundColor: '#434857',
    padding: '0.5em',
  }
  return (
    <div className="PerformanceContainer GridContainer">
      <div className="PerformanceContainer-Env GridItem-Column2">
        <BrowserVersion style={style} browser={data.env.browser} />
        <OSVersion style={style} os={data.env.os} />
        <Timestamp style={style} date={data.date} />
      </div>
      <div className="PerformanceContainer-NavigationTiming GridItem-Column1">
        <div className="SwitchData">
          <button className="SwitchData-Button">Navigation</button>
          <button className="SwitchData-Button">Resource</button>
        </div>
        <div className="SwitchData-Container">
          <TimeLine timing={timing} title={"Navigation Timing"} />
          <ResourceTimingList resource={data.resource} />
        </div>
      </div>
    </div>
  )
}

export default PerformanceContainer
