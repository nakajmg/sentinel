import React from 'react'
import {each} from 'lodash-es'
import PathMatch from 'path-match'
const pathMatch = PathMatch({
  sensitive: false,
  strict: false,
  end: false
})

class Router {
  constructor({routes, location}) {
    each(routes, (_route) => {
      const match = pathMatch(_route.path)
      const params = match(location.pathname)
      if (params) {
        this.route = _route
        this.params = params
        return false
      }
    })
  }
}

export default Router
