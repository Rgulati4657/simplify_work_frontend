// import React from 'react';
// import { Link } from 'react-router-dom';

// function Dashboard() {
//   return (
//     <div>
//       <h1>Simplify Engage Dashboard</h1>
//       <ul>
//         <li><Link to="/upload">Upload New Banner</Link></li>
//         <li><Link to="/list">View Uploaded Banners</Link></li>
//         <li><Link to="/bulk">Bulk Upload</Link></li>
//       </ul>
//     </div>
//   );
// }

// export default Dashboard;

import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import UploadBanner from './UploadBanner';
import BulkUpload from './BulkUpload';
import BannerList from './BannerList'; // Assuming you have a BannerList component
// ...existing code...

// Mock components - replace these with your actual components
// const UploadBanner = () => (
//   <div className={styles.componentContainer}>
//     <h2>Upload New Banner</h2>
//     <p>Upload banner component will be rendered here</p>
//   </div>
// );

// const ViewBanners = () => (
//   <div className={styles.componentContainer}>
//     <h2>View Uploaded Banners</h2>
//     <p>List of banners component will be rendered here</p>
//   </div>
// );

// const BulkUpload = () => (
//   <div className={styles.componentContainer}>
//     <h2>Bulk Upload</h2>
//     <p>Bulk upload component will be rendered here</p>
//   </div>
// );

function Dashboard() {
  const [activeComponent, setActiveComponent] = useState('upload');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      id: 'upload',
      name: 'Upload Banner',
      icon: '↑',
      component: <UploadBanner />
    },
    {
      id: 'list',
      name: 'View Banners',
      icon: '📋',
      component: <BannerList />
    },
    {
      id: 'bulk',
      name: 'Bulk Upload',
      icon: '📁',
      component: <BulkUpload />
    }
  ];

  const activeItem = menuItems.find(item => item.id === activeComponent);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={styles.dashboard}>
      {/* Mobile Menu Button */}
      <button 
        className={styles.mobileMenuButton}
        onClick={toggleSidebar}
      >
        <span className={styles.hamburger}>☰</span>
      </button>

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        {/* Logo/Header */}
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}></div>
            {/* <h2 className={styles.logoText}>Simplify Engage</h2> */}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className={styles.navigation}>
          <div className={styles.navSection}>
            <h3 className={styles.navSectionTitle}>Banner Management</h3>
            <ul className={styles.navList}>
              {menuItems.map((item) => (
                <li key={item.id} className={styles.navItem}>
                  <button
                    className={`${styles.navButton} ${
                      activeComponent === item.id ? styles.navButtonActive : ''
                    }`}
                    onClick={() => {
                      setActiveComponent(item.id);
                      setSidebarOpen(false); // Close mobile menu after selection
                    }}
                  >
                    <span className={styles.navIcon}>{item.icon}</span>
                    <span className={styles.navText}>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Menu Section */}
          {/* <div className={styles.navSection}>
            <h3 className={styles.navSectionTitle}>Settings</h3>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <button className={styles.navButton}>
                  <span className={styles.navIcon}>⚙️</span>
                  <span className={styles.navText}>Configuration</span>
                </button>
              </li>
              <li className={styles.navItem}>
                <button className={styles.navButton}>
                  <span className={styles.navIcon}>📊</span>
                  <span className={styles.navText}>Analytics</span>
                </button>
              </li>
            </ul>
          </div> */}
        </nav>

        {/* User Profile Section */}
        <div className={styles.userProfile}>
          <div className={styles.userAvatar}>U</div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>Admin User</p>
            <p className={styles.userRole}>Administrator</p>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className={styles.mobileOverlay}
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.pageTitle}>{activeItem?.name}</h1>
            <div className={styles.headerActions}>
              <button className={styles.notificationButton}>
                <span className={styles.notificationIcon}>🔔</span>
                <span className={styles.notificationBadge}>3</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className={styles.content}>
          <div className={styles.contentWrapper}>
            {activeItem?.component}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;