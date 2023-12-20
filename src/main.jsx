import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import TypingBoxProvider from './context/TypingBoxProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <TypingBoxProvider>
    <App />
  </TypingBoxProvider>
)
