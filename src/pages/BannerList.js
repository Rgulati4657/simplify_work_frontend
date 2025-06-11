// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function BannerList() {
//   const [banners, setBanners] = useState([]);
//   const [filters, setFilters] = useState({
//     clientId: '',
//     panId: '',
//     channel: ''
//   });

//   const fetchBanners = async () => {
//     const query = new URLSearchParams(filters).toString();
//     const { data } = await axios.get(`/api/banners?${query}`);
//     setBanners(data);
//   };

//   useEffect(() => {
//     if (filters.clientId && filters.panId && filters.channel) {
//       fetchBanners();
//     }
//   }, [filters]);

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setFilters(prev => ({ ...prev, [name]: value }));
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`/api/banners/${id}`);
//     fetchBanners();
//   };

//   const getStatus = (valid_from, valid_to) => {
//     const now = new Date();
//     const from = new Date(valid_from);
//     const to = new Date(valid_to);
//     if (now < from) return "Upcoming";
//     if (now > to) return "Expired";
//     return "Active";
//   };

//   return (
//     <div>
//       <h2>Banner List</h2>
//       <input name="clientId" placeholder="Client ID" onChange={handleChange} />
//       <input name="panId" placeholder="PAN ID" onChange={handleChange} />
//       <input name="channel" placeholder="Channel" onChange={handleChange} />
//       <button onClick={fetchBanners}>Filter</button>

//       <table border="1" cellPadding="8" style={{ marginTop: '20px' }}>
//         <thead>
//           <tr>
//             <th>Banner ID</th>
//             <th>Client ID</th>
//             <th>Channel</th>
//             <th>Status</th>
//             <th>Image</th>
//             <th>Priority</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {banners.length === 0 && <tr><td colSpan="7">No Banners Found</td></tr>}
//           {banners.map((b, idx) => (
//             <tr key={idx}>
//               <td>{b.banner_id}</td>
//               <td>{b.client_id}</td>
//               <td>{b.channel}</td>
//               <td>{getStatus(b.valid_from, b.valid_to)}</td>
//               <td><img src={b.image_url} alt="" width="100" /></td>
//               <td>{b.priority}</td>
//               <td><button onClick={() => handleDelete(b.banner_id)}>Delete</button></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default BannerList;

// import React, { useEffect, useState, useCallback } from 'react';
// import axios from 'axios';
// import styles from './BannerList.module.css'; // Changed import

// function BannerList() {
//   const [banners, setBanners] = useState([]);
//   const [filters, setFilters] = useState({
//     clientId: '',
//     panId: '',
//     channel: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchBanners = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const query = new URLSearchParams(filters).toString();
//       const { data } = await axios.get(`/api/banners?${query}`);
//       setBanners(data);
//     } catch (err) {
//       console.error("Error fetching banners:", err);
//       setError("Failed to load banners. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }, [filters]);

