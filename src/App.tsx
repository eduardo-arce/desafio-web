
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import {  Home } from './component'
import { LoginForm } from './component/LoginForm'
import { ProtectedRoute } from './component/ProtectedRoute'


function App() {
  return (
    
    <Router>
      <Routes>
          <Route path="/login" element={<LoginForm />} />

          <Route
              path="/"
              element={
                  <ProtectedRoute>
                      <Home />
                  </ProtectedRoute>
              }
          />

          {/* Rota para outras páginas (404 ou NotFound) */}
          <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
    
  )
}

export default App
