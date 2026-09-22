"use client"

import { useEffect } from 'react'

export function FontLoader() {
  useEffect(() => {
    // Load Orelega One font
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = 'https://fonts.googleapis.com'
    document.head.appendChild(link)
    
    const link2 = document.createElement('link')
    link2.rel = 'preconnect'
    link2.href = 'https://fonts.gstatic.com'
    link2.crossOrigin = 'anonymous'
    document.head.appendChild(link2)
    
    const fontLink = document.createElement('link')
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Orelega+One&display=swap'
    fontLink.rel = 'stylesheet'
    document.head.appendChild(fontLink)
  }, [])

  return null
}
