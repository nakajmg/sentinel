import React from 'react'
import TimeLine from '../Visualize/TimeLine'

function ResourceTimingList({resource}) {
  if (!resource) return null
  const graphs = resource.map(resource => {
    const {timing, name} = formatResourceTiming(resource)
    return (
      <div key={name + Math.round(resource.startTime)}>
        <TimeLine timing={timing} title={name} />
      </div>
    )
  })

  return (
    <div>
      {graphs}
    </div>
  )
}

function formatResourceTiming(data) {
  const {
    name,
//    entryType,
    startTime,
//    duration,
//    initiatorType,
//    nextHopProtocol,
//    workerStart,
    redirectStart,
    redirectEnd,
//    fetchStart,
    domainLookupStart,
    domainLookupEnd,
    connectStart,
    connectEnd,
//    secureConnectionStart,
    requestStart,
    responseStart,
    responseEnd,
//    transferSize,
//    encodedBodySize,
//    decodedBodySize,
//    serverTiming,
//    connect
  } = data

  const timing = [
    {
      label: 'Redirect',
      duration: redirectEnd - redirectStart,
      start: redirectStart ? redirectStart - startTime : 0,
      end: redirectEnd ? redirectEnd - startTime : 0,
    },
    {
      label: 'DomainLookUp',
      duration: domainLookupEnd - domainLookupStart,
      start: domainLookupStart - startTime,
      end: domainLookupEnd - startTime,
    },
    {
      label: 'Connect',
      duration: connectEnd - connectStart,
      start: connectStart - startTime,
      end: connectEnd - startTime,
    },
    {
      label: 'Response',
      duration: responseEnd - responseStart,
      start: responseStart - startTime,
      end: responseEnd - startTime,
    },
    {
      label: 'Request',
      duration: responseStart - requestStart,
      start: requestStart - startTime,
      end: responseStart - startTime,
    },
  ]

  return {timing, name}
}

export default ResourceTimingList
