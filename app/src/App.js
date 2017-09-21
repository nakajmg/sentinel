import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
import {propTypes} from './store'
import {format} from 'date-fns'
import {AppBar} from 'material-ui'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

/**
 * this is App class
 */
@inject('store')
@observer
class App extends Component {
  /**
   * @return <div>
   */
  render() {
    return (
      <div className="App">
        <AppBar
          title="SENTINEL"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <PerfDataList perfData={this.props.store.perfData}></PerfDataList>
      </div>
    )
  }
}

/**
 * this is data list component
 */
function PerfDataList1({perfData}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Browser</th>
          <th>OS</th>
        </tr>
      </thead>
      <tbody>
      {
        perfData.map((data) => {
          const date = format(data.date, 'YYYY-MM-DD hh:mm:ss')
          const {browser, os} = data.env
          return <tr key={data.id}>
            <td>{date}</td>
            <td>{`${browser.name} / ${browser.version}`}</td>
            <td>{`${os.name} / ${os.version}`}</td>
          </tr>
        })
      }
      </tbody>
    </table>
  )
}
/**
 * this is data list component
 */
function PerfDataList({perfData}) {
  return (
    <Table
      selectable={false}
    >
      <TableHeader
        displaySelectAll={false}
      >
        <TableRow
          selectable={true}
        >
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
            <TableRowColumn>{`${browser.name} / ${browser.version}`}</TableRowColumn>
            <TableRowColumn>{`${os.name} / ${os.version}`}</TableRowColumn>
          </TableRow>
        })
      }
      </TableBody>
    </Table>
  )
}

App.propTypes = propTypes

export default App
