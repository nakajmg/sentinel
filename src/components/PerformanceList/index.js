import React from 'react'
import Timestamp from './Timestamp'
import BrowserVersion from './BrowserVersion'
import OSVersion from './OSVersion'
import '../../App.css'

/**
 * @param {Object} props
 * @param {Object} props.items
 * @param {Object} props.router
 * @example
 * <PerformanceList items={items} router={router} />
 */
function PerformanceList({items, router}) {
  function navigate(item, e) {
    router.push({
      name: 'performance',
      params: {
        id: item.id
      },
      e
    })
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Browser</th>
          <th>OS</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {renderItems({items, navigate})}
      </tbody>
    </table>
  )
}

/**
 * @private
 * @param {Object} item
 */
/*
function navigate(item) {
  const {id, env} = item
  const browser = `${env.browser.name} ${env.browser.version}`
  const os = `${env.os.name} ${env.os.version}`
  const title = `${browser} / ${os}`
  window.history.pushState(item, title, `/performance/${id}`)
}
*/

function renderItems({items, navigate}) {
  return items.map((item) => {
    const {browser, os} = item.env
    const {date} = item
    return (
      <tr
        className='cursorPointer'
        key={item.id}
        onClick={(e) => {
          navigate(item, e)
        }}
      >
        <td>
          <BrowserVersion browser={browser} />
        </td>
        <td>
          <OSVersion os={os} />
        </td>
        <td>
          <Timestamp date={date} />
        </td>
      </tr>
    )
  })
}

export default PerformanceList
