import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import IsLoggedinProvider from './components/IsLoggedinProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <IsLoggedinProvider>
        <App />
      </IsLoggedinProvider>
    </BrowserRouter>
  </StrictMode>
)
