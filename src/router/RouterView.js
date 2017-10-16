import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import {defer} from 'lodash-es'
import '../App.css'
@inject('store')
@observer
class RouterView extends Component {
  constructor(props) {
    super(props)
    this.el = null
  }
  /**
   * @return {ReactComponent}
   */
  render() {
    const store = this.props.store
    const route = store.router.getRoute({pathname: store.pathname})
    const Component = route.component
    const params = route.params
    return (
      <div className="fadein" ref={div => this.el = div}>
        <Component params={params} store={store}></Component>
      </div>
    )
  }

  /**
   * @desc transitionでふわっと表示されるようにする
   */
  componentDidMount() {
    defer(() => {
      this.el.classList.add('fadein-enter')
    })
  }

  /**
   * @desc transitionでふわっと表示されるようにする
   */
  componentWillUpdate() {
    this.el.classList.remove('fadein-enter')
  }

  /**
   * @desc transitionでふわっと表示されるようにする
   */
  componentDidUpdate() {
    defer(() => {
      this.el.classList.add('fadein-enter')
    })
  }
}

export default RouterView
