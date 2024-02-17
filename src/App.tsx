import React from 'react'
import './App.css'
import { PublicTransportWidget } from './components/PublicTransportWidget/PublicTransportWidget'
import { TodoWidget } from './components/TodoWidget/TodoWidget'
import { ThemeProvider } from './components/ui/ThemeProvider/ThemeProvider'
import { DarkModeToggle } from './components/DarkModeToggle/DarkModeToggle'
import Clock from './components/Clock/Clock'

function App() {
  return (
    <div className='overflow-hidden bg-stone-200 dark:bg-stone-800'>

    <ThemeProvider>
      <div className='sticky z-10 top-0'>
        <div className='flex items-center justify-end align-middle bg-white dark:bg-black border-2'>

           <Clock/>
          <DarkModeToggle/>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-3 sm:grid-rows-2 gap-4">
        <PublicTransportWidget />
        <TodoWidget />
      </div>
    </ThemeProvider>
    </div>
  )
}

export default App
