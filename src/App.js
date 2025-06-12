import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';

import ResponsiveDashboard from './pages/Dashboardcopy';

import ProtectedRoute from './components/ProtectedRoutes';

function App() {
  return (
    <Router>
      <Routes>
     
         <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<ProtectedRoute><ResponsiveDashboard /></ProtectedRoute>} />

        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
