import React from 'react'
import iconChrome from '../../img/chrome.svg'
import iconSafari from '../../img/safari.svg'
import iconFirefox from '../../img/mozilla.svg'
import iconIE from '../../img/explorer.svg'
import iconBrowser from '../../img/browser.svg'

/**
 * @param {Object} props
 * @param {string} props.name - browser names which provide from ua-parser
 * @param {string} props.version - browser versions which provide from ua-parser
 * @return {element}
 */
function BrowserVersion({browser}) {
  const {name, version} = browser
  const style = {
    width: '20px',
    height: '20px',
    verticalAlign: 'bottom'
  }
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
    <span>
      <img src={icon} style={style} alt={name}/>
      <span> {`${version}`}</span>
    </span>
  )
}

export default BrowserVersion