//   useEffect(() => {
//     // Only fetch if at least one filter is provided or on initial load if no filters are required for initial fetch
//     if (filters.clientId || filters.panId || filters.channel) {
//       fetchBanners();
//     }
//   }, [filters, fetchBanners]);

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setFilters(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFilterClick = () => {
//     fetchBanners();
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this banner?")) {
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     try {
//       await axios.delete(`/api/banners/${id}`);
//       fetchBanners(); // Re-fetch banners to update the list
//     } catch (err) {
//       console.error("Error deleting banner:", err);
//       setError("Failed to delete banner. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatus = (valid_from, valid_to) => {
//     const now = new Date();
//     const from = new Date(valid_from);
//     const to = new Date(new Date(valid_to).setHours(23, 59, 59, 999)); // End of day for 'to' date

//     if (now < from) return <span className={styles.statusUpcoming}>Upcoming</span>; // Using styles.statusUpcoming
//     if (now > to) return <span className={styles.statusExpired}>Expired</span>;     // Using styles.statusExpired
//     return <span className={styles.statusActive}>Active</span>;               // Using styles.statusActive
//   };

//   return (
//     <div className={styles.bannerListContainer}> {/* Using styles.bannerListContainer */}
//       <h1>Banner Management</h1>

//       <div className={styles.filterSection}> {/* Using styles.filterSection */}
//         <input
//           name="clientId"
//           placeholder="Client ID"
//           value={filters.clientId}
//           onChange={handleChange}
//           aria-label="Client ID filter"
//         />
//         <input
//           name="panId"
//           placeholder="PAN ID"
//           value={filters.panId}
//           onChange={handleChange}
//           aria-label="PAN ID filter"
//         />
//         <input
//           name="channel"
//           placeholder="Channel"
//           value={filters.channel}
//           onChange={handleChange}
//           aria-label="Channel filter"
//         />
//         <button onClick={handleFilterClick} className={styles.filterButton} disabled={loading}> {/* Using styles.filterButton */}
//           {loading ? 'Filtering...' : 'Apply Filters'}
//         </button>
//         <button onClick={() => setFilters({ clientId: '', panId: '', channel: '' })} className={styles.clearFiltersButton} disabled={loading}> {/* Using styles.clearFiltersButton */}
//           Clear Filters
//         </button>
//       </div>

//       {error && <p className={styles.errorMessage}>{error}</p>} {/* Using styles.errorMessage */}

//       {loading && <p className={styles.loadingMessage}>Loading banners...</p>} {/* Using styles.loadingMessage */}

//       {!loading && banners.length === 0 && !error && (
//         <p className={styles.noBannersMessage}>No banners found with the current filters.</p> // Using styles.noBannersMessage
//       )}

//       {!loading && banners.length > 0 && (
//         <div className={styles.tableResponsive}> {/* Using styles.tableResponsive */}
//           <table className={styles.bannerTable}> {/* Using styles.bannerTable */}
//             <thead>
//               <tr>
//                 <th>Banner ID</th>
//                 <th>Client ID</th>
//                 <th>Channel</th>
//                 <th>Status</th>
//                 <th>Image</th>
//                 <th>Priority</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {banners.map((b) => (
//                 <tr key={b.banner_id}>
//                   <td>{b.banner_id}</td>
//                   <td>{b.client_id}</td>
//                   <td>{b.channel}</td>
//                   <td>{getStatus(b.valid_from, b.valid_to)}</td>
//                   <td className={styles.imageCell}> {/* Using styles.imageCell */}
//                     {b.image_url ? (
//                       <img src={b.image_url} alt={`Banner ${b.banner_id}`} className={styles.bannerThumbnail} /> // Using styles.bannerThumbnail
//                     ) : (
//                       <span>No Image</span>
//                     )}
//                   </td>
//                   <td>{b.priority}</td>
//                   <td>
//                     <button onClick={() => handleDelete(b.banner_id)} className={styles.deleteButton} disabled={loading}> {/* Using styles.deleteButton */}
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default BannerList;
// better one 

// import React, { useEffect, useState, useCallback } from 'react';
// import axios from 'axios';
// import styles from './BannerList1.module.css'; // Still importing styles object

// function BannerList() {
//   const [banners, setBanners] = useState([]);
//   const [filters, setFilters] = useState({
//     clientId: '',
//     panId: '',
//     channel: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchBanners = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const query = new URLSearchParams(filters).toString();
//       const { data } = await axios.get(`/api/banners?${query}`);
//       setBanners(data);
//     } catch (err) {
//       console.error("Error fetching banners:", err);
//       setError("Failed to load banners. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }, [filters]);

//   useEffect(() => {
//     if (filters.clientId || filters.panId || filters.channel) {
//       fetchBanners();
//     }
//   }, [filters, fetchBanners]);

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setFilters(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFilterClick = () => {
//     fetchBanners();
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this banner?")) {
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     try {
//       await axios.delete(`/api/banners/${id}`);
//       fetchBanners(); // Re-fetch banners to update the list
//     } catch (err) {
//       console.error("Error deleting banner:", err);
//       setError("Failed to delete banner. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatus = (valid_from, valid_to) => {
//     const now = new Date();
//     const from = new Date(valid_from);
//     const to = new Date(new Date(valid_to).setHours(23, 59, 59, 999));

//     if (now < from) return <span className={styles.statusUpcoming}>Upcoming</span>;
//     if (now > to) return <span className={styles.statusExpired}>Expired</span>;
//     return <span className={styles.statusActive}>Active</span>;
//   };

//   return (
//     <div className={styles.bannerListContainer}>
//       <h1>Banner Management</h1>

//       <div className={styles.filterSection}>
//         <input
//           name="clientId"
//           placeholder="Client ID"
//           value={filters.clientId}
//           onChange={handleChange}
//           aria-label="Client ID filter"
//         />
//         <input
//           name="panId"
//           placeholder="PAN ID"
//           value={filters.panId}
//           onChange={handleChange}
//           aria-label="PAN ID filter"
//         />
//         <input
//           name="channel"
//           placeholder="Channel"
//           value={filters.channel}
//           onChange={handleChange}
//           aria-label="Channel filter"
//         />
//         <button onClick={handleFilterClick} className={styles.filterButton} disabled={loading}>
//           {loading ? 'Filtering...' : 'Apply Filters'}
//         </button>
//         <button onClick={() => setFilters({ clientId: '', panId: '', channel: '' })} className={styles.clearFiltersButton} disabled={loading}>
//           Clear Filters
//         </button>
//       </div>

//       {error && <p className={styles.errorMessage}>{error}</p>}

//       {loading && <p className={styles.loadingMessage}>Loading banners...</p>}

//       {!loading && banners.length === 0 && !error && (
//         <p className={styles.noBannersMessage}>No banners found with the current filters.</p>
//       )}

//       {!loading && banners.length > 0 && (
//         <div className={styles.tableResponsive}>
//           <table className={styles.bannerTable}>
//             <thead>
//               <tr>
//                 <th>Banner ID</th>
//                 <th>Client ID</th>
//                 <th>Channel</th>
//                 <th>Status</th>
//                 <th>Image</th>
//                 <th>Priority</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {banners.map((b) => (
//                 <tr key={b.banner_id}>
//                   <td>{b.banner_id}</td>
//                   <td>{b.client_id}</td>
//                   <td>{b.channel}</td>
//                   <td>{getStatus(b.valid_from, b.valid_to)}</td>
//                   <td className={styles.imageCell}>
//                     {b.image_url ? (
//                       <img src={b.image_url} alt={`Banner ${b.banner_id}`} className={styles.bannerThumbnail} />
//                     ) : (
//                       <span>No Image</span>
//                     )}
//                   </td>
//                   <td>{b.priority}</td>
//                   <td>
//                     <button onClick={() => handleDelete(b.banner_id)} className={styles.deleteButton} disabled={loading}>
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default BannerList;
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import styles from './BannerList.module.css'; // Importing styles object

function BannerList() {
  const [banners, setBanners] = useState([]);
  const [filters, setFilters] = useState({
    clientId: '',
    panId: '',
    channel: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBanners = useCallback(async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const query = new URLSearchParams(filters).toString();
      const { data } = await axios.get(`/api/banners?${query}`);
      setBanners(data);
      // If data is empty after fetch, ensure error is cleared if it was set by previous fetch attempt
      if (data.length === 0) {
        setError(null);
      }
    } catch (err) {
      console.error("Error fetching banners:", err);
      setError("Failed to load banners. Please try again.");
      setBanners([]); // Clear banners on error to prevent displaying stale data
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    // Initial fetch when component mounts or filters are applied
    // We can fetch all on initial load if no filters are set, or only when filters are applied.
    // For this example, let's trigger a fetch if filters change OR if it's the very first load and no filters are set.
    // A simple way to ensure initial fetch:
    fetchBanners();
  }, [fetchBanners]);


  const handleChange = e => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterClick = () => {
    fetchBanners(); // Explicitly call fetch when filter button is clicked
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/api/banners/${id}`);
      fetchBanners(); // Re-fetch banners to update the list
    } catch (err) {
      console.error("Error deleting banner:", err);
      setError("Failed to delete banner. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatus = (valid_from, valid_to) => {
    const now = new Date();
    const from = new Date(valid_from);
    const to = new Date(new Date(valid_to).setHours(23, 59, 59, 999));

    if (now < from) return <span className={styles.statusUpcoming}>Upcoming</span>;
    if (now > to) return <span className={styles.statusExpired}>Expired</span>;
    return <span className={styles.statusActive}>Active</span>;
  };

  return (
    <div className={styles.bannerListContainer}>
      <h1>Banner Management</h1>

      <div className={styles.filterSection}>
        <input
          name="clientId"
          placeholder="Client ID"
          value={filters.clientId}
          onChange={handleChange}
          aria-label="Client ID filter"
        />
        <input
          name="panId"
          placeholder="PAN ID"
          value={filters.panId}
          onChange={handleChange}
          aria-label="PAN ID filter"
        />
        <input
          name="channel"
          placeholder="Channel"
          value={filters.channel}
          onChange={handleChange}
          aria-label="Channel filter"
        />
        <button onClick={handleFilterClick} className={styles.filterButton} disabled={loading}>
          {loading ? 'Filtering...' : 'Apply Filters'}
        </button>
        <button onClick={() => setFilters({ clientId: '', panId: '', channel: '' })} className={styles.clearFiltersButton} disabled={loading}>
          Clear Filters
        </button>
      </div>

      {/* The error message above the table is still useful for prominent feedback */}
      {/* {error && <p className={styles.errorMessage}>{error}</p>}  */}

      {/* The table structure is always rendered */}
      <div className={styles.tableResponsive}>
        <table className={styles.bannerTable}>
          <thead>
            <tr>
              <th>Banner ID</th>
              <th>Client ID</th>
              <th>Channel</th>
              <th>Status</th>
              <th>Image</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className={styles.tableMessageCell}>Loading banners...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="7" className={`${styles.tableMessageCell} ${styles.tableErrorMessage}`}>
                  {error}
                </td>
              </tr>
            ) : banners.length === 0 ? (
              <tr>
                <td colSpan="7" className={styles.tableMessageCell}>No Banners Found</td>
              </tr>
            ) : (
              // Render banner rows if data is available
              banners.map((b) => (
                <tr key={b.banner_id}>
                  <td>{b.banner_id}</td>
                  <td>{b.client_id}</td>
                  <td>{b.channel}</td>
                  <td>{getStatus(b.valid_from, b.valid_to)}</td>
                  <td className={styles.imageCell}>
                    {b.image_url ? (
                      <img src={b.image_url} alt={`Banner ${b.banner_id}`} className={styles.bannerThumbnail} />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td>{b.priority}</td>
                  <td>
                    <button onClick={() => handleDelete(b.banner_id)} className={styles.deleteButton} disabled={loading}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BannerList;