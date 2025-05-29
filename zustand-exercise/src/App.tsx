import { Toaster } from 'react-hot-toast'
import './App.css'
import User from './components/User'

const App = () => {
  return (
    <div>
      <Toaster />
      <User />
    </div>
  )
}

export default App