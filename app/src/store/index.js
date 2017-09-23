import 'whatwg-fetch'
import {observable, action} from 'mobx'
import PropTypes from 'prop-types'
import routes from '../routes'
/**
 * this is Store
 */
class Store {
  constructor() {
    this._initialize()
    this.routes = routes
  }

  @action.bound
  updatePathname() {
    this.pathname = window.location.pathname
  }

  /**
   * @public
   * @type {boolean}
   */
  @observable isInitialized = false

  /**
   * @public
   * @type {string}
   */
  @observable pathname = window.location.pathname

  /**
   * @public
   * @type {Array<Object>}
   */
  @observable perfData = []


  /**
   * @public
   * @return {Promise}
   */
  @action.bound
  async updatePerfData() {
    const data = await this._fetchPerfData()
    console.log(data)
    return this._setPerfData(data)
  }

  /**
   * @private
   * @return {Promise}
   */
  @action.bound
  _initialize() {
    return this.updatePerfData()
      .then(() => {
        this.isInitialized = true
      })
  }

  /**
   * @private
   * @return {Promise}
   */
  _fetchPerfData() {
    return fetch('http://localhost:5889/perf')
      .then(res => res.json())
  }

  /**
   * @private
   */
  @action.bound
  _setPerfData(data) {
    this.perfData= data
  }
}

export default Store

/**
 * @example
 * import {propTypes} from './store'
 * App.propTypes = propTypes
 */
export const propTypes = {
  store: PropTypes.shape({
    perfData: PropTypes.array,
    postPerfData: PropTypes.func
  })
}
