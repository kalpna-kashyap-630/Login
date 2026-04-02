
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import { useState } from 'react'
import RefreshHandler from '../RefreshHandler'
import PrivateRoute from './routes/privateRoute'
import PublicRoute from './routes/publicRoutes'


 

function App() {
 const [isAuthenticated, setIsAuthenticated] = useState(false);
//  const PrivateRoute = ({element}) => {
//  return isAuthenticated ? element : <Navigate to = "/login" />
//  }
  return (
    <>
   <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
    <Routes>
      
      <Route path="/" element={<Navigate to="/login" />} />

        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <Signup />
            </PublicRoute>
          }
        />

        {/* Private Route */}
        <Route
          path="/home"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Home />
            </PrivateRoute>
          }
        />
    </Routes>
    </>
  );
}

export default App
