import React from 'react'
import iconChrome from '../../img/chrome.svg'
import iconSafari from '../../img/safari.svg'
import iconFirefox from '../../img/mozilla.svg'
import iconIE from '../../img/explorer.svg'
import iconBrowser from '../../img/browser.svg'
import './BrowserVersion.css'
import propTypes from 'prop-types'

/**
 * @param {Object} props
 * @param {string} props.name - browser names which provide from ua-parser
 * @param {string} props.version - browser versions which provide from ua-parser
 * @example
 * <BrowserVersion browser={browser} />
 */
function BrowserVersion({browser, style}) {
  style = style || {}
  const {name, version} = browser
  let icon
  switch (name.toLowerCase()) {
    case 'chrome':
      icon = iconChrome
      break
    case 'safari':
      icon = iconSafari
      break
    case 'mobile safari':
      icon = iconSafari
      break
    case 'firefox':
      icon = iconFirefox
      break
    case 'ie':
      icon = iconIE
      break
    default:
      icon = iconBrowser
  }
  return (
    <span className="BrowserVersion" style={style}>
      <span className="BrowserVersion-Icon">
        <img src={icon} alt={name}/>
      </span>
      <span> {`${version}`}</span>
    </span>
  )
}

BrowserVersion.prototype.propTypes = {
  style: propTypes.object
}

export default BrowserVersion
