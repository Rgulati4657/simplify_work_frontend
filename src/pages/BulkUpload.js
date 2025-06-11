// import React, { useState } from 'react';
// import * as XLSX from 'xlsx';
// import axios from 'axios';

// function BulkUpload() {
//   const [data, setData] = useState([]);
//   const [uploadType, setUploadType] = useState('');

//   const handleFile = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     setUploadType(file.name.endsWith('.csv') ? 'csv' : 'xlsx');

//     reader.onload = (evt) => {
//       const bstr = evt.target.result;
//       const wb = XLSX.read(bstr, { type: 'binary' });
//       const wsname = wb.SheetNames[0];
//       const ws = wb.Sheets[wsname];
//       const parsed = XLSX.utils.sheet_to_json(ws);
//       setData(parsed);
//     };

//     reader.readAsBinaryString(file);
//   };

//   const handleUpload = async () => {
//     await axios.post('/api/banners/bulk', data);
//     alert("Bulk upload successful");
//     setData([]);
//   };

//   return (
//     <div>
//       <h2>Bulk Banner Upload</h2>
//       <input type="file" accept=".csv,.xlsx" onChange={handleFile} />
//       {data.length > 0 && (
//         <>
//           <table border="1" cellPadding="6">
//             <thead>
//               <tr>
//                 {Object.keys(data[0]).map((k, i) => <th key={i}>{k}</th>)}
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((row, idx) => (
//                 <tr key={idx}>
//                   {Object.values(row).map((val, i) => <td key={i}>{val}</td>)}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button onClick={handleUpload}>Upload All</button>
//         </>
//       )}
//     </div>
//   );
// }

// // export default BulkUpload;
// import React, { useState } from 'react';
// import * as XLSX from 'xlsx';
// import axios from 'axios';
// import styles from './BulkUpload.module.css';

// function BulkUpload() {
//   const [data, setData] = useState([]);
//   const [uploadType, setUploadType] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleFile = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     setUploadType(file.name.endsWith('.csv') ? 'csv' : 'xlsx');

//     reader.onload = (evt) => {
//       const bstr = evt.target.result;
//       const wb = XLSX.read(bstr, { type: 'binary' });
//       const wsname = wb.SheetNames[0];
//       const ws = wb.Sheets[wsname];
//       const parsed = XLSX.utils.sheet_to_json(ws);
//       setData(parsed);
//     };

//     reader.readAsBinaryString(file);
//   };

//   const handleUpload = async () => {
//     if (data.length === 0) return;
//     setLoading(true);
//     try {
//       await axios.post('/api/banners/bulk', data);
//       alert("Bulk upload successful");
//       setData([]);
//     } catch (err) {
//       alert("Upload failed: " + (err.response?.data?.message || err.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>AI-Themed Bulk Banner Upload</h2>

//       <label htmlFor="fileInput" className={styles.fileLabel}>
//         Select CSV or XLSX file
//       </label>
//       <input
//         id="fileInput"
//         type="file"
//         accept=".csv,.xlsx"
//         onChange={handleFile}
//         className={styles.fileInput}
//       />

//       {data.length > 0 && (
//         <>
//           <div className={styles.tableWrapper}>
//             <table className={styles.table}>
//               <thead>
//                 <tr>
//                   {Object.keys(data[0]).map((k, i) => (
//                     <th key={i}>{k}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.map((row, idx) => (
//                   <tr key={idx}>
//                     {Object.values(row).map((val, i) => (
//                       <td key={i}>{val}</td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <button
//             className={styles.uploadBtn}
//             onClick={handleUpload}
//             disabled={loading}
//           >
//             {loading ? 'Uploading...' : 'Upload All'}
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

// export default BulkUpload;


import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import styles from './BulkUpload.module.css';

function BulkUpload() {
  const [files, setFiles] = useState([]);
  const [data, setData] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);
  const dropRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFile(droppedFiles[0]);
  };

  const handleBrowse = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const processFile = (file) => {
    if (!file) return;

    const ext = file.name.split('.').pop().toLowerCase();
    const valid = ['csv', 'xlsx', 'xls'];
    const newFile = {
      name: file.name,
      size: file.size,
      type: ext.toUpperCase(),
      valid: valid.includes(ext),
    };

    setFiles([newFile]);

    if (!newFile.valid) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const parsed = XLSX.utils.sheet_to_json(ws);
      setData(parsed);
    };
    reader.readAsBinaryString(file);
  };

  const handleUpload = async () => {
    try {
      await axios.post('/api/banners/bulk', data);
      setUploadStatus('success');
    } catch {
      setUploadStatus('fail');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.uploadBox}>
        <div
          className={styles.dropZone}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          ref={dropRef}
        >
          <div className={styles.icon}>⬆️</div>
          <p>Drag and Drop file</p>
          <p>or</p>
          <label htmlFor="fileInput" className={styles.browseButton}>
            Browse
          </label>
          <input id="fileInput" type="file" onChange={handleBrowse} className={styles.hiddenInput} />
        </div>
        <div className={styles.fileList}>
          {files.map((file, index) => (
            <div key={index} className={styles.fileItem}>
              <span className={styles.fileType}>{file.type}</span>
              <div className={styles.fileInfo}>
                <span>{file.name}</span>
                <small>{(file.size / 1024).toFixed(1)} KB</small>
              </div>
              <span className={styles.statusIcon}>
                {uploadStatus === 'success' && file.valid && '✔️'}
                {uploadStatus === 'fail' && '❌'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {data.length > 0 && (
        <button className={styles.uploadBtn} onClick={handleUpload}>
          Upload All
        </button>
      )}
    </div>
  );
}

export default BulkUpload;
