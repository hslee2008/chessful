import React from 'react'
import ReactDOM from 'react-dom/client'
import { TodoProvider } from './context'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link
} from 'react-router-dom'
import './index.css'

import Home from './pages/home'
import Analytics from './pages/analytics'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/analytics',
    element: <Analytics />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TodoProvider>
      <RouterProvider router={router} />
    </TodoProvider>
  </React.StrictMode>
)
