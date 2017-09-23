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

/**
 * @param {Object} props
 * @param {Object} props.perfData
 */
function PerformanceList({items}) {
  return (
    <Table selectable={false}>
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
      >
        {
          items.map((item) => {
            const {browser, os} = item.env
            return <TableRow key={item.id} onMouseDown={e => {navigate(item)}}>
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
          })
        }
      </TableBody>
    </Table>
  )
}

/**
 * @private
 * @param {Object} item
 */
function navigate(item) {
  const {id, env} = item
  const browser = `${env.browser.name} ${env.browser.version}`
  const os = `${env.os.name} ${env.os.version}`
  const title = `${browser} / ${os}`
  window.history.pushState(item, title, `/performance/${id}`)
}

export default PerformanceList
