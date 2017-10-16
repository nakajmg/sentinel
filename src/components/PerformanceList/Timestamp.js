import React from 'react'
import {format} from 'date-fns'
import FA from 'react-fontawesome'
import './Timestamp.css'

/**
 * @param {Object} props
 * @param {string} props.date - created date
 * @return {element}
 * @example
 * <TimeStamp date={data.date} />
 */
function Timestamp({date}) {
  const timestamp = format(date, 'YYYY/MM/DD hh:mm:ss')
  return (
    <span className="Timestamp">
      <FA name="clock-o" />
      <span className="Timestamp__Label">
        {timestamp}
      </span>
    </span>
  )
}

export default Timestamp
