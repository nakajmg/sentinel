import React from 'react'
import {each} from 'lodash-es'
import PathMatch from 'path-match'
const pathMatch = PathMatch({
  sensitive: false,
  strict: false,
  end: false
})

class Router {
  constructor(store) {
    let route = null
    each(store.routes, (_route) => {
      const match = pathMatch(_route.path)
      const params = match(store.location.pathname)
      if (params) {
        route = {
          ..._route,
          params
        }
        return false
      }
    })
    this.route = route
    this.store = store
  }

  render() {
    if (this.route === null) return <div></div>
    const Component = this.route.component
    const params = this.route.params
    return (
      <Component store={this.store} params={params}></Component>
    )
  }
}

export default Router
