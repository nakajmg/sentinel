import React from 'react'
import {
  isUndefined
} from 'lodash-es'
import TimeLine from './TimeLine'
import formatNavigationTiming from '../../util/formatNavigationTiming'

function TimingChart({data}) {
  if (isUndefined(data) || isUndefined(data.navigationTiming)) return <div>timingなし</div>

  const timing = formatNavigationTiming(data)

  return (
    <div style={{padding: '10px'}}>
      <TimeLine timing={timing} title={"Navigation Timing"}></TimeLine>
    </div>
  )
}

export default TimingChart
