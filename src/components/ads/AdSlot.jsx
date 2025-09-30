import React from 'react'

export default function AdSlot({ id, enabled = true, className = '', children }){
  if(!enabled) return null
  return (
    <div id={id} aria-label="Advertisement" className={className}>
      {children}
    </div>
  )
}
