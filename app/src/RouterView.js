import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import Router from './Router'

@inject('store')
@observer
class RouterView extends Component {
  constructor(props) {
    super(props)
    this.router = new Router(this.props.store)
  }
  render() {
    const store = this.props.store
    const route = this.router.route
    const Component = route.component
    const params = route.params
    return (
      <Component params={params} store={store}></Component>
    )
  }
}

export default RouterView
