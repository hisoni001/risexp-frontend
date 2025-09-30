import { useEffect, useState } from 'react'

export function useTheme(){
  const [theme, setTheme] = useState(()=> localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))

  useEffect(()=>{
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return {
    theme,
    toggle: () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  }
}
