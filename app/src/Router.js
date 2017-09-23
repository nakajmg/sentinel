// import React from 'react'
import {each} from 'lodash-es'
import PathMatch from 'path-match'
import assign from 'object-assign'
import {defer} from 'lodash-es'
const pathMatch = PathMatch({
  sensitive: false,
  strict: false,
  end: false
})

class Router {
  /**
   * @constructor
   * @param {Store} store
   * @param {function} store.udpatePathname
   */
  constructor({updatePathname}) {
    this._watchHistoryState()
    this._updatePathname = updatePathname
  }

  /**
   * @public
   * @param {Store} store
   * @param {Object} routes
   * @param {string} pathname
   */
  getRoute({routes, pathname}) {
    const route = {}
    each(routes, (_route) => {
      const match = pathMatch(_route.path)
      const params = match(pathname)
      if (params) {
        assign(route, _route, {params})
        return false
      }
    })
    return route
  }

  /**
   * @private
   */
  _watchHistoryState() {
    const history = window.history
    const originalPushState = history.pushState
    history.pushState = (state, title, path) => {
      defer(() => {
        this._onPushState(state, title, path)
      })
      return originalPushState.apply(history, [state, title, path])
    }
    window.addEventListener('popstate', (e) => {
      defer(() => {
        this._onPopState(e)
      })
    })
  }

  /**
   * @private
   * @param {Object} state
   * @param {string} title
   * @param {string} path
   */
  _onPushState(state, title, path) {
    this._updatePathname()
    // console.log(state, title, path)
  }

  /**
   * @private
   * @param {Event} e
   */
  _onPopState(e) {
    this._updatePathname()
  }
}

export default Router
