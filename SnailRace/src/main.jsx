import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/App.scss'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import  AuthContextProvider  from './context/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
