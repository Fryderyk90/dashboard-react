
import React from 'react'
import './App.css'
import { PublicTransportWidget } from './components/PublicTransportWidget/PublicTransportWidget'
import { TodoWidget } from './components/TodoWidget/TodoWidget'

function App() {

  return (
    <div className='grid grid-cols-2 gap-4 h-screen bg-stone-200 p-4'>
      <PublicTransportWidget />
      
      <TodoWidget />
    </div>
  )
}

export default App
