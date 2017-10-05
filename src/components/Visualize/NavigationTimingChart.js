import React from 'react'
import ReactHighcharts from 'react-highcharts'
import HighchartsMore from 'highcharts/highcharts-more'
import {
  isUndefined,
  map,
  sortBy,
  filter
} from 'lodash-es'

HighchartsMore(ReactHighcharts.Highcharts)

function TimingChart({data}) {
  if (isUndefined(data) || isUndefined(data.timing)) return <div>timingなし</div>

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

  // endがないやつを省いてstartの時間でソート
  const sorted = sortBy(filter(timing, ({end}) => end), ['start'])
  const categories = map(sorted, ({label}) => label)
  const seriesData = map(sorted, ({start, duration}) => {
    return [start, start + duration]
  })
  const config = {
    chart: {
      type: 'columnrange',
      inverted: true,
      height: 250
    },

    title: {
      text: 'Navigation Timing'
    },

    xAxis: {
      categories
    },

    yAxis: {
      title: {
        text: 'ms'
      },
      min: 0
    },

    tooltip: {
      valueSuffix: 'ms',
      formatter() {
        const {high, low} = this.point
        return `<div>
          <b>${this.x}</b><br>
          <span>Duration: <b>${high-low}ms</b></span><br>
          <span>Start   : <b>${low}ms</b></span><br>
          <span>End     : <b>${high}ms</b></span>
        </div>`
      }
    },

    plotOptions: {
      columnrange: {
        dataLabels: {
          enabled: true,
          formatter({align}) {
            const {high, low} = this.point
            if (high - low === 0 && align === 'right') {
              return `<div style="color: ${this.color}">◆</div>`
            }
            if (this.y === high && high - low !== 0) {
              return `${high - low}ms`
            }
            else {
              return ''
            }
          }
        }
      }
    },

    legend: {
      enabled: false
    },

    series: [{
      name: 'Duration',
      data: seriesData
    }]
  }

  return (
    <div>
      <ReactHighcharts config={config}></ReactHighcharts>
    </div>
  )
}

export default TimingChart
