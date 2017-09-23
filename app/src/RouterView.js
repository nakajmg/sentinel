import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import Router from './Router'

@inject('store')
@observer
class RouterView extends Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props)
    /**
     * @type {Router} router
     * @public
     */
    this.router = new Router(this.props.store)
  }

  /**
   * @return {ReactComponent}
   */
  render() {
    const store = this.props.store
    const route = this.router.getRoute(store)
    const Component = route.component
    const params = route.params
    return (
      <Component params={params} store={store}></Component>
    )
  }
}

export default RouterView
