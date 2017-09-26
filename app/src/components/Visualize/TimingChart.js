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

function TimingChart({timing}) {
  if (isUndefined(timing)) return <div>timingなし</div>

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
