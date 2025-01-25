import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ExtensionApp } from './components/extension-app'
import './index.css'

const isExtension = window.location.protocol === 'moz-extension:'
  || window.location.protocol === 'chrome-extension:'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isExtension ? <ExtensionApp /> : <App />}
  </React.StrictMode>,
)
