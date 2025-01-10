import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store'
import { RouterProvider, createBrowserRouter } from 'react-router'
import { AuthLayout, Login } from './conponents/index.js'

import Home from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'
import ContextProvider from './context/Context.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ContextProvider>
  </StrictMode>
)
