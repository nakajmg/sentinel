import React, { Component } from 'react'
import sortBy from 'lodash-es/sortBy'
import './TimeLine.css'
import If from '../If'

//new TimeLine({
//  title: 'timeline',
//  range: {
//    min: 0,
//    max: 100,
//  },
//  timing: [
//    {
//      label: 'label dayo',
//      start: 0,
//      end: 10,
//    },
//    {
//      label: 'label dayo',
//      start: 20,
//      end: 50,
//    },
//  ]
//})

class TimeLine extends Component {

  get sortedTiming() {
    return sortBy(this.props.timing, ['start'])
  }

  get title() {
    return this.props.title || ''
  }

  get range() {
    const min = 0
    const max = this.props.timing.reduce((ret, {end}) => {
      if (ret < end) {
        ret = end
      }
      return ret
    }, 0) + 15
    const duration = max - min
    return {min, max, duration}
  }

  render() {
    return <div className="TimeLine">
      <div className="TimeLine-Title">{this.title}</div>
      {
        this.sortedTiming.map(({label, start, end}) => {
        const duration = !end ? 0 : end - start
        const percentage = Math.round((duration ? duration / this.range.duration : 0) * 100)
        const point = Math.round((start ? start / this.range.duration : 0) * 100) + '%'
        return (
          <div key={label} className="TimeLine-Timing">
            <span style={{ width: point }}>
            </span>
            <span className="TimeLine-Timing__Info" style={{
              width: percentage ? `${percentage}%` : '4px',
              backgroundColor: duration ? 'RGBA(154,202,39,1)' : 'RGBA(60,182,227,1)',
              color: duration ? 'RGBA(154,202,39,.9)' : 'RGBA(60,182,227,.9)',
            }}>
              <span className="TimeLine-Timing__Duration">
                {duration ? `${duration}ms` : ''}
              </span>
              <div className="TimeLine-Timing__Detail">
                <div className="TimeLine-Timing__Detail-Content">
                  <If if={duration}>
                    <div>Duration: {duration}ms</div>
                  </If>
                  <div>Start: {start}ms</div>
                  <If if={end}>
                    <div>End: {end}ms</div>
                  </If>
                </div>
              </div>
              <span className="TimeLine-Timing__Label">
                {label}
              </span>
            </span>
          </div>
        )
        })
      }
      <div className="TimeLine-Range">
        <div className="TimeLine-Range__Min">{this.range.min}</div>
        <div className="TimeLine-Range__Max">{this.range.max}</div>
      </div>
    </div>
  }
}

export default TimeLine
