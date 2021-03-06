import React, { Component } from 'react'
import sortBy from 'lodash-es/sortBy'
import range from 'lodash-es/range'
import './TimeLine.css'
import If from '../If'
import FA from 'react-fontawesome'

/**
 * @public
 * @param {Object} props
 * @param {Array} props.timing
 * timing: [
 *   {
 *    label: 'label dayo',
 *    start: 0,
 *    end: 10,
 *   },
 *   {
 *    label: 'label dayo',
 *    start: 20,
 *    end: 50,
 *   },
 * ]
 * @param {string} props.title
 * @reactProps {Array} timing
 * @reactProps {string} title
 * @example
 * <TimeLine timing={timing} title={title} />
 */
class TimeLine extends Component {

  get sortedTiming() {
    return sortBy(this.props.timing, ['start'])
  }

  get title() {
    return this.props.title || ''
  }

  /**
   * @type {Object}
   * @property {number} min
   * @property {number} max
   * @property {number} duration
   * @property {Array} scale
   */
  get range() {
    let min = this.props.timing.reduce((ret, {start}) => {
      if (ret > start) {
        ret = start
      }
      return ret
    }, 0)
    let max = this.props.timing.reduce((ret, {end}) => {
      if (ret < end) {
        ret = end
      }
      return ret
    }, 0)
    this.min = min
    this.max = max
    const digit = Math.log10(max - min) + 1 | 0
    let cardinal = 1
    switch(digit) {
      case 2:
        cardinal = 5
        break
      case 3:
        cardinal = 10
        break
      case 4:
        cardinal = 100
        break
      default:
        cardinal = 1
    }
    max += max % cardinal ? 2 * cardinal - (max % cardinal) : cardinal
    min -= min % cardinal
    // durationが 200以下なら10区切り 20以下なら1区切りとかでよさそう
    const scale = range(min, max + cardinal, cardinal)
    const duration = max - min
    return {min, max, duration, scale}
  }

  render() {
    const range = this.range
    const timing = this.sortedTiming
//    timing.splice(0, 0, {
//      label: 'Duration',
//      duration: this.max - this.min,
//      start: this.min,
//      end: this.max,
//    })
    return <div className="TimeLine">
      <div className="TimeLine-Title">
        <FA name="bar-chart" />
        <span>
          {this.title}
        </span>
      </div>
      <div className="TimeLine-Duration">
        <FA name="clock-o" />
        <span>
          {this.max - this.min}ms
        </span>
      </div>
      <div className="TimeLine-Content">
        <Graph range={range} timing={timing} />
        <RangeScale range={range} />
      </div>
    </div>
  }
}

function Graph({range, timing}) {
  return (
    <div>
      {
        timing.map(({label, start, end}) => {
          const duration = !end ? 0 : end - start
          const percentage = ((duration ? duration / range.duration : 0) * 100)
          const point = ((start ? start / range.duration : 0) * 100) + '%'
          return (
            <div key={label + duration} className="TimeLine-Timing">
              <span className="TimeLine-Timing__Spacer" style={{ width: point }}>
              </span>
              <span className={`TimeLine-Timing__Info ${duration ? '' : '--EmptyDuration'}`}
                style={{
                  width: percentage ? `${percentage}%` : null,
                }}
              >
                <span className="TimeLine-Timing__Label">
                  {label}
                </span>
                <span className="TimeLine-Timing__Duration">
                  {duration ? ` / ${duration}ms` : ''}
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
              </span>
            </div>
          )
        })
      }
    </div>
  )
}

function RangeScale({range}) {
  return (
    <div className="TimeLine-Range">
      {
        range.scale.map((scale) => {
          const point = (scale / range.duration) * 100
          const digit = Math.log10(scale) + 1 | 0
          const left = digit >= 2 ? `calc(${point}% - ${1 - 1 / digit}em)` : `calc(${point}% - 0.25em)`
          return (
            <div key={scale} className="TimeLine-Range__Scale" style={{left}}>{scale}</div>
          )
        })
      }
      {
        range.scale.map((scale) => {
          const left = (scale / range.duration * 100) + '%'
          return (
            <span key={scale} className="TimeLine-Range__Scale-Line" style={{left}}></span>
          )
        })
      }
    </div>
  )
}


export default TimeLine
