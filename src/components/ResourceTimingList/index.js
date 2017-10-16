import React from 'react'

function ResourceTimingList({resource}) {
  if (!resource) return null

  return (
    <div>
      {
        resource.map(timing => {
          return <div key={timing.name + Math.round(timing.startTime)}>{timing.name}</div>
        })
      }
    </div>
  )
}
/*
function formatResourceTiming(data) {
  const {
    name,
    entryType,
    startTime,
    duration,
    initiatorType,
    nextHopProtocol,
    workerStart,
    redirectStart,
    redirectEnd,
    fetchStart,
    domainLookupStart,
    domainLookupEnd,
    connectStart,
    connectEnd,
    secureConnectionStart,
    requestStart,
    responseStart,
    responseEnd,
    transferSize,
    encodedBodySize,
    decodedBodySize,
    serverTiming,
    connect
  } = data

  const timing = [
    {
      label: 'Duration',
      duration: duration,
      start: startTime - startTime,
      end: responseEnd - startTime,
    },
    {
      label: 'Redirect',
      duration: redirectEnd - redirectStart,
      start: redirectStart - startTime,
      end: redirectEnd - startTime,
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
*/

export default ResourceTimingList
