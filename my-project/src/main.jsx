import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import setupLocatorUI from "@locator/runtime"; // Import LocatorJS
import './index.css'
import App from './App.jsx'

// Initialize only in development mode
if (import.meta.env.DEV) {
  setupLocatorUI();
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)