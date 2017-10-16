import 'whatwg-fetch'
import UAParser from 'ua-parser-js'
import format from 'date-fns/format'
import debounce from 'lodash-es/debounce'
import filter from 'lodash-es/filter'
import reduce from 'lodash-es/reduce'
import assign from 'object-assign'

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
   * @type {Object}
   * @property {string} protocol
   * @property {string} serverIP
   * @property {string} endPoint
   * @property {number} port
   * @property {boolean} observable
   */
  get options() {
    return {
      protocol: this.protocol,
      serverIP: this.serverIP,
      port: this.port,
      endPoint: this.endPoint,
      observable: this.observable,
      entryTypes: this.entryTypes,
    }
  }
  /**
   * @public
   * @param {Object} parameters
   */
  set options(parameters) {
    let {protocol, serverIP, port, endPoint, observable, entryTypes} = parameters
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
    this.endPoint = endPoint ? endPoint : 'perf'
    /**
     * @private
     * @default false
     * @type {boolean}
     */
    this.observable = observable ? observable : false
    this.entryTypes = assign({}, {
      resource: true,
      mark: false,
      measure: true,
      paint: false,
    }, entryTypes)
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
  sendTiming() {
    return this._patch(this.itemURL, {
      timing: window.performance.timing
    })
  }

  /**
   * @public
   * @return {Promise<Object, Error>}
   * @desc Send mark entries
   */
  sendMark() {
    const mark = window.performance.getEntriesByType('mark')
    return this._patch(this.itemURL, {mark})
  }
  /**
   * @public
   * @return {Promise<Object, Error>}
   * @desc Send measure entries
   */
  sendMeasure() {
    const measure = window.performance.getEntriesByType('measure')
    return this._patch(this.itemURL, {measure})
  }
  /**
   * @public
   * @return {Promise<Object, Error>}
   * @desc Send paint entries
   */
  sendPaint() {
    const paint = window.performance.getEntriesByType('paint')
    return this._patch(this.itemURL, {paint})
  }

  /**
   * @public
   * @return {Promise<Object, Error>}
   * @desc Send resource entries
   */
  sendResource() {
    const reduceEntriesByName = (entries) => {
      return filter(entries, (entry) => {
        return !~entry.name.indexOf(this.url)
      })
    }
    const _resource = window.performance.getEntriesByType('resource')
    const resource = reduceEntriesByName(_resource)
    return this._patch(this.itemURL, {resource})
  }

  /**
   * @public
   * @return {Promise<Object, Error>}
   * @desc Send PerformanceTiming
   */
  sendPerformance(options = {}) {
    const {entryTypes} = options
    const reduceEntriesByName = (entries) => {
      return filter(entries, (entry) => {
        return entry.name.indexOf(this.url) === -1
      })
    }
    const entries = {
      timing: window.performance.timing,
    }
    const params = reduce(entryTypes || this.options.entryTypes, (params, enabled, type) => {
      if (enabled) {
        switch (type) {
          case 'resource':
            params[type] = reduceEntriesByName(window.performance.getEntriesByType('resource'))
            break
          case 'mark':
          case 'measure':
          case 'paint':
            params[type] = window.performance.getEntriesByType(type)
            break
        }
      }
      return params
    }, entries)
    return this._patch(this.itemURL, params)
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
    this.enablePerformanceObserver()
    this.initialized = true
  }

  /**
   * @public
   * @param {boolean} force - to force enable PerformanceObserver
   */
  enablePerformanceObserver(force) {
    if (this.options.observable === false && force !== true) return
    if (window.PerformanceObserver === undefined) return

    const _report = debounce(async () => {
      this._stopObserve()
      await this.sendPerformance()
      this._startObserve()
    }, 1000)
    this.observer = this.observer || new window.PerformanceObserver(_report)
    this._startObserve()
  }

  /**
   * @private
   */
  _startObserve() {
    if (!this.observer) return
    const entryTypes = reduce(this.options.entryTypes, (ret, enabled, type) => {
      if (enabled) {
        ret.push(type)
      }
      return ret
    }, [])
    this.observer.observe({entryTypes})
  }

  /**
   * @private
   */
  _stopObserve() {
    if (!this.observer) return
    this.observer.disconnect()
  }

  /**
   * @public
   */
  disablePerformanceObserver() {
    this._stopObserve()
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
