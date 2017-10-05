import 'whatwg-fetch'
import UAParser from 'ua-parser-js'
import {format} from 'date-fns'

class Sentinel {
  /**
   * @constructor
   */
  constructor(options = {}) {
    this.options = options
    /**
     * @private
     * @default false
     * @type {boolean}
     */
    this.initialized = false
    /**
     * @private
     * @default ''
     * @type {string}
     */
    this.id = ''

    this._initializePerfData({url: this.url})
  }

  /**
   * @public
   * @property {string} protocol
   * @property {string} serverIP
   * @property {string} endPoint
   * @property {number} port
   * @property {boolean} observable
   * @return {Object}
   */
  get options() {
    return {
      protocol: this.protocol,
      serverIP: this.serverIP,
      port: this.port,
      endPoint: this.endPoint,
      observable: this.observable
    }
  }
  /**
   * @public
   * @param {Object} parameters
   */
  set options(parameters) {
    let {protocol, serverIP, port, endPoint, observable} = parameters
    /**
     * @private
     * @default 'http'
     * @type {string}
     */
    this.protocol = protocol ? protocol : 'http'
    /**
     * @private
     * @default 'localhost'
     * @type {string}
     */
    this.serverIP = serverIP ? serverIP : 'localhost'
    /**
     * @private
     * @default 5889
     * @type {number}
     */
    this.port = port ? port : 5889
    /**
     * @private
     * @default 'perf'
     * @type {string}
     */
    this.endPoint = endPoint ? endPoint : '/perf'
    /**
     * @private
     * @default false
     * @type {boolean}
     */
    this.observable = observable ? observable : false
  }

  /**
   * @public
   * @default http://localhost:5889/perf
   * @type {string}
   */
  get url() {
    const {protocol, serverIP, port, endPoint} = this.options
    return `${protocol}://${serverIP}:${port}/${endPoint}`
  }

  /**
   * @public
   * @return {string}
   */
  get itemURL() {
    return `${this.url}/${this.id}`
  }

  /**
   * @public
   * @return {Promise<Object, Error>}
   * @desc Send performance.timing
   */
  sendNavigationTiming() {
    return this._patch(this.itemURL, {
      navigationTiming: window.performance.timing
    })
  }

  /**
   * @public
   * @return {Promise<Object, Error>}
   * @desc Send Resource Timing
   */
  sendResourceTiming() {
    return this._patch(this.itemURL, {
      resourceTiming: window.performance.getEntriesByType('resource')
    })
  }

  /**
   * @private
   * @param {Object} param
   * @param {string} param.url
   * @return {Promise<Object, Error>}
   */
  async _initializePerfData({url}) {
    const ua = new UAParser(window.navigator.userAgent)
    const env = ua.getResult()
    const date = Date.now()
    const id = `${format(date, 'YYYYMMDDHHmmss')} ${env.browser.name}${env.browser.major} ${env.os.name}`.replace(/\s/g, '_')
    this.id = id
    const json = {
      id,
      date,
      env
    }
    await this._post(url, json)
    this.initialized = true
    console.log(this)
  }

  /**
   * @private
   * @param {string} url
   * @return {Promise<Object, Error>}
   */
  _get(url) {
    return this._request(url)
  }

  /**
   * @private
   * @param {string} url
   * @param {Object} json
   * @return {Promise<Object, Error>}
   */
  _post(url, json) {
    return this._request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
    })
  }

  /**
   * @private
   * @param {string} url
   * @param {Object} json - to send data
   * @return {Promise<Object, Error>}
   */
  _patch(url, json) {
    return this._request(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
    })
  }

  /**
   * @private
   * @param {string} url
   * @param {Object} options
   * @return {Promise<Object, Error>}
   */
  _request(url, options = {}) {
    return fetch(url, options).then(res => res.json())
  }
}

export default Sentinel
