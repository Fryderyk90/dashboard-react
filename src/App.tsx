
import './App.css'
import { PublicTransportWidget } from './components/PublicTransportWidget/PublicTransportWidget'
import { TodoWidget } from './components/TodoWidget/TodoWidget'

function App() {

  return (
    <div className='grid grid-cols-2 gap-4 bg-stone-200 overflow-y-auto'>
      <PublicTransportWidget />
      <TodoWidget />
    </div>
  )
}

export default App
