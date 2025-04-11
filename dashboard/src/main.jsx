import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import StatProvider from "./context/StatContext";
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <StatProvider>
        <App />
      </StatProvider>
    </BrowserRouter>
  </StrictMode>,
)
