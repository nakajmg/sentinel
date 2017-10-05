import React from 'react'
import iconMacos from '../../img/macos.svg'
import iconWindows from '../../img/win.svg'
import iconIOS from '../../img/ios.svg'
import iconAndroid from '../../img/android.svg'

/**
 * @param {Object} props
 * @param {string} props.name - OS names which provide from ua-parser
 * @param {string} props.version - OS versions which provide from ua-parser
 * @return {element}
 */
function OSVersion ({os}){
  const {name, version} = os
  const style = {
    width: '20px',
    height: '20px',
    verticalAlign: 'bottom'
  }
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
    <span>
      <img src={icon} style={style} alt={name}/>
      <span> {version}</span>
    </span>
  )
}

export default OSVersion