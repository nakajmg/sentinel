import React, { Component } from 'react'
import sortBy from 'lodash-es/sortBy'
import range from 'lodash-es/range'
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
    const digit = Math.log10(max - min) + 1 | 0
    let cardinal = 1
    switch(digit) {
      case 2:
        cardinal = 5
        max += max % cardinal ? 2 * cardinal - (max % cardinal) : cardinal
        min -= min % cardinal
        break
      case 3:
        cardinal = 10
        max += max % cardinal ? 2 * cardinal - (max % cardinal) : cardinal
        min -= min % cardinal
        break
      case 4:
        cardinal = 100
        max += max % cardinal ? 2 * cardinal - (max % cardinal) : cardinal
        min -= min % cardinal
        break
    }
    // durationが 200以下なら10区切り 20以下なら1区切りとかでよさそう
    const scale = range(min, max + cardinal, cardinal)
    const duration = max - min
    return {min, max, duration, scale}
  }

  get color() {
    return {
      blue: 'rgba(60,182,227,.9)',
      green: 'rgba(154,202,39,.9)',
    }
  }

  render() {
    const range = this.range
    const color = this.color
    return <div className="TimeLine">
      <div className="TimeLine-Content">
        <div className="TimeLine-Title">{this.title}</div>
        <div>
        {
          this.sortedTiming.map(({label, start, end}) => {
          const duration = !end ? 0 : end - start
          const percentage = ((duration ? duration / range.duration : 0) * 100)
          const point = ((start ? start / range.duration : 0) * 100) + '%'
          return (
            <div key={label} className="TimeLine-Timing">
              <span style={{ width: point }}>
              </span>
              <span className="TimeLine-Timing__Info" style={{
                width: percentage ? `${percentage}%` : '4px',
                backgroundColor: duration ? color.green : color.blue,
                color: duration ? color.green : color.blue,
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
        </div>
        <div className="TimeLine-Range">
          {/*<div className="TimeLine-Range__Scale TimeLine-Range__Min">{range.min}</div>*/}
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
          {/*<div className="TimeLine-Range__Scale TimeLine-Range__Max">{range.max}</div>*/}

          {/*<div className="TimeLine-Range__Scale-Line TimeLine-Range__Min" style={{left: '0'}}></div>*/}
          {
            range.scale.map((scale) => {
              const point = (scale / range.duration * 100) + '%'
              return (
                <div key={scale} className="TimeLine-Range__Scale-Line" style={{left: point}}></div>
              )
            })
          }
          {/*<div className="TimeLine-Range__Scale-Line" style={{right: '0'}}></div>*/}
        </div>
      </div>
    </div>
  }
}

export default TimeLine
