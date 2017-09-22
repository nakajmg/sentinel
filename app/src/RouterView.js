import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import Router from './Router'

@inject('store')
@observer
class RouterView extends Component {
  render() {
    const store = this.props.store
    const router = new Router(store)
    const Component = router.render()
    return (
      <div>
        {Component}
      </div>
    )
  }
}

export default RouterView
