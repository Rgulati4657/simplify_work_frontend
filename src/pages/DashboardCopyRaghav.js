
// import React, { useState, useEffect } from 'react';

// import UploadBanner from './UploadBannerCopy1'; // Link the UploadBanner component

// import BulkUploadcopy from './BulkUploadcopy';


// import BannerListcopy from './BannerListCopyUpdated';


// const ResponsiveDashboard = () => {
//   const [activeComponent, setActiveComponent] = useState('upload');

//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth <= 768;
//       setIsMobile(mobile);
//       if (!mobile) setMobileOpen(false);
//     };
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const menuItems = [
//     {
//       id: 'upload',
//       name: 'Upload Banner',
//       icon: '↑',
//       component: <UploadBanner />
//     },
//     {
//       id: 'list',
//       name: 'View Banners',
//       icon: '📋',
//       component: <BannerListcopy />
//     },
//     {
//       id: 'bulk',
//       name: 'Bulk Upload',
//       icon: '📁',
//       component: <BulkUploadcopy />
//     }
//   ];

//   const activeItem = menuItems.find(item => item.id === activeComponent);

//   const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
//   const handleNavClick = (itemId) => {
//     setActiveComponent(itemId);
//     setMobileOpen(false);
//   };

//   return (
//     <div className={`dashboard ${
//     activeComponent === 'list' ? 'no-background' : 'with-background'
//   }`}>
//       {/* Mobile Menu Button */}
//       {isMobile && (
//         <button 
//           className="mobile-menu-button"
//           onClick={handleDrawerToggle}
//         >
//           <span className="hamburger">☰</span>
//         </button>
//       )}

//       {/* Sidebar/Drawer */}
//       <div className={`sidebar ${isMobile ? (mobileOpen ? 'sidebar-open' : 'sidebar-closed') : ''}`}>
//         {/* Logo Section */}
//         <div className="sidebar-header">
//           <div className="logo">
//             <div className="logo-icon">
//               {/* <span>Simplify</span> */}
//             </div>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="navigation">
//           <div className="nav-section">
//             <h3 className="nav-section-title">Banner Management</h3>
//             <ul className="nav-list">
//               {menuItems.map((item) => (
//                 <li key={item.id} className="nav-item">
//                   <button
//                     className={`nav-button ${activeComponent === item.id ? 'nav-button-active' : ''}`}
//                     onClick={() => handleNavClick(item.id)}
//                   >
//                     <span className="nav-icon">{item.icon}</span>
//                     <span className="nav-text">{item.name}</span>
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </nav>

//         {/* User Profile */}
//         <div className="user-profile">
//           <div className="user-avatar">U</div>
//           <div className="user-info">
//             <p className="user-name">Admin User</p>
//             <p className="user-role">Administrator</p>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Overlay */}
//       {mobileOpen && isMobile && (
//         <div 
//           className="mobile-overlay"
//           onClick={() => setMobileOpen(false)}
//         />
//       )}

//       {/* Main Content */}
//       <div className={`main-content ${isMobile ? 'main-content-mobile' : ''}`}>
//         {/* Header */}
//         <header className="header">
//           <div className="header-content">
//             <h1 className="page-title">
//               {activeItem?.name}
//             </h1>
//             <div className="header-actions">
//               <button className="notification-button">
//                 <span className="notification-icon">🔔</span>
//                 <span className="notification-badge">3</span>
//               </button>
//             </div>
//           </div>
//         </header>

//         {/* Content Area */}
//         <main className="content">
//           <div className="content-wrapper">
//             {activeItem?.component}
//           </div>
//         </main>
//       </div>

//       {/* --- Dashboard Styles --- */}
//       <style jsx>{`
//         .dashboard {
//           display: flex;
//           height: 100vh;
//           width: 100%;
//            transition: background 0.4s ease;
//           // background: linear-gradient(135deg, #e9ebea, #3386bd);
//           font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
//         }
//           /* Background only for upload/bulk */
// .with-background {
//   background: linear-gradient(135deg, #e9ebea, #3386bd);
//   height: 100%;
// }

// /* No background for list page */
// .no-background {
//   background: white; /* or #f9fafb, or transparent */
// }
//         .mobile-menu-button {
//           position: fixed;
//           top: 1rem;
//           left: 1rem;
//           z-index: 1001;
//           background-color: #2563eb;
//           color: white;
//           border: none;
//           border-radius: 0.5rem;
//           padding: 0.75rem;
//           cursor: pointer;
//           box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
//         }
//         .hamburger { font-size: 1.25rem; }
//         .sidebar {
//           width: 280px;
//           background-color: white;
//           border-right: 1px solid #e5e7eb;
//           display: flex;
//           flex-direction: column;
//           position: fixed;
//           height: 100vh;
//           left: 0;
//           top: 0;
//           z-index: 1000;
//           transition: transform 0.3s ease-in-out;
//           box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
//         }
//         @media (max-width: 768px) {
//           .content{}
//           .sidebar { transform: translateX(-100%); }
//           .sidebar-open { transform: translateX(0); }
//           .sidebar-closed { transform: translateX(-100%); }
//         }
//         .sidebar-header {
//           padding: 1.5rem;
//           border-bottom: 1px solid #e5e7eb;
//         }
//         .logo {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .logo-icon {
//           background-image:url('../images/simplify-icon.png');
//           background-size:cover;
//           width: 14rem;
//           height: 5rem;
//           // background-color: #2563eb;
//           color: white;
//           border-radius: 0.5rem;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-weight: bold;
//           font-size: 1rem;
//         }
//         @media (max-width: 480px) {
//           .logo-icon {
//             width: 12rem;
//             height: 4rem;
//             font-size: 0.9rem;
//           }
//         }
//         .navigation {
//           flex: 1;
//           padding: 1.5rem 0;
//           overflow-y: auto;
//         }
//         .nav-section { margin-bottom: 2rem; }
//         .nav-section-title {
//           font-size: 0.875rem;
//           font-weight: 600;
//           color: #6b7280;
//           text-transform: uppercase;
//           letter-spacing: 0.05em;
//           margin: 0 0 0.75rem 1.5rem;
//         }
//         .nav-list { list-style: none; margin: 0; padding: 0; }
//         .nav-item { margin: 0; }
//         .nav-button {
//           width: 100%;
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           padding: 0.75rem 1.5rem;
//           border: none;
//           background: none;
//           color: #374151;
//           font-size: 1rem;
//           font-weight: 500;
//           cursor: pointer;
//           transition: all 0.2s ease-in-out;
//           text-align: left;
//         }
//         .nav-button:hover {
//           background-color: #f3f4f6;
//           color: #2563eb;
//         }
//         .nav-button-active {
//           background-color: #eff6ff;
//           color: #2563eb;
//           border-right: 3px solid #2563eb;
//         }
//         .nav-icon {
//           font-size: 1rem;
//           width: 1.25rem;
//           text-align: center;
//         }
//         .nav-text { flex: 1; }
//         .user-profile {
//           padding: 1.5rem;
//           border-top: 1px solid #e5e7eb;
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//         }
//         .user-avatar {
//           width: 2.5rem;
//           height: 2.5rem;
//           background-color: #6b7280;
//           color: white;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-weight: bold;
//           font-size: 0.875rem;
//         }
//         .user-info { flex: 1; }
//         .user-name {
//           font-size: 0.875rem;
//           font-weight: 600;
//           color: #111827;
//           margin: 0;
//         }
//         .user-role {
//           font-size: 0.75rem;
//           color: #6b7280;
//           margin: 0;
//         }
//         .mobile-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background-color: rgba(0, 0, 0, 0.5);
//           z-index: 999;
//         }
//         .main-content {
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//           min-height: 100vh;
//           margin-left: 280px;
//         }
//         .main-content-mobile { margin-left: 0; }
//         .header {
//           background-color: white;
//           border-bottom: 1px solid #e5e7eb;
//           padding: 1rem 2rem;
//           position: sticky;
//           top: 0;
//           z-index: 100;
//         }
//         @media (max-width: 768px) {

//           .header { padding: 1rem; padding-top: 4rem; }
//         }
//         .header-content {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//         }
//         .page-title {
//           font-size: 1.5rem;
//           font-weight: bold;
//           color: #111827;
//           margin: 0;
//         }
//         @media (max-width: 768px) {
//           .page-title { font-size: 1.25rem; }
//         }
//         .header-actions {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//         }
//         .notification-button {
//           position: relative;
//           background: none;
//           border: none;
//           cursor: pointer;
//           padding: 0.5rem;
//           border-radius: 0.5rem;
//           transition: background-color 0.2s ease-in-out;
//         }
//         .notification-button:hover { background-color: #f3f4f6; }
//         .notification-icon { font-size: 1.25rem; }
//         .notification-badge {
//           position: absolute;
//           top: 0.25rem;
//           right: 0.25rem;
//           background-color: #ef4444;
//           color: white;
//           font-size: 0.75rem;
//           font-weight: bold;
//           padding: 0.125rem 0.375rem;
//           border-radius: 0.75rem;
//           min-width: 1.25rem;
//           text-align: center;
//         }
//         .content { flex: 1; padding: 2rem; }
//         @media (max-width: 768px) {
//           .content { 
//           height:100vh;
//           padding: 1rem; }
//         }
//         .content-wrapper { max-width: 100%; }
//       `}</style>
//     </div>
//   );
// };

// export default ResponsiveDashboard;


import React, { useState, useEffect } from 'react';
import styles from './DashboardCopyRaghav.module.css'; // Assuming you have a CSS module for styles

// import UploadBanner from './UploadBannerCopy1';
import UploadBanner from './UploadBannerManjul';
import BulkUploadcopy from './BulkUploadcopy';
import BannerListcopy from './BannerListCopyUpdated';

const ResponsiveDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('upload');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setMobileOpen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      component: <BannerListcopy />
    },
    {
      id: 'bulk',
      name: 'Bulk Upload',
      icon: '📁',
      component: <BulkUploadcopy />
    }
  ];

  const activeItem = menuItems.find(item => item.id === activeComponent);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleNavClick = (itemId) => {
    setActiveComponent(itemId);
    setMobileOpen(false);
  };

  return (
    <div className={`${styles.dashboard} ${
      activeComponent === 'list' ? styles.noBackground : styles.withBackground
    }`}>
      {isMobile && (
        <button 
          className={styles.mobileMenuButton}
          onClick={handleDrawerToggle}
        >
          <span className={styles.hamburger}>☰</span>
        </button>
      )}

      <div className={`${styles.sidebar} ${isMobile ? (mobileOpen ? styles.sidebarOpen : styles.sidebarClosed) : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}></div>
          </div>
        </div>

        <nav className={styles.navigation}>
          <div className={styles.navSection}>
            <h3 className={styles.navSectionTitle}>Banner Management</h3>
            <ul className={styles.navList}>
              {menuItems.map((item) => (
                <li key={item.id} className={styles.navItem}>
                  <button
                    className={`${styles.navButton} ${activeComponent === item.id ? styles.navButtonActive : ''}`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <span className={styles.navIcon}>{item.icon}</span>
                    <span className={styles.navText}>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className={styles.userProfile}>
          <div className={styles.userAvatar}>U</div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>Admin User</p>
            <p className={styles.userRole}>Administrator</p>
          </div>
        </div>
      </div>

      {mobileOpen && isMobile && (
        <div 
          className={styles.mobileOverlay}
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className={`${styles.mainContent} ${isMobile ? styles.mainContentMobile : ''}`}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.pageTitle}>{activeItem?.name}</h1>
            {/* <div className={styles.headerActions}>
              <button className={styles.notificationButton}>
                <span className={styles.notificationIcon}>🔔</span>
                <span className={styles.notificationBadge}>3</span>
              </button>
            </div> */}
            <div className={styles.headerActions}>
  <button
    className={styles.logoutButton}
    onClick={() => {
      localStorage.removeItem('authToken'); // Adjust key name as needed
      window.location.href = '/login'; // Redirect to login page
    }}
  >
    Logout
  </button>
</div>

          </div>
        </header>

        <main className={styles.content}>
          <div className={styles.contentWrapper}>
            {activeItem?.component}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ResponsiveDashboard;
