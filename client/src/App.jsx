import React, {useState, createContext} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './Nav'
import Login from "./Login"
import Register from "./Register"
import Myprofile from "./Myprofile"
import Home from "./Home"

export const store = createContext()
const App = () => {
  const[token, setToken] = useState(null)
  return (
    <div>
<store.Provider value={[token, setToken]}>
      <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/myprofile" element={<Myprofile />} />
      </Routes>
      </BrowserRouter>
      </store.Provider>
    </div>
  )
}

export default App
