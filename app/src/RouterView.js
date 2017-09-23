import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'

@inject('store')
@observer
class RouterView extends Component {
  /**
   * @return {ReactComponent}
   */
  render() {
    const store = this.props.store
    const route = store.router.getRoute({pathname: store.pathname})
    const Component = route.component
    const params = route.params
    return (
      <Component params={params} store={store}></Component>
    )
  }
}

export default RouterView
