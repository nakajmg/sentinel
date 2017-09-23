import PathMatch from 'path-match'
import assign from 'object-assign'
import {
  defer,
  find,
  each,
  map
} from 'lodash-es'
const pathMatch = PathMatch({
  sensitive: false,
  strict: false,
  end: false
})

class Router {
  /**
   * @constructor
   * @param {Store} store
   */
  constructor(store) {
    this._watchHistoryState()
    this._updatePathname = store.updatePathname
    this.routes = store.routes
  }

  /**
   * @public
   * @param {Object, string} options
   */
  push(options) {
    if (typeof options === 'string') {
      return this._navigateByPath()
    }
    const {name, path, params, query} = options
    let route
    let url = ''
    if (name) {
      route = find(this.routes, (route) => {
        return route.name === name
      })
      url += route.path
    }
    if (!route) {
      route = find(this.routes, (route) => {
        return route.path === path
      })
      url += route.path
    }
    if (params) {
      // paramsにある値でurlをreplace
      each(params, (value, key) => {
        url = url.replace(`:${key}`, value)
      })
    }
    if (query) {
      url += '?' + map(query, (value, key) => {
        return `${key}=${value}`
      }).join('&')
    }
    // ToDo タイトル更新したいならRouterViewかなんかでreplaceStateすればいい？
    this._pushState(null, name ? name : url, url)
  }

  /**
   * @public
   * @desc wrapper of history.go
   */
  go(count) {
    window.history.go(count)
  }

  /**
   * @public
   * @desc wrapper of history.back
   */
  back() {
    window.history.back()
  }

  /**
   * @public
   * @desc wrapper of history.forward
   */
  forward() {
    window.history.forward()
  }

  /**
   * @public
   * @param {Object} param
   * @param {string} param.pathname
   */
  getRoute({pathname}) {
    const route = {}
    each(this.routes, (_route) => {
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

  /**
   * @param {string} path
   */
  _navigateByPath(path) {
    this._pushState(null, null, path)
  }

  /**
   * @param {Object} state
   * @param {string} title
   * @param {string} path
   */
  _pushState(state, title, path) {
    window.history.pushState(state, title, path)
  }
}

export default Router
