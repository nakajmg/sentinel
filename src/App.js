import React, { Component } from 'react'
import {observer, inject} from 'mobx-react'
import {propTypes} from './store'
import {AppBar} from 'material-ui'
import {grey800} from 'material-ui/styles/colors'
import RouterView from './router/RouterView'

/**
 * App
 */
@inject('store')
@observer
class App extends Component {
  /**
   * @return {element} <div>
   */
  render() {
    return (
      <div style={{
        backgroundColor: grey800,
        height: '100vh'
      }}>
        <AppBar
          title="SENTINEL"
          showMenuIconButton={false}
          onTitleTouchTap={() => {
            this.props.store.router.push('/')
          }}
        />
        <RouterView></RouterView>
      </div>
    )
  }
}



App.propTypes = propTypes

export default App
