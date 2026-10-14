import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/Layout'
import Dashboard from '@/pages/Dashboard'
import ProtectedRoutes from './components/ProtectedRoutes'
import Employees from './pages/Employees'
import Leave from './pages/Leave'
import Attendence from './pages/Attendence'
import Login from './components/oth/Login'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<Layout />}>
          <Route element={<ProtectedRoutes />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/employee' element={<Employees />} />
            <Route path='/leave' element={<Leave />} />
            <Route path='/attendence' element={<Attendence />} />
            <Route path='/advance' element={<Attendence />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App