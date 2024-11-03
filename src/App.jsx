
import './App.css'
import { Otp } from './components/Otp'

function App() {

  return (
    <div className='h-screen w-screen bg-blue-700 flex justify-center item-center'>
      <br/><br/><br/><br/>
      <Otp number={20}/>
    </div>
  )
}

export default App
