import React from 'react'
import Timestamp from './Timestamp'
import BrowserVersion from './BrowserVersion'
import OSVersion from './OSVersion'
import '../../App.css'
import './PerformanceList.css'

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
    <div className="PerformanceList">
      {/*<div className="PerformanceList-Title">PerformanceList</div>*/}
      <table className="PerformanceList-Table">
        <thead>
          <tr className="PerformanceList-TableRow">
            <th>Browser</th>
            <th>OS</th>
            <th>Navigation</th>
            <th>Resource</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody className="PerformanceList-TableBody">
          {renderItems({items, navigate})}
        </tbody>
      </table>
    </div>
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
        className='PerformanceList-TableRow'
        key={item.id}
        onClick={(e) => {
          navigate(item, e)
        }}
      >
        <td className="PerformanceList-TableData">
          <BrowserVersion browser={browser} />
        </td>
        <td className="PerformanceList-TableData">
          <OSVersion os={os} />
        </td>
        <td className="PerformanceList-TableData" style={{fontSize: '0.8em'}}>
          <span>
            {item.timing.loadEventEnd - item.timing.navigationStart}ms
          </span>
        </td>
        <td className="PerformanceList-TableData" style={{fontSize: '0.8em'}}>
          <span>
            {item.resource ? `x ${item.resource.length}` : '-'}
          </span>
        </td>
        <td className="PerformanceList-TableData">
          <Timestamp date={date} />
        </td>
      </tr>
    )
  })
}

export default PerformanceList
