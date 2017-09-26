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

  const {
    navigationStart,
    unloadEventStart,
    unloadEventEnd,
    redirectStart,
    redirectEnd,
    domainLookupStart,
    domainLookupEnd,
    connectStart,
    connectEnd,
    responseStart,
    responseEnd,
    domLoading,
    domContentLoadedEventStart,
    domContentLoadedEventEnd,
    domComplete,
    loadEventStart,
    loadEventEnd,
    fetchStart,
    secureConnectionStart,
    requestStart,
    domInteractive
  } = data.timing
  const timing = [
    {
      label: 'DOMContentLoaded',
      start: domContentLoadedEventStart - navigationStart,
      end: domContentLoadedEventEnd - navigationStart,
      duration: domContentLoadedEventEnd - domContentLoadedEventStart
    },
    {
      label: 'LoadEvent',
      start: loadEventStart - navigationStart,
      end: loadEventEnd - navigationStart,
      duration: loadEventEnd - loadEventStart
    },
    {
      label: 'DOMLoading',
      start: domLoading - navigationStart,
      end: domComplete - navigationStart,
      duration: domComplete - domLoading
    },
    {
      label: 'DomainLookup',
      start: domainLookupStart - navigationStart,
      end: domainLookupEnd - navigationStart,
      duration: domainLookupEnd - domainLookupStart
    },
    {
      label: 'Response',
      start: responseStart - navigationStart,
      end: responseEnd - navigationStart,
      duration: responseEnd - responseStart
    },
    {
      label: 'Connect',
      start: connectStart - navigationStart,
      end: connectEnd - navigationStart,
      duration: connectEnd - connectStart
    },
    {
      label: 'Unload',
      start: unloadEventStart - navigationStart,
      end: unloadEventEnd - navigationStart,
      duration: unloadEventEnd - unloadEventStart
    },
    {
      label: 'Redirect',
      start: redirectStart ? redirectStart - navigationStart : 0,
      end: redirectEnd ? redirectEnd - navigationStart : 0,
      duration: redirectEnd - redirectStart
    },
    {
      label: 'FetchStart',
      start: fetchStart - navigationStart,
      end: null,
      duration: null
    },
    {
      label: 'SecureConnectionStart',
      start: secureConnectionStart ? secureConnectionStart - navigationStart : 0,
      end: null,
      duration: null
    },
    {
      label: 'RequestStart',
      start: requestStart - navigationStart,
      end: null,
      duration: null
    },
    {
      label: 'DOMInteractive',
      start: domInteractive - navigationStart,
      end: null,
      duration: null
    }
  ]

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
      <TimingChart timing={timing}></TimingChart>
    </div>
  )
}

export default PerformanceContainer
