import React from 'react'
import ReactHighcharts from 'react-highcharts'
import HighchartsMore from 'highcharts/highcharts-more'
import {
  isUndefined,
  map,
  sortBy
} from 'lodash-es'

HighchartsMore(ReactHighcharts.Highcharts)

function TimingChart({data}) {
  if (isUndefined(data.timing)) return <div>timingなし</div>

  const {
    navigationStart,
    unloadEventStart,
    unloadEventEnd,
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
    domLoading,
    domInteractive,
    domContentLoadedEventStart,
    domContentLoadedEventEnd,
    domComplete,
    loadEventStart,
    loadEventEnd
  } = data.timing
  const timing = [
    {
      label: 'DOMContentLoaded',
      start: domContentLoadedEventStart - navigationStart,
      duration: domContentLoadedEventEnd - domContentLoadedEventStart
    },
    {
      label: 'loadEvent',
      start: loadEventStart - navigationStart,
      duration: loadEventEnd - loadEventStart
    },
    {
      label: 'DOMLoad',
      start: domLoading - navigationStart,
      duration: domComplete - domLoading
    },
    {
      label: 'DomainLookup',
      start: domainLookupStart - navigationStart,
      duration: domainLookupEnd - domainLookupStart
    },
    {
      label: 'Response',
      start: responseStart - navigationStart,
      duration: responseEnd - responseStart
    },
    {
      label: 'Connection',
      start: connectStart - navigationStart,
      duration: connectEnd - connectStart
    }
  ]

  const sorted = sortBy(timing, ['start'])

  const categories = map(sorted, ({label}) => label)
  const seriesData = map(sorted, ({start, duration}) => {
    return [start, start + duration]
  })
  const config = {
    chart: {
      type: 'columnrange',
      inverted: true
    },

    title: {
      text: 'Navigation Timing TimeLine'
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
          <span>Start   : <b>${low}ms</b></span><br>
          <span>End     : <b>${high}ms</b></span><br>
          <span>Duration: <b>${high-low}ms</b></span>
        </div>`
      }
    },

    plotOptions: {
      columnrange: {
        dataLabels: {
          enabled: true,
          formatter() {
            const {high, low} = this.point
            if (high - low === 0) return ''
            if (this.y === high) {
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
