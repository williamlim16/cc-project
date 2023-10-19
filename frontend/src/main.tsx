import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App'
import Order from './pages/Order'
import Chef from './pages/Chef'
import OrderAdd from './pages/OrderAdd'
import { Toaster } from 'react-hot-toast'

export const queryClient = new QueryClient()
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/order",
    element: <Order />,
  },

  {
    path: "/order/add",
    element: <OrderAdd />,
  },

  {
    path: "/chef",
    element: <Chef />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>,
)
