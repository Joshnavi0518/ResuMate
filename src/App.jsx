import { useState } from 'react'
import './App.css'
import HomePage from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <h1>ResuMate</h1>   
        <HomePage />
    </>
  )
}

export default App
