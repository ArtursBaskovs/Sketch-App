import {  StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './assets/scss/_styles.scss'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.tsx'
import { Menu } from './components/menu/Menu.tsx'
import { DrawCanva } from './components/drawing_components/DrawCanva.tsx'
import { NotFound404 } from './components/NotFound404.tsx'

const router = createBrowserRouter([
  {  
    element: <Layout />,
    
    children: [
      {
        path: '*', 
        element: <NotFound404 />
      },
      { 
        path: '/', 
        element: <Menu />, 
      },
      { 
        path: '/draw/', 
        element: <DrawCanva /> 
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
