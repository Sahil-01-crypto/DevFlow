import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Kanban from './pages/Kanban'
import Projects from './pages/Projects'
import Settings from './pages/Settings'

const App = () => {
  return (
    <div className=' w-full h-screen bg-amber-200'>
      <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/kanban' element={<Kanban/>} />
        <Route path='/projects' element={<Projects/>} />
        <Route path ='/setting' element={<Settings/>}  />
      </Routes>
    </div>
  )
}

export default App
