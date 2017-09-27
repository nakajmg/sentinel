import 'whatwg-fetch'
import {observable, action} from 'mobx'
import {find} from 'lodash-es'
import PropTypes from 'prop-types'
import Router from '../Router'
import routes from '../routes'
/**
 * this is Store
 */
class Store {
  constructor() {
    this._initialize()
    this.routes = routes
    this.router = new Router(this)
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
    // ToDo json-serverと同じ場所で動かすから /perf だけでよくなる
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

  /**
   * @public
   * @param {Object} param
   * @param {string} param.id
   * @return {Object}
   */
  @action.bound
  getPerformanceDataById({id}) {
    return find(this.perfData, (data) => {
      return data.id === id
    })
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
