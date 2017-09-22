import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {format} from 'date-fns'
import BrowserVersion from './BrowserVersion'
import OSVersion from './OSVersion'

/**
 * @param {Object} props
 * @param {Object} props.perfData
 */
export default function PerformanceList({items}) {
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
            const date = format(item.date, 'YYYY-MM-DD hh:mm:ss')
            const {browser, os} = item.env
            return <TableRow key={item.id} onMouseDown={e => {console.log(item)}}>
              <TableRowColumn>{date}</TableRowColumn>
              <TableRowColumn>
                <BrowserVersion name={browser.name} version={browser.version}></BrowserVersion>
              </TableRowColumn>
              <TableRowColumn>
                <OSVersion name={os.name} version={os.version}></OSVersion>
              </TableRowColumn>
            </TableRow>
          })
        }
      </TableBody>
    </Table>
  )
}
