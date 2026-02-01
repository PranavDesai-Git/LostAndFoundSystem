import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx' // <--- You need this line!

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)