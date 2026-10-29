import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './styles/globals.css'
import { router } from './router/router'
import { SITE_THEME, THEME_CLASSES } from './theme'

document.documentElement.classList.add(...THEME_CLASSES[SITE_THEME])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
