import isUndefined from 'lodash-es/isUndefined'

/**
 * @param {Object} data
 * @return {Array | null}
 */
function formatNavigationTiming (data) {
  if (isUndefined(data) || isUndefined(data.navigationTiming)) return null

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
  } = data.navigationTiming

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

  return timing
}

export default formatNavigationTiming
