import React, { Component } from 'react'
import {
  sortBy,
  map,
  reduce
} from 'lodash-es'
import {
  format,
  differenceInMilliseconds
} from 'date-fns'

export default class ItemList extends Component {
  render() {
    return (
      <div>
        <ul>{renderItems(this.props.list)}</ul>
      </div>
    )
  }
}

function renderItems(items) {
  return items.map((item) => {
    const navStart = item['navigationStart']
    const arr = map(item, (value, key) => {
      return {key, value}
    })
    const sorted = sortBy(arr, item => item.value)
    return <li key={item.id}>
      {item.id}
      <ul>{
        map(sorted, ({key, value}) => {
          if (key === 'id') return ''
          return <li key={key}>
            {key}: {
            value === navStart ? 0 :
              value === 0 ? '-' : format(differenceInMilliseconds(value, navStart), 'mm:ss:SSS')
          }
          </li>
        })
      }</ul>
    </li>
  })
}
