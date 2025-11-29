import {  StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './assets/scss/_styles.scss'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.tsx'
import { Menu } from './pages/menu_page/Menu.tsx'
import { NotFound404 } from './components/NotFound404.tsx'
import { SpeedSketch } from './pages/drawing_pages/SpeedSketch.tsx'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient();

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
        path: '/draw/speed-sketch', 
        element: <SpeedSketch /> 
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
