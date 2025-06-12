// import React, { useEffect, useState, useCallback } from 'react';
// import axios from 'axios';
// import styles from './BannerListcopy.module.css';

// function BannerListcopy() {
//   const [banners, setBanners] = useState([]);
//   const [filters, setFilters] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [editingBanner, setEditingBanner] = useState(null);
//   const { REACT_APP_API_BASE_URL } = process.env;

//   const fetchBanners = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const query = new URLSearchParams(filters).toString();
//       const token = localStorage.getItem("authToken");
//       const { data } = await axios.get(
//         `${REACT_APP_API_BASE_URL}/api/banners${query ? `?${query}` : ''}`,
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );
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

//   const handleFilterClick = () => fetchBanners();

//   const handleClearFilters = () => setFilters({ clientId: '', panId: '', channel: '' });

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this banner?")) return;
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("authToken");
//       await axios.delete(`${REACT_APP_API_BASE_URL}/api/banners/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       fetchBanners();
//     } catch (err) {
//       console.error("Error deleting banner:", err);
//       setError("Failed to delete banner. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditClick = (banner) => {
//     setEditingBanner({
//       bannerId: banner.bannerId || banner.banner_id,
//       clientId: banner.clientId,
//       panId: banner.panId,
//       channel: banner.channel,
//       status: banner.status || 'active'
//     });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditingBanner((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEditSave = async () => {
//     const { bannerId, clientId, panId, channel, status } = editingBanner;
//     const token = localStorage.getItem("authToken");

//     const payload = {
//       clientId,
//       panId,
//       channel,
//       status
//     };

//     setLoading(true);
//     try {
//       await axios.put(`${REACT_APP_API_BASE_URL}/api/banners/${bannerId}`, payload, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
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
//         <input name="clientId" placeholder="Client ID" value={filters.clientId || ''} onChange={handleChange} />
//         <input name="panId" placeholder="PAN ID" value={filters.panId || ''} onChange={handleChange} />
//         <input name="channel" placeholder="Channel" value={filters.channel || ''} onChange={handleChange} />
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
//               <th>PAN ID</th>
//               <th>Channel</th>
//               <th>Status</th>
//               <th>Image</th>
//               <th>Priority</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr><td colSpan="8" className={styles.tableMessageCell}>Loading banners...</td></tr>
//             ) : banners.length === 0 ? (
//               <tr><td colSpan="8" className={styles.tableMessageCell}>No Banners Found</td></tr>
//             ) : (
//               banners.map(b => (
//                 <tr key={b.banner_id || b.bannerId}>
//                   <td>{b.bannerId}</td>
//                   <td>{b.clientId}</td>
//                   <td>{b.panId}</td>
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
//               Client ID:
//               <input type="text" name="clientId" value={editingBanner.clientId} onChange={handleEditChange} />
//             </label>
//             <label>
//               PAN ID:
//               <input type="text" name="panId" value={editingBanner.panId} onChange={handleEditChange} />
//             </label>
//             <label>
//               Channel:
//               <input type="text" name="channel" value={editingBanner.channel} onChange={handleEditChange} />
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
      const { data } = await axios.get(`${REACT_APP_API_BASE_URL}/api/banners${query ? `?${query}` : ''}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

  const handleFilterClick = () => {
    fetchBanners();
  };

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
      bannerId: banner.bannerId,
      clientId: banner.clientId,
      panId: banner.panId,
      channel: banner.channel,
      status: banner.status || 'inactive',
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingBanner((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    const { bannerId, ...payload } = editingBanner;
    const token = localStorage.getItem("authToken");
    setLoading(true);
    try {
      await axios.put(`${REACT_APP_API_BASE_URL}/api/banners/${bannerId}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingBanner(null);
    //   fetchBanners();
    setBanners(prev =>
  prev.map(b => b.bannerId === editingBanner.bannerId ? { ...b, ...editingBanner } : b)
);
setEditingBanner(null);
    } catch (err) {
      console.error("Error updating banner:", err);
      alert("Failed to update banner.");
    } finally {
      setLoading(false);
    }
  };

//   const getStatus = (valid_from, valid_to) => {
//     const now = new Date();
//     const from = new Date(valid_from);
//     const to = new Date(new Date(valid_to).setHours(23, 59, 59, 999));
//     if (now < from) return <span className={styles.statusUpcoming}>Upcoming</span>;
//     if (now > to) return <span className={styles.statusExpired}>Expired</span>;
//     return <span className={styles.statusActive}>Active</span>;
//   };

  return (
    <div className={styles.bannerListContainer}>
      <h1>Banner Management</h1>

      <div className={styles.filterSection}>
        <input name="clientId" placeholder="Client ID" value={filters.clientId} onChange={handleChange} />
        <input name="panId" placeholder="PAN ID" value={filters.panId} onChange={handleChange} />
        {/* <input name="channel" placeholder="Channel" value={filters.channel} onChange={handleChange} /> */}
        <select name="channel" value={filters.channel} onChange={handleChange} className={styles.select}>
  <option value="">Select channel</option>
  <option value="web">Web</option>
  <option value="mobile">Mobile</option>
  <option value="email">Email</option>
  <option value="social media">Social Media</option>
</select>


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
              <th>PAN ID</th>
              <th>Channel</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className={styles.tableMessageCell}>Loading banners...</td></tr>
            ) : banners.length === 0 ? (
              <tr><td colSpan="6" className={styles.tableMessageCell}>No Banners Found</td></tr>
            ) : (
              banners.map(b => (
                <tr key={b.bannerId}>
                  <td>{b.bannerId}</td>
                  <td>{b.clientId}</td>
                  <td>{b.panId}</td>
                  <td>{b.channel}</td>
                  {/* <td>{getStatus(b.valid_from, b.valid_to)}</td> */}
                    <td>
                        {b.status === 'active' ? (
                        <span className={styles.statusActive}>Active</span>
                        ) : (
                        <span className={styles.statusInactive}>Inactive</span>
                        )}
                  </td>
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

      {editingBanner && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalWhiteBlue}>
            <h2>Edit Banner</h2>
            <label>Client ID:
              <input name="clientId" value={editingBanner.clientId} onChange={handleEditChange} />
            </label>
            <label>PAN ID:
              <input name="panId" value={editingBanner.panId} onChange={handleEditChange} />
            </label>
            {/* <label>Channel:
              <input name="channel" value={editingBanner.channel} onChange={handleEditChange} />
            </label> */}
            <label>Channel:
              <select name="channel" value={editingBanner.channel} onChange={handleEditChange} className={styles.select}>
                <option value="">Select channel</option>
                <option value="web">Web</option>
                <option value="mobile">Mobile</option>
                <option value="email">Email</option>
                <option value="social media">Social Media</option>
              </select>

</label>
            <label>Status:
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
