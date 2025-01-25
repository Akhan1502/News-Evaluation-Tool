import { useEffect } from 'react'
import App from '../App'
import { getBrowserAPI } from '../lib/browser'

export function ExtensionApp() {
  useEffect(() => {
    const checkEnvironment = async () => {
      try {
        await getBrowserAPI()
        console.log('Running in extension context')
      } catch (error) {
        console.log('Not running in extension context')
      }
    }

    checkEnvironment()
  }, [])

  // For now, we'll just render the App component
  // Later we can add extension-specific functionality here
  return <App />
}