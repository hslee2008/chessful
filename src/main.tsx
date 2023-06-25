import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AnalysisProvider } from './context'
import './index.css'

import Analytics from './pages/analytics'
import Home from './pages/chess'
import { PlayVsStockfish } from './pages/ai'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/analytics',
    element: <Analytics />
  },
  {
    path: '/ai',
    element: <PlayVsStockfish />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AnalysisProvider>
      <RouterProvider router={router} />
    </AnalysisProvider>
  </React.StrictMode>
)
