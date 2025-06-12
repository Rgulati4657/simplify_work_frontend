import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Dashboard from './pages/Dashboard';
// import UploadBanner from './pages/UploadBanner';
// import BannerList from './pages/BannerList';
// import BulkUploadcopy from './pages/BulkUploadcopy';
import Login from './pages/Login';
// import BulkUpload from './pages/BulkUpload';
import ResponsiveDashboard from './pages/Dashboardcopy';
import BannerListcopy from './pages/BannerListcopy';
import ProtectedRoute from './components/ProtectedRoutes';
import UploadBanner from './pages/UploadBannerCopy1';
function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<UploadBanner />} />
        <Route path="/list" element={<BannerList />} />
        <Route path="/bulk" element={<BulkUploadcopy />} /> */}
         <Route path="/login" element={<Login />} />
         {/* <Route path="/banner" element={<UploadBanner />} /> */}
        <Route path="/dashboard" element={<ProtectedRoute><ResponsiveDashboard /></ProtectedRoute>} />
        {/* <Route path="/list" element={<ProtectedRoute><BannerListcopy /></ProtectedRoute>} /> */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
