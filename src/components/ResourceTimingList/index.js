import React from 'react'
import TimeLine from '../Visualize/TimeLine'
import formatResourceTiming from '../../util/formatResourceTiming'

function ResourceTimingList({resource}) {
  if (!resource) return null
  return (
    <div>
      {
        resource.map(resource => {
          const {timing, name} = formatResourceTiming(resource)
          return (
            <div key={name + Math.round(resource.startTime)} style={{marginBottom: '10px'}}>
              <TimeLine timing={timing} title={name}/>
            </div>
          )
        })
      }
    </div>
  )
}

export default ResourceTimingList
