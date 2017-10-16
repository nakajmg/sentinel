import React from 'react'
import {format} from 'date-fns'

/**
 * @param {Object} props
 * @param {string} props.date - created date
 * @return {element}
 */
function Timestamp({date}) {
  const timestamp = format(date, 'YYYY/MM/DD hh:mm:ss')
  return (
    <span>
      {timestamp}
    </span>
  )
}

export default Timestamp
