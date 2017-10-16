import React from 'react'
import iconMacos from '../../img/apple.svg'
import iconWindows from '../../img/win.svg'
import iconIOS from '../../img/ios.svg'
import iconAndroid from '../../img/android.svg'
import './OSVersion.css'

/**
 * @param {Object} props
 * @param {string} props.name - OS names which provide from ua-parser
 * @param {string} props.version - OS versions which provide from ua-parser
 * @example
 * <OSVersion os={os} />
 */
function OSVersion ({os, style}){
  style = style || {}
  const {name, version} = os
  let icon
  switch (name.toLowerCase()) {
    case 'ios':
      icon = iconIOS
      break
    case 'mac os':
      icon = iconMacos
      break
    case 'windows':
      icon = iconWindows
      break
    case 'android':
      icon = iconAndroid
      break
    default:
      icon = iconWindows
  }
  return (
    <span className="OSVersion" style={style}>
      <span className="OSVersion-Icon">
        <img src={icon} alt={name}/>
      </span>
      <span> {version}</span>
    </span>
  )
}

export default OSVersion
