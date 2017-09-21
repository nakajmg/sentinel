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

export default function PerformanceList({perfData}) {
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
          perfData.map((data) => {
            const date = format(data.date, 'YYYY-MM-DD hh:mm:ss')
            const {browser, os} = data.env
            return <TableRow key={data.id} onMouseDown={e => {console.log(data)}}>
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
