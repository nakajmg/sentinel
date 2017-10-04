import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Timestamp from './Timestamp'
import BrowserVersion from './BrowserVersion'
import OSVersion from './OSVersion'
import '../../App.css'

/**
 * @param {Object} props
 * @param {Object} props.perfData
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
    <Table selectable={false} onCellClick={(rowNumber, columnNumber, e) => {
      const item = items[rowNumber]
      navigate(item, e)
    }}>
      <TableHeader displaySelectAll={false}>
        <TableRow selectable={true}>
          <TableHeaderColumn>Date</TableHeaderColumn>
          <TableHeaderColumn>Browser</TableHeaderColumn>
          <TableHeaderColumn>OS</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        displayRowCheckbox={false}
        stripedRows={true}
        showRowHover={true}
      >
        {renderItems({items, navigate})}
      </TableBody>
    </Table>
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
    return (
      <TableRow
        className='cursorPointer'
        key={item.id}
        hoverable={true}
      >
        <TableRowColumn>
          <Timestamp date={item.date}></Timestamp>
        </TableRowColumn>
        <TableRowColumn>
          <BrowserVersion browser={browser}></BrowserVersion>
        </TableRowColumn>
        <TableRowColumn>
          <OSVersion os={os}></OSVersion>
        </TableRowColumn>
      </TableRow>
    )
  })
}

export default PerformanceList
