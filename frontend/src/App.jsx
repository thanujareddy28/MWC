import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [message, setMessage] = useState('Loading...')

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/')
      .then((response) => {
        setMessage(response.data.message)
      })
      .catch((error) => {
        setMessage('Could not connect to backend 😢')
        console.error(error)
      })
  }, [])

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Mental Wellness Companion</h1>
      <p>{message}</p>
    </div>
  )
}

export default App