import React from 'react'
import './App.css'
import { PublicTransportWidget } from './components/PublicTransportWidget/PublicTransportWidget'
import { TodoWidget } from './components/TodoWidget/TodoWidget'
import { ThemeProvider } from './components/ui/ThemeProvider/ThemeProvider'
import { DarkModeToggle } from './components/DarkModeToggle/DarkModeToggle'
import Clock from './components/Clock/Clock'

function App() {
  return (
    <ThemeProvider>
      <div className='flex justify-between align-middle'>
           <Clock/>
          <DarkModeToggle/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-screen bg-stone-200 dark:bg-stone-600 p-4">
        <PublicTransportWidget />
        <TodoWidget />
      </div>
    </ThemeProvider>
  )
}

export default App
