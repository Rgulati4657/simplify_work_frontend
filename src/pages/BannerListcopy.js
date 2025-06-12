// import React, { useEffect, useState, useCallback } from 'react';
// import axios from 'axios';
// import styles from './BannerListcopy.module.css';

// function BannerListcopy() {
//   const [banners, setBanners] = useState([]);
//   const [filters, setFilters] = useState({ clientId: '', panId: '', channel: '' });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchBanners = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const query = new URLSearchParams(filters).toString();
//       const { data } = await axios.get(`/api/banners?${query}`);
//       setBanners(data);
//       if (data.length === 0) setError(null);
//     } catch (err) {
//       console.error("Error fetching banners:", err);
//       setError("Failed to load banners. Please try again.");
//       setBanners([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [filters]);

//   useEffect(() => { fetchBanners(); }, [fetchBanners]);

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setFilters(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFilterClick = () => fetchBanners();
//   const handleClearFilters = () => setFilters({ clientId: '', panId: '', channel: '' });

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this banner?")) return;
//     setLoading(true);
//     setError(null);
//     try {
//       await axios.delete(`/api/banners/${id}`);
//       fetchBanners();
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
//         />
//         <input
//           name="panId"
//           placeholder="PAN ID"
//           value={filters.panId}
//           onChange={handleChange}
//         />
//         <input
//           name="channel"
//           placeholder="Channel"
//           value={filters.channel}
//           onChange={handleChange}
//         />
//         <button
//           onClick={handleFilterClick}
//           className={styles.filterButton}
//           disabled={loading}
//         >
//           {loading ? 'Filtering...' : 'Apply Filters'}
//         </button>
//         <button
//           onClick={handleClearFilters}
//           className={styles.clearFiltersButton}
//           disabled={loading}
//         >
//           Clear Filters
//         </button>
//       </div>

//       {error && <p className={styles.errorMessage}>{error}</p>}

//       <div className={styles.tableResponsive}>
//         <table className={styles.bannerTable}>
//           <thead>
//             <tr>
//               <th>Banner ID</th>
//               <th>Client ID</th>
//               <th>Channel</th>
//               <th>Status</th>
//               <th>Image</th>
//               <th>Priority</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr><td colSpan="7" className={styles.tableMessageCell}>Loading banners...</td></tr>
//             ) : banners.length === 0 ? (
//               <tr><td colSpan="7" className={styles.tableMessageCell}>No Banners Found</td></tr>
//             ) : (
//               banners.map(b => (
//                 <tr key={b.banner_id}>
//                   <td>{b.banner_id}</td>
//                   <td>{b.client_id}</td>
//                   <td>{b.channel}</td>
//                   <td>{getStatus(b.valid_from, b.valid_to)}</td>
//                   <td className={styles.imageCell}>
//                     {b.image_url
//                       ? <img src={b.image_url} alt={`Banner ${b.banner_id}`} className={styles.bannerThumbnail} />
//                       : <span>No Image</span>}
//                   </td>
//                   <td>{b.priority}</td>
//                   <td>
//                     <button
//                       onClick={() => handleDelete(b.banner_id)}
//                       className={styles.deleteButton}
//                       disabled={loading}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default BannerListcopy;












import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import styles from './BannerListcopy.module.css';

function BannerListcopy() {
  const [banners, setBanners] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingBanner, setEditingBanner] = useState(null);
  const { REACT_APP_API_BASE_URL } = process.env;

  const fetchBanners = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams(filters).toString();
      const token = localStorage.getItem("authToken");
      const { data } = await axios.get(
        `${REACT_APP_API_BASE_URL}/api/banners${query ? `?${query}` : ''}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log("Fetched banners:", data);
      setBanners(data);
      if (data.length === 0) setError(null);
    } catch (err) {
      console.error("Error fetching banners:", err);
      setError("Failed to load banners. Please try again.");
      setBanners([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchBanners(); }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterClick = () => fetchBanners();

  const handleClearFilters = () => setFilters({ clientId: '', panId: '', channel: '' });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${REACT_APP_API_BASE_URL}/api/banners/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBanners();
    } catch (err) {
      console.error("Error deleting banner:", err);
      setError("Failed to delete banner. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (banner) => {
    setEditingBanner({
      bannerId: banner.bannerId || banner.banner_id,
      priority: banner.priority?.toString() || '3',
      clickAction: banner.clickAction || '',
      status: banner.status || 'active'
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingBanner((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    const bannerId = editingBanner.bannerId || editingBanner.banner_id;
    const { priority, clickAction, status } = editingBanner;
    const token = localStorage.getItem("authToken");
    const payload = {
      priority: Number(priority),
      clickAction,
      status,
    };

    setLoading(true);
    try {
      console.log("Sending update for:", bannerId, payload);
      await axios.put(`${REACT_APP_API_BASE_URL}/api/banners/${bannerId}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingBanner(null);
      fetchBanners();
    } catch (err) {
      console.error("Error updating banner:", err);
      alert("Failed to update banner.");
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
        <input name="clientId" placeholder="Client ID" value={filters.clientId || ''} onChange={handleChange} />
        <input name="panId" placeholder="PAN ID" value={filters.panId || ''} onChange={handleChange} />
        <input name="channel" placeholder="Channel" value={filters.channel || ''} onChange={handleChange} />
        <button onClick={handleFilterClick} className={styles.filterButton} disabled={loading}>
          {loading ? 'Filtering...' : 'Apply Filters'}
        </button>
        <button onClick={handleClearFilters} className={styles.clearFiltersButton} disabled={loading}>
          Clear Filters
        </button>
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}

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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className={styles.tableMessageCell}>Loading banners...</td></tr>
            ) : banners.length === 0 ? (
              <tr><td colSpan="7" className={styles.tableMessageCell}>No Banners Found</td></tr>
            ) : (
              banners.map(b => (
                <tr key={b.banner_id || b.bannerId}>
                  <td>{b.bannerId}</td>
                  <td>{b.clientId}</td>
                  <td>{b.channel}</td>
                  <td>{getStatus(b.valid_from, b.valid_to)}</td>
                  <td className={styles.imageCell}>
                    {b.image_url
                      ? <img src={b.image_url} alt={`Banner ${b.bannerId}`} className={styles.bannerThumbnail} />
                      : <span>No Image</span>}
                  </td>
                  <td>{b.priority}</td>
                  <td>
                    <button onClick={() => handleEditClick(b)} className={styles.editButton} disabled={loading}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(b.bannerId)} className={styles.deleteButton} disabled={loading}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingBanner && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h2>Edit Banner</h2>
            <label>
              Priority:
              <select name="priority" value={editingBanner.priority} onChange={handleEditChange}>
                <option value="1">High (1)</option>
                <option value="2">Medium (2)</option>
                <option value="3">Low (3)</option>
              </select>
            </label>
            <label>
              Click Action URL:
              <input type="url" name="clickAction" value={editingBanner.clickAction || ''} onChange={handleEditChange} />
            </label>
            <label>
              Status:
              <select name="status" value={editingBanner.status} onChange={handleEditChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>
            <div className={styles.modalActions}>
              <button onClick={handleEditSave} className={styles.saveButton}>Save</button>
              <button onClick={() => setEditingBanner(null)} className={styles.cancelButton}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BannerListcopy;



























// finalized code snippet for BannerListcopy.js
// import React, { useEffect, useState, useCallback } from 'react';
// import axios from 'axios';
// import styles from './BannerListcopy.module.css';

// function BannerListcopy() {
//   const [banners, setBanners] = useState([]);
//   // const [filters, setFilters] = useState({ clientId: '', panId: '', channel: '' });
//   const [filters, setFilters] = useState({ });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [editingBanner, setEditingBanner] = useState(null); // for edit modal
// const { REACT_APP_API_BASE_URL } = process.env;
//   const fetchBanners = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const query = new URLSearchParams(filters).toString();
//       // const { data } = await axios.get(`${REACT_APP_API_BASE_URL}/api/banners?${query? `?${query}` : ''}`);
//       const token = localStorage.getItem("authToken");
// const { data } = await axios.get(`${REACT_APP_API_BASE_URL}/api/banners${query ? `?${query}` : ''}`, {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });
//       console.log("Fetched banners:", data);
//       setBanners(data);
//       if (data.length === 0) setError(null);
//     } catch (err) {
//       console.error("Error fetching banners:", err);
//       setError("Failed to load banners. Please try again.");
//       setBanners([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [filters]);

//   useEffect(() => { fetchBanners(); }, []);

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setFilters(prev => ({ ...prev, [name]: value }));
//   };

//   // const handleFilterClick = () => fetchBanners();
//   const handleFilterClick = () => {
//   fetchBanners(); // manually call it when user clicks
// };

//   const handleClearFilters = () => setFilters({ clientId: '', panId: '', channel: '' });

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this banner?")) return;
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("authToken");
//       await axios.delete(`${REACT_APP_API_BASE_URL}/api/banners/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       // await axios.delete(`/api/banners/${id}`);
//       fetchBanners();
//     } catch (err) {
//       console.error("Error deleting banner:", err);
//       setError("Failed to delete banner. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditClick = (banner) => {
//     setEditingBanner({ ...banner,
//       priority: banner.priority.toString(), // dropdown expects string
//   clickAction: banner.clickAction || '',
//   status: banner.status || 'active' }); // Clone for editing
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditingBanner((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEditSave = async () => {
//     const { banner_Id, ...rest } = editingBanner;
//     // setLoading(true);

//     const token = localStorage.getItem("authToken");
//     setLoading(true);
//     try {
//       console.log("Sending update for:", bannerId, rest);
//       await axios.put(`${REACT_APP_API_BASE_URL}/api/banners/${banner_Id}`, rest, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//       setEditingBanner(null);
//       fetchBanners();
//     } catch (err) {
//       console.error("Error updating banner:", err);
//       alert("Failed to update banner.");
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
//         <input name="clientId" placeholder="Client ID" value={filters.clientId} onChange={handleChange} />
//         <input name="panId" placeholder="PAN ID" value={filters.panId} onChange={handleChange} />
//         <input name="channel" placeholder="Channel" value={filters.channel} onChange={handleChange} />
//         <button onClick={handleFilterClick} className={styles.filterButton} disabled={loading}>
//           {loading ? 'Filtering...' : 'Apply Filters'}
//         </button>
//         <button onClick={handleClearFilters} className={styles.clearFiltersButton} disabled={loading}>
//           Clear Filters
//         </button>
//       </div>

//       {error && <p className={styles.errorMessage}>{error}</p>}

//       <div className={styles.tableResponsive}>
//         <table className={styles.bannerTable}>
//           <thead>
//             <tr>
//               <th>Banner ID</th>
//               <th>Client ID</th>
//               <th>Channel</th>
//               <th>Status</th>
//               <th>Image</th>
//               <th>Priority</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr><td colSpan="7" className={styles.tableMessageCell}>Loading banners...</td></tr>
//             ) : banners.length === 0 ? (
//               <tr><td colSpan="7" className={styles.tableMessageCell}>No Banners Found</td></tr>
//             ) : (
//               banners.map(b => (
//                 <tr key={b.banner_id}>
//                   {/* <td>{b.banner_id}</td> */}
//                   {/* <td>{b.client_id}</td> */}
//                   <td>{b.bannerId}</td>
//                   <td>{b.clientId}</td>
//                   <td>{b.channel}</td>
//                   <td>{getStatus(b.valid_from, b.valid_to)}</td>
//                   <td className={styles.imageCell}>
//                     {b.image_url
//                       ? <img src={b.image_url} alt={`Banner ${b.bannerId}`} className={styles.bannerThumbnail} />
//                       : <span>No Image</span>}
//                   </td>
//                   <td>{b.priority}</td>
//                   <td>
//                     <button onClick={() => handleEditClick(b)} className={styles.editButton} disabled={loading}>
//                       Edit
//                     </button>
//                     <button onClick={() => handleDelete(b.bannerId)} className={styles.deleteButton} disabled={loading}>
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Edit Modal */}
//       {editingBanner && (
//         <div className={styles.modalBackdrop}>
//           <div className={styles.modal}>
//             <h2>Edit Banner</h2>
//             <label>
//               Priority:
//               <select name="priority" value={editingBanner.priority} onChange={handleEditChange}>
//                 <option value="1">High (1)</option>
//                 <option value="2">Medium (2)</option>
//                 <option value="3">Low (3)</option>
//               </select>
//             </label>
//             <label>
//               Click Action URL:
//               <input type="url" name="clickAction" value={editingBanner.clickAction || ''} onChange={handleEditChange} />
//             </label>
//             <label>
//               Status:
//               <select name="status" value={editingBanner.status} onChange={handleEditChange}>
//                 <option value="active">Active</option>
//                 <option value="inactive">Inactive</option>
//               </select>
//             </label>
//             <div className={styles.modalActions}>
//               <button onClick={handleEditSave} className={styles.saveButton}>Save</button>
//               <button onClick={() => setEditingBanner(null)} className={styles.cancelButton}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default BannerListcopy;
