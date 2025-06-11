import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import UploadBanner from './pages/UploadBanner';
import BannerList from './pages/BannerList';
import BulkUploadcopy from './pages/BulkUploadcopy';
// import BulkUpload from './pages/BulkUpload';
import ResponsiveDashboard from './pages/Dashboardcopy';
import BannerListcopy from './pages/BannerListcopy';
function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<UploadBanner />} />
        <Route path="/list" element={<BannerList />} />
        <Route path="/bulk" element={<BulkUploadcopy />} /> */}
        <Route path="/dash" element={<ResponsiveDashboard />} />
        <Route path="/list" element={<BannerListcopy />} />
      </Routes>
    </Router>
  );
}

export default App;
