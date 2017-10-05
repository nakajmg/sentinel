import 'whatwg-fetch'
import UAParser from 'ua-parser-js'
import {format} from 'date-fns'

class Sentinel {
  /**
   * @constructor
   */
  constructor({serverIp}) {
    /**
     * @private
     * @type {string}
     */
    this.ip = serverIp
    /**
     * @private
     * @type {string}
     */
    this.id = ''
    /**
     * @public
     * @type {string}
     */
    this.url = `http://${this.ip}:5889/perf`

    this._initializePerfData({url: this.url})
  }

  /**
   * @public
   * @return {Promise<Object, Error>}
   * @desc Send performance.timing
   */
  sendNavigationTiming() {
    const url = `${this.url}/${this.id}`
    return this._patch(url, {
      navigationTiming: window.performance.timing
    })
  }

  /**
   * @public
   * @return {Promise<Object, Error>}
   * @desc Send Resource Timing
   */
  sendResourceTiming() {
    const url = `${this.url}/${this.id}`
    return this._patch(url, {
      resourceTiming: window.performance.getEntriesByType('resource')
    })
  }

  /**
   * @private
   * @param {Object} param
   * @param {string} param.url
   * @return {Promise<Object, Error>}
   */
  _initializePerfData({url}) {
    const ua = new UAParser(window.navigator.userAgent)
    const env = ua.getResult()
    const date = Date.now()
    const id = `${format(date, 'YYYYMMDDHHmmss')} ${env.browser.name}${env.browser.major} ${env.os.name}`.replace(/\s/g, '_')
    this.id = id
    const json = {
      id,
      date,
      env,
      ip: this.ip
    }
    return this._post(url, json)
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
