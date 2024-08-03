import React from 'react'
import ReactDOM from 'react-dom/client'

import { Toaster } from 'react-hot-toast'
import { Provider } from "react-redux"
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { store } from './redux'
import { router } from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <Provider store={store}>
   <RouterProvider router={router}/>
   <Toaster />
   </Provider>
   
  </React.StrictMode>,
)
