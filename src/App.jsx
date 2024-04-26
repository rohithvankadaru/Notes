import './App.css'
import './util.css'
import Home from './components/home/Home'
import { Toaster } from 'sonner'

function App() {

  return (
    <div>
      <Toaster richColors position='top-center' />
      <Home />
    </div>
  )
}

export default App