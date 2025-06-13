import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Login from './pages/Login';

// import ResponsiveDashboard from './pages/Dashboardcopy';

import ProtectedRoute from './components/ProtectedRoutes';

// Testing pages
import UploadBanner from './pages/UploadBannerManjul';
import ResponsiveDashboard from './pages/DashboardCopyRaghav';
import Login from './pages/LoginRaghav';
function App() {
  return (
    <Router>
      <Routes>
     
         <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<ProtectedRoute><ResponsiveDashboard /></ProtectedRoute>} />

        {/* <Route path="/ubm" element={<UploadBanner />} /> */}
        {/* <Route path="/dashboardcopy" element={<ResponsiveDashboard />} /> */}

        {/* Add more routes as needed */}
        
        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
