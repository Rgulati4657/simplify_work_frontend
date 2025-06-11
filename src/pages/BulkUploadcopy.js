// import React, { useState, useRef } from 'react';
// import {
//   Box,
//   Paper,
//   Typography,
//   Button,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   Avatar,
//   Chip,
//   Container,
//   Grid,
//   useTheme,
//   useMediaQuery,
//   Alert,
//   LinearProgress,
//   IconButton,
//   Divider
// } from '@mui/material';
// import {
//   CloudUpload,
//   InsertDriveFile,
//   CheckCircle,
//   Error,
//   Delete,
//   FileUpload
// } from '@mui/icons-material';

// function BulkUploadcopy() {
//   const [files, setFiles] = useState([]);
//   const [data, setData] = useState([]);
//   const [uploadStatus, setUploadStatus] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const dropRef = useRef(null);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const droppedFiles = Array.from(e.dataTransfer.files);
//     processFile(droppedFiles[0]);
//   };

//   const handleBrowse = (e) => {
//     const file = e.target.files[0];
//     processFile(file);
//   };

//   const processFile = (file) => {
//     if (!file) return;

//     const ext = file.name.split('.').pop().toLowerCase();
//     const valid = ['csv', 'xlsx', 'xls'];
//     const newFile = {
//       id: Date.now(),
//       name: file.name,
//       size: file.size,
//       type: ext.toUpperCase(),
//       valid: valid.includes(ext),
//       file: file
//     };

//     setFiles(prev => [...prev, newFile]);
//     setUploadStatus(null);

//     if (!newFile.valid) return;

//     // Simulate file processing
//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       try {
//         // Mock data processing - replace with actual XLSX processing
//         const mockData = [
//           { id: 1, name: 'Banner 1', status: 'active' },
//           { id: 2, name: 'Banner 2', status: 'inactive' }
//         ];
//         setData(mockData);
//       } catch (error) {
//         console.error('Error processing file:', error);
//       }
//     };
//     reader.readAsText(file);
//   };

//   const handleUpload = async () => {
//     setIsUploading(true);
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       setUploadStatus('success');
//     } catch (error) {
//       setUploadStatus('fail');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const removeFile = (fileId) => {
//     setFiles(prev => prev.filter(file => file.id !== fileId));
//     if (files.length === 1) {
//       setData([]);
//       setUploadStatus(null);
//     }
//   };

//   const getFileIcon = (type) => {
//     switch (type.toLowerCase()) {
//       case 'csv':
//         return '📊';
//       case 'xlsx':
//       case 'xls':
//         return '📈';
//       default:
//         return '📄';
//     }
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
//       <Box sx={{ textAlign: 'center', mb: 4 }}>
//         <Typography 
//           variant={isMobile ? "h5" : "h4"} 
//           component="h1" 
//           gutterBottom
//           sx={{ fontWeight: 'bold', color: 'primary.main' }}
//         >
//           Bulk Upload Files
//         </Typography>
//         <Typography 
//           variant="body1" 
//           color="text.secondary"
//           sx={{ maxWidth: 600, mx: 'auto' }}
//         >
//           Upload multiple banners at once using CSV or Excel files
//         </Typography>
//       </Box>

//       <Paper 
//         elevation={3}
//         sx={{ 
//           borderRadius: 3,
//           overflow: 'hidden',
//           background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
//         }}
//       >
//         <Grid container spacing={0} sx={{ minHeight: { xs: 'auto', md: 400 } }}>
//           {/* Drop Zone */}
//           <Grid item xs={12} md={6}>
//             <Box
//               ref={dropRef}
//               onDrop={handleDrop}
//               onDragOver={(e) => e.preventDefault()}
//               sx={{
//                 height: { xs: 300, md: '100%' },
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 bgcolor: 'background.paper',
//                 border: '2px dashed',
//                 borderColor: 'primary.main',
//                 borderRadius: { xs: 2, md: 0 },
//                 m: { xs: 2, md: 0 },
//                 p: 3,
//                 cursor: 'pointer',
//                 transition: 'all 0.3s ease',
//                 '&:hover': {
//                   bgcolor: 'primary.50',
//                   borderColor: 'primary.dark',
//                   transform: 'scale(1.02)'
//                 }
//               }}
//             >
//               <CloudUpload 
//                 sx={{ 
//                   fontSize: { xs: 48, md: 64 }, 
//                   color: 'primary.main', 
//                   mb: 2 
//                 }} 
//               />
//               <Typography 
//                 variant={isSmallScreen ? "body1" : "h6"} 
//                 gutterBottom
//                 sx={{ fontWeight: 'medium' }}
//               >
//                 Drag and Drop Files Here
//               </Typography>
//               <Typography 
//                 variant="body2" 
//                 color="text.secondary" 
//                 sx={{ mb: 2 }}
//               >
//                 or
//               </Typography>
//               <Button
//                 variant="contained"
//                 component="label"
//                 startIcon={<FileUpload />}
//                 sx={{
//                   borderRadius: 2,
//                   px: 3,
//                   py: 1
//                 }}
//               >
//                 Browse Files
//                 <input
//                   hidden
//                   accept=".csv,.xlsx,.xls"
//                   multiple
//                   type="file"
//                   onChange={handleBrowse}
//                 />
//               </Button>
//               <Typography 
//                 variant="caption" 
//                 color="text.secondary" 
//                 sx={{ mt: 2, textAlign: 'center' }}
//               >
//                 Supported formats: CSV, XLSX, XLS
//                 <br />
//                 Maximum file size: 10MB
//               </Typography>
//             </Box>
//           </Grid>

//           {/* File List */}
//           <Grid item xs={12} md={6}>
//             <Box 
//               sx={{ 
//                 height: { xs: 'auto', md: '100%' },
//                 bgcolor: 'background.paper',
//                 display: 'flex',
//                 flexDirection: 'column'
//               }}
//             >
//               <Box sx={{ p: 2, bgcolor: 'grey.50' }}>
//                 <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
//                   Uploaded Files ({files.length})
//                 </Typography>
//               </Box>
              
//               {files.length === 0 ? (
//                 <Box 
//                   sx={{ 
//                     flex: 1, 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     justifyContent: 'center',
//                     p: 4
//                   }}
//                 >
//                   <Typography 
//                     variant="body2" 
//                     color="text.secondary"
//                     sx={{ textAlign: 'center' }}
//                   >
//                     No files uploaded yet
//                     <br />
//                     Drop files or click browse to get started
//                   </Typography>
//                 </Box>
//               ) : (
//                 <List 
//                   sx={{ 
//                     flex: 1, 
//                     overflow: 'auto',
//                     maxHeight: { xs: 300, md: 'none' }
//                   }}
//                 >
//                   {files.map((file, index) => (
//                     <React.Fragment key={file.id}>
//                       <ListItem
//                         sx={{
//                           bgcolor: file.valid ? 'transparent' : 'error.50',
//                           '&:hover': { bgcolor: 'action.hover' }
//                         }}
//                         secondaryAction={
//                           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                             {uploadStatus === 'success' && file.valid && (
//                               <CheckCircle color="success" />
//                             )}
//                             {uploadStatus === 'fail' && (
//                               <Error color="error" />
//                             )}
//                             {!file.valid && (
//                               <Error color="error" />
//                             )}
//                             <IconButton 
//                               size="small" 
//                               onClick={() => removeFile(file.id)}
//                             >
//                               <Delete />
//                             </IconButton>
//                           </Box>
//                         }
//                       >
//                         <ListItemAvatar>
//                           <Avatar 
//                             sx={{ 
//                               bgcolor: file.valid ? 'primary.light' : 'error.light',
//                               fontSize: '1.2rem'
//                             }}
//                           >
//                             {getFileIcon(file.type)}
//                           </Avatar>
//                         </ListItemAvatar>
//                         <ListItemText
//                           primary={
//                             <Typography 
//                               variant="body2" 
//                               sx={{ 
//                                 fontWeight: 'medium',
//                                 wordBreak: 'break-word'
//                               }}
//                             >
//                               {file.name}
//                             </Typography>
//                           }
//                           secondary={
//                             <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 0.5 }}>
//                               <Chip 
//                                 label={file.type} 
//                                 size="small" 
//                                 color={file.valid ? 'primary' : 'error'}
//                                 variant="outlined"
//                               />
//                               <Typography variant="caption" color="text.secondary">
//                                 {formatFileSize(file.size)}
//                               </Typography>
//                             </Box>
//                           }
//                         />
//                       </ListItem>
//                       {index < files.length - 1 && <Divider />}
//                     </React.Fragment>
//                   ))}
//                 </List>
//               )}
//             </Box>
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* Upload Progress */}
//       {isUploading && (
//         <Box sx={{ mt: 3 }}>
//           <Typography variant="body2" sx={{ mb: 1 }}>
//             Uploading files...
//           </Typography>
//           <LinearProgress />
//         </Box>
//       )}

//       {/* Status Alert */}
//       {uploadStatus && (
//         <Alert 
//           severity={uploadStatus === 'success' ? 'success' : 'error'}
//           sx={{ mt: 3 }}
//         >
//           {uploadStatus === 'success' 
//             ? 'Files uploaded successfully!' 
//             : 'Upload failed. Please try again.'
//           }
//         </Alert>
//       )}

//       {/* Upload Button */}
//       {data.length > 0 && files.some(f => f.valid) && (
//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//           <Button
//             variant="contained"
//             size="large"
//             onClick={handleUpload}
//             disabled={isUploading}
//             startIcon={<CloudUpload />}
//             sx={{
//               borderRadius: 3,
//               px: 4,
//               py: 1.5,
//               fontSize: '1.1rem',
//               fontWeight: 'bold',
//               minWidth: { xs: '100%', sm: 200 }
//             }}
//           >
//             {isUploading ? 'Uploading...' : 'Upload All Files'}
//           </Button>
//         </Box>
//       )}

//       {/* Data Preview (if needed) */}
//       {data.length > 0 && (
//         <Paper sx={{ mt: 4, p: 3, borderRadius: 2 }}>
//           <Typography variant="h6" gutterBottom>
//             Data Preview
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Found {data.length} records ready for upload
//           </Typography>
//         </Paper>
//       )}
//     </Container>
//   );
// }

// export default BulkUploadcopy;




// import React, { useState, useRef, useEffect } from 'react';

// function BulkUploadcopy() {
//   const [files, setFiles] = useState([]);
//   const [data, setData] = useState([]);
//   const [uploadStatus, setUploadStatus] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const dropRef = useRef(null);

//   // Handle responsive behavior
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const droppedFiles = Array.from(e.dataTransfer.files);
//     processFile(droppedFiles[0]);
//   };

//   const handleBrowse = (e) => {
//     const file = e.target.files[0];
//     processFile(file);
//   };

//   const processFile = (file) => {
//     if (!file) return;

//     const ext = file.name.split('.').pop().toLowerCase();
//     const valid = ['csv', 'xlsx', 'xls'];
//     const newFile = {
//       id: Date.now(),
//       name: file.name,
//       size: file.size,
//       type: ext.toUpperCase(),
//       valid: valid.includes(ext),
//       file: file
//     };

//     setFiles(prev => [...prev, newFile]);
//     setUploadStatus(null);

//     if (!newFile.valid) return;

//     // Simulate file processing
//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       try {
//         // Mock data processing - replace with actual XLSX processing
//         const mockData = [
//           { id: 1, name: 'Banner 1', status: 'active' },
//           { id: 2, name: 'Banner 2', status: 'inactive' }
//         ];
//         setData(mockData);
//       } catch (error) {
//         console.error('Error processing file:', error);
//       }
//     };
//     reader.readAsText(file);
//   };

//   const handleUpload = async () => {
//     setIsUploading(true);
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       setUploadStatus('success');
//     } catch (error) {
//       setUploadStatus('fail');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const removeFile = (fileId) => {
//     setFiles(prev => prev.filter(file => file.id !== fileId));
//     if (files.length === 1) {
//       setData([]);
//       setUploadStatus(null);
//     }
//   };

//   const getFileIcon = (type) => {
//     switch (type.toLowerCase()) {
//       case 'csv':
//         return '📊';
//       case 'xlsx':
//       case 'xls':
//         return '📈';
//       default:
//         return '📄';
//     }
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
//   };

//   return (
//     <div className="bulk-upload-container">
//       {/* Header */}
//       <div className="header">
//         <h1 className="title">Bulk Upload Files</h1>
//         <p className="subtitle">Upload multiple banners at once using CSV or Excel files</p>
//       </div>

//       {/* Main Upload Area */}
//       <div className={`upload-card ${isMobile ? 'upload-card-mobile' : ''}`}>
//         <div className={`upload-grid ${isMobile ? 'upload-grid-mobile' : ''}`}>
//           {/* Drop Zone */}
//           <div
//             className="drop-zone"
//             ref={dropRef}
//             onDrop={handleDrop}
//             onDragOver={(e) => e.preventDefault()}
//             onDragEnter={(e) => e.preventDefault()}
//           >
//             <div className="drop-content">
//               <div className="upload-icon">☁️</div>
//               <h3 className="drop-title">Drag and Drop Files Here</h3>
//               <p className="drop-text">or</p>
//               <label htmlFor="fileInput" className="browse-button">
//                 <span className="button-icon">📁</span>
//                 Browse Files
//               </label>
//               <input
//                 id="fileInput"
//                 type="file"
//                 accept=".csv,.xlsx,.xls"
//                 onChange={handleBrowse}
//                 className="hidden-input"
//               />
//               <div className="file-info">
//                 <p>Supported formats: CSV, XLSX, XLS</p>
//                 <p>Maximum file size: 10MB</p>
//               </div>
//             </div>
//           </div>

//           {/* File List */}
//           <div className="file-list-container">
//             <div className="file-list-header">
//               <h3>Uploaded Files ({files.length})</h3>
//             </div>
            
//             <div className="file-list">
//               {files.length === 0 ? (
//                 <div className="empty-state">
//                   <div className="empty-icon">📋</div>
//                   <p>No files uploaded yet</p>
//                   <small>Drop files or click browse to get started</small>
//                 </div>
//               ) : (
//                 files.map((file, index) => (
//                   <div 
//                     key={file.id} 
//                     className={`file-item ${!file.valid ? 'file-item-invalid' : ''}`}
//                   >
//                     <div className="file-avatar">
//                       {getFileIcon(file.type)}
//                     </div>
//                     <div className="file-info-content">
//                       <div className="file-name">{file.name}</div>
//                       <div className="file-meta">
//                         <span className={`file-type-badge ${!file.valid ? 'invalid' : ''}`}>
//                           {file.type}
//                         </span>
//                         <span className="file-size">{formatFileSize(file.size)}</span>
//                       </div>
//                     </div>
//                     <div className="file-actions">
//                       {uploadStatus === 'success' && file.valid && (
//                         <span className="status-icon success">✅</span>
//                       )}
//                       {uploadStatus === 'fail' && (
//                         <span className="status-icon error">❌</span>
//                       )}
//                       {!file.valid && (
//                         <span className="status-icon error">⚠️</span>
//                       )}
//                       <button 
//                         className="remove-button"
//                         onClick={() => removeFile(file.id)}
//                         title="Remove file"
//                       >
//                         🗑️
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Upload Progress */}
//       {isUploading && (
//         <div className="progress-container">
//           <div className="progress-text">Uploading files...</div>
//           <div className="progress-bar">
//             <div className="progress-fill"></div>
//           </div>
//         </div>
//       )}

//       {/* Status Alert */}
//       {uploadStatus && (
//         <div className={`alert ${uploadStatus === 'success' ? 'alert-success' : 'alert-error'}`}>
//           <div className="alert-icon">
//             {uploadStatus === 'success' ? '✅' : '❌'}
//           </div>
//           <div className="alert-message">
//             {uploadStatus === 'success' 
//               ? 'Files uploaded successfully!' 
//               : 'Upload failed. Please try again.'
//             }
//           </div>
//         </div>
//       )}

//       {/* Upload Button */}
//       {data.length > 0 && files.some(f => f.valid) && (
//         <div className="upload-button-container">
//           <button
//             className={`upload-button ${isUploading ? 'uploading' : ''}`}
//             onClick={handleUpload}
//             disabled={isUploading}
//           >
//             <span className="button-icon">☁️</span>
//             {isUploading ? 'Uploading...' : 'Upload All Files'}
//           </button>
//         </div>
//       )}

//       {/* Data Preview */}
//       {data.length > 0 && (
//         <div className="data-preview">
//           <h3>Data Preview</h3>
//           <p>Found {data.length} records ready for upload</p>
//         </div>
//       )}

//       <style jsx>{`
//         .bulk-upload-container {
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 2rem 1rem;
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//         }

//         .header {
//           text-align: center;
//           margin-bottom: 3rem;
//         }

//         .title {
//           font-size: 2.5rem;
//           font-weight: bold;
//           color: #1976d2;
//           margin: 0 0 1rem 0;
//         }

//         @media (max-width: 768px) {
//           .title {
//             font-size: 2rem;
//           }
//         }

//         .subtitle {
//           font-size: 1.1rem;
//           color: #666;
//           max-width: 600px;
//           margin: 0 auto;
//           line-height: 1.5;
//         }

//         .upload-card {
//           background: white;
//           border-radius: 16px;
//           box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
//           overflow: hidden;
//           margin-bottom: 2rem;
//         }

//         .upload-grid {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           min-height: 500px;
//         }

//         .upload-grid-mobile {
//           grid-template-columns: 1fr;
//         }

//         .drop-zone {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
//           border: 3px dashed #1976d2;
//           border-right: none;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           position: relative;
//         }

//         @media (max-width: 768px) {
//           .drop-zone {
//             border-right: 3px dashed #1976d2;
//             border-bottom: none;
//             min-height: 300px;
//           }
//         }

//         .drop-zone:hover {
//           background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
//           border-color: #1565c0;
//           transform: scale(1.02);
//         }

//         .drop-content {
//           text-align: center;
//           padding: 2rem;
//         }

//         .upload-icon {
//           font-size: 4rem;
//           margin-bottom: 1rem;
//           display: block;
//         }

//         .drop-title {
//           font-size: 1.5rem;
//           font-weight: 600;
//           color: #333;
//           margin: 0 0 1rem 0;
//         }

//         @media (max-width: 768px) {
//           .drop-title {
//             font-size: 1.25rem;
//           }
//         }

//         .drop-text {
//           color: #666;
//           margin: 0 0 1.5rem 0;
//           font-size: 1.1rem;
//         }

//         .browse-button {
//           display: inline-flex;
//           align-items: center;
//           gap: 0.5rem;
//           background: #1976d2;
//           color: white;
//           padding: 1rem 2rem;
//           border-radius: 12px;
//           font-weight: 600;
//           font-size: 1rem;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           border: none;
//           text-decoration: none;
//         }

//         .browse-button:hover {
//           background: #1565c0;
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
//         }

//         .button-icon {
//           font-size: 1.2rem;
//         }

//         .hidden-input {
//           display: none;
//         }

//         .file-info {
//           margin-top: 2rem;
//           color: #666;
//           font-size: 0.9rem;
//           line-height: 1.4;
//         }

//         .file-list-container {
//           background: white;
//           border-left: 1px solid #e0e0e0;
//           display: flex;
//           flex-direction: column;
//         }

//         @media (max-width: 768px) {
//           .file-list-container {
//             border-left: none;
//             border-top: 1px solid #e0e0e0;
//           }
//         }

//         .file-list-header {
//           padding: 1.5rem;
//           background: #f5f5f5;
//           border-bottom: 1px solid #e0e0e0;
//         }

//         .file-list-header h3 {
//           margin: 0;
//           font-size: 1.2rem;
//           font-weight: 600;
//           color: #333;
//         }

//         .file-list {
//           flex: 1;
//           overflow-y: auto;
//           max-height: 400px;
//           padding: 0;
//         }

//         .empty-state {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           height: 300px;
//           color: #666;
//           text-align: center;
//         }

//         .empty-icon {
//           font-size: 3rem;
//           margin-bottom: 1rem;
//           opacity: 0.5;
//         }

//         .file-item {
//           display: flex;
//           align-items: center;
//           padding: 1rem 1.5rem;
//           border-bottom: 1px solid #f0f0f0;
//           transition: background-color 0.2s ease;
//         }

//         .file-item:hover {
//           background-color: #f9f9f9;
//         }

//         .file-item-invalid {
//           background-color: #ffebee;
//         }

//         .file-avatar {
//           font-size: 2rem;
//           margin-right: 1rem;
//           width: 48px;
//           height: 48px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: #e3f2fd;
//           border-radius: 50%;
//         }

//         .file-info-content {
//           flex: 1;
//           min-width: 0;
//         }

//         .file-name {
//           font-weight: 500;
//           color: #333;
//           margin-bottom: 0.25rem;
//           word-break: break-word;
//           font-size: 0.95rem;
//         }

//         .file-meta {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           flex-wrap: wrap;
//         }

//         .file-type-badge {
//           background: #e3f2fd;
//           color: #1976d2;
//           padding: 0.25rem 0.5rem;
//           border-radius: 6px;
//           font-size: 0.75rem;
//           font-weight: 600;
//           text-transform: uppercase;
//         }

//         .file-type-badge.invalid {
//           background: #ffcdd2;
//           color: #d32f2f;
//         }

//         .file-size {
//           font-size: 0.8rem;
//           color: #666;
//         }

//         .file-actions {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//         }

//         .status-icon {
//           font-size: 1.2rem;
//         }

//         .status-icon.success {
//           color: #4caf50;
//         }

//         .status-icon.error {
//           color: #f44336;
//         }

//         .remove-button {
//           background: none;
//           border: none;
//           font-size: 1.2rem;
//           cursor: pointer;
//           padding: 0.25rem;
//           border-radius: 4px;
//           transition: background-color 0.2s ease;
//         }

//         .remove-button:hover {
//           background-color: #ffebee;
//         }

//         .progress-container {
//           margin: 2rem 0;
//           text-align: center;
//         }

//         .progress-text {
//           margin-bottom: 1rem;
//           color: #666;
//           font-size: 0.9rem;
//           font-weight: 500;
//       }
//           `}</style>
//     </div>
//   );
// };

// export default BulkUploadcopy;
// import React, { useState, useRef, useEffect } from 'react';

// function BulkUploadcopy() {
//   const [files, setFiles] = useState([]);
//   const [data, setData] = useState([]);
//   const [uploadStatus, setUploadStatus] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   const dropRef = useRef(null);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 768);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleDrop = (e) => {
//     e.preventDefault();
//     if (isMobile) return;
//     const droppedFiles = Array.from(e.dataTransfer.files);
//     processFiles(droppedFiles);
//   };

//   const handleBrowse = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     processFiles(selectedFiles);
//   };

//   const processFiles = (selectedFiles) => {
//     const validExt = ['csv', 'xlsx', 'xls'];
//     const newFiles = selectedFiles.map(file => {
//       const ext = file.name.split('.').pop().toLowerCase();
//       return {
//         id: Date.now() + Math.random(),
//         name: file.name,
//         size: file.size,
//         type: ext.toUpperCase(),
//         valid: validExt.includes(ext),
//         file: file
//       };
//     });
//     setFiles(prev => [...prev, ...newFiles]);
//     setUploadStatus(null);

//     // Simulate data extraction for valid files
//     newFiles.forEach(fileObj => {
//       if (fileObj.valid) {
//         const reader = new FileReader();
//         reader.onload = () => {
//           setData(prev => [
//             ...prev,
//             { id: fileObj.id, name: fileObj.name, status: 'ready' }
//           ]);
//         };
//         reader.readAsText(fileObj.file);
//       }
//     });
//   };

//   const handleUpload = async () => {
//     setIsUploading(true);
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1500));
//       setUploadStatus('success');
//     } catch {
//       setUploadStatus('fail');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const removeFile = (fileId) => {
//     setFiles(prev => prev.filter(file => file.id !== fileId));
//     setData(prev => prev.filter(d => d.id !== fileId));
//     if (files.length === 1) setUploadStatus(null);
//   };

//   const getFileIcon = (type) => {
//     switch (type.toLowerCase()) {
//       case 'csv': return '📊';
//       case 'xlsx':
//       case 'xls': return '📈';
//       default: return '📄';
//     }
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
//   };

//   return (
//     <div className="bulk-upload-container">
//       <div className="header">
//         <h1 className="title">Bulk Upload Files</h1>
//         <p className="subtitle">Upload multiple banners at once using CSV or Excel files</p>
//       </div>

//       <div className={`upload-card ${isMobile ? 'upload-card-mobile' : ''}`}>
//         <div className={`upload-grid ${isMobile ? 'upload-grid-mobile' : ''}`}>
//           {/* Drop Zone or Browse Button */}
//           {!isMobile ? (
//             <div
//               className="drop-zone"
//               ref={dropRef}
//               onDrop={handleDrop}
//               onDragOver={e => e.preventDefault()}
//               onDragEnter={e => e.preventDefault()}
//             >
//               <div className="drop-content">
//                 <div className="upload-icon">☁️</div>
//                 <h3 className="drop-title">Drag and Drop Files Here</h3>
//                 <p className="drop-text">or</p>
//                 <label htmlFor="fileInput" className="browse-button">
//                   <span className="button-icon">📁</span>
//                   Browse Files
//                 </label>
//                 <input
//                   id="fileInput"
//                   type="file"
//                   accept=".csv,.xlsx,.xls"
//                   onChange={handleBrowse}
//                   className="hidden-input"
//                   multiple
//                 />
//                 <div className="file-info">
//                   <p>Supported formats: CSV, XLSX, XLS</p>
//                   <p>Maximum file size: 10MB</p>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="mobile-browse">
//               <label htmlFor="fileInputMobile" className="browse-button mobile">
//                 <span className="button-icon">📁</span>
//                 Browse Files
//               </label>
//               <input
//                 id="fileInputMobile"
//                 type="file"
//                 accept=".csv,.xlsx,.xls"
//                 onChange={handleBrowse}
//                 className="hidden-input"
//                 multiple
//               />
//               <div className="file-info">
//                 <p>Supported formats: CSV, XLSX, XLS</p>
//                 <p>Maximum file size: 10MB</p>
//               </div>
//             </div>
//           )}

//           {/* File List */}
//           <div className="file-list-container">
//             <div className="file-list-header">
//               <h3>Uploaded Files ({files.length})</h3>
//             </div>
//             <div className="file-list">
//               {files.length === 0 ? (
//                 <div className="empty-state">
//                   <div className="empty-icon">📋</div>
//                   <p>No files uploaded yet</p>
//                   <small>Drop files or click browse to get started</small>
//                 </div>
//               ) : (
//                 files.map((file, index) => (
//                   <div
//                     key={file.id}
//                     className={`file-item ${!file.valid ? 'file-item-invalid' : ''}`}
//                   >
//                     <div className="file-avatar">{getFileIcon(file.type)}</div>
//                     <div className="file-info-content">
//                       <div className="file-name">{file.name}</div>
//                       <div className="file-meta">
//                         <span className={`file-type-badge ${!file.valid ? 'invalid' : ''}`}>
//                           {file.type}
//                         </span>
//                         <span className="file-size">{formatFileSize(file.size)}</span>
//                       </div>
//                     </div>
//                     <div className="file-actions">
//                       {uploadStatus === 'success' && file.valid && (
//                         <span className="status-icon success">✅</span>
//                       )}
//                       {uploadStatus === 'fail' && (
//                         <span className="status-icon error">❌</span>
//                       )}
//                       {!file.valid && (
//                         <span className="status-icon error">⚠️</span>
//                       )}
//                       <button
//                         className="remove-button"
//                         onClick={() => removeFile(file.id)}
//                         title="Remove file"
//                       >
//                         🗑️
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Upload Progress */}
//       {isUploading && (
//         <div className="progress-container">
//           <div className="progress-text">Uploading files...</div>
//         </div>
//       )}

//       {/* Status Alert */}
//       {uploadStatus && (
//         <div className={`alert ${uploadStatus === 'success' ? 'alert-success' : 'alert-error'}`}>
//           <div className="alert-icon">
//             {uploadStatus === 'success' ? '✅' : '❌'}
//           </div>
//           <div className="alert-message">
//             {uploadStatus === 'success'
//               ? 'Files uploaded successfully!'
//               : 'Upload failed. Please try again.'
//             }
//           </div>
//         </div>
//       )}

//       {/* Upload Button */}
//       {data.length > 0 && files.some(f => f.valid) && (
//         <div className="upload-button-container">
//           <button
//             className={`upload-button ${isUploading ? 'uploading' : ''}`}
//             onClick={handleUpload}
//             disabled={isUploading}
//           >
//             <span className="button-icon">☁️</span>
//             {isUploading ? 'Uploading...' : 'Upload All Files'}
//           </button>
//         </div>
//       )}

//       {/* Data Preview */}
//       {data.length > 0 && (
//         <div className="data-preview">
//           <h3>Data Preview</h3>
//           <p>Found {data.length} records ready for upload</p>
//         </div>
//       )}

//       <style jsx>{`
//         .bulk-upload-container {
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 2rem 1rem;
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//         }
//         .header {
//           text-align: center;
//           margin-bottom: 3rem;
//         }
//         .title {
//           font-size: 2.5rem;
//           font-weight: bold;
//           color: #1976d2;
//           margin: 0 0 1rem 0;
//         }
//         @media (max-width: 768px) {
//           .title { font-size: 2rem; }
//         }
//         .subtitle {
//           font-size: 1.1rem;
//           color: #666;
//           max-width: 600px;
//           margin: 0 auto;
//           line-height: 1.5;
//         }
//         .upload-card {
//           background: white;
//           border-radius: 16px;
//           box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
//           overflow: hidden;
//           margin-bottom: 2rem;
//         }
//         .upload-grid {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           min-height: 500px;
//         }
//         .upload-grid-mobile {
//           grid-template-columns: 1fr;
//         }
//         .drop-zone {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
//           border: 3px dashed #1976d2;
//           border-right: none;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           position: relative;
//         }
//         @media (max-width: 768px) {
//           .drop-zone {
//             display: none;
//           }
//         }
//         .drop-content {
//           text-align: center;
//           padding: 2rem;
//         }
//         .upload-icon {
//           font-size: 4rem;
//           margin-bottom: 1rem;
//           display: block;
//         }
//         .drop-title {
//           font-size: 1.5rem;
//           font-weight: 600;
//           color: #333;
//           margin: 0 0 1rem 0;
//         }
//         @media (max-width: 768px) {
//           .drop-title { font-size: 1.25rem; }
//         }
//         .drop-text {
//           color: #666;
//           margin: 0 0 1.5rem 0;
//           font-size: 1.1rem;
//         }
//         .browse-button {
//           display: inline-flex;
//           align-items: center;
//           gap: 0.5rem;
//           background: #1976d2;
//           color: white;
//           padding: 1rem 2rem;
//           border-radius: 12px;
//           font-weight: 600;
//           font-size: 1rem;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           border: none;
//           text-decoration: none;
//         }
//         .browse-button.mobile {
//           width: 100%;
//           justify-content: center;
//           margin: 2rem 0;
//         }
//         .browse-button:hover {
//           background: #1565c0;
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
//         }
//         .button-icon { font-size: 1.2rem; }
//         .hidden-input { display: none; }
//         .file-info {
//           margin-top: 2rem;
//           color: #666;
//           font-size: 0.9rem;
//           line-height: 1.4;
//         }
//         .mobile-browse {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           padding: 2rem 0;
//         }
//         .file-list-container {
//           background: white;
//           border-left: 1px solid #e0e0e0;
//           display: flex;
//           flex-direction: column;
//         }
//         @media (max-width: 768px) {
//           .file-list-container {
//             border-left: none;
//             border-top: 1px solid #e0e0e0;
//           }
//         }
//         .file-list-header {
//           padding: 1.5rem;
//           background: #f5f5f5;
//           border-bottom: 1px solid #e0e0e0;
//         }
//         .file-list-header h3 {
//           margin: 0;
//           font-size: 1.2rem;
//           font-weight: 600;
//           color: #333;
//         }
//         .file-list {
//           flex: 1;
//           overflow-y: auto;
//           max-height: 400px;
//           padding: 0;
//         }
//         .empty-state {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           height: 300px;
//           color: #666;
//           text-align: center;
//         }
//         .empty-icon {
//           font-size: 3rem;
//           margin-bottom: 1rem;
//           opacity: 0.5;
//         }
//         .file-item {
//           display: flex;
//           align-items: center;
//           padding: 1rem 1.5rem;
//           border-bottom: 1px solid #f0f0f0;
//           transition: background-color 0.2s ease;
//         }
//         .file-item:hover { background-color: #f9f9f9; }
//         .file-item-invalid { background-color: #ffebee; }
//         .file-avatar {
//           font-size: 2rem;
//           margin-right: 1rem;
//           width: 48px;
//           height: 48px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: #e3f2fd;
//           border-radius: 50%;
//         }
//         .file-info-content { flex: 1; min-width: 0; }
//         .file-name {
//           font-weight: 500;
//           color: #333;
//           margin-bottom: 0.25rem;
//           word-break: break-word;
//           font-size: 0.95rem;
//         }
//         .file-meta {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           flex-wrap: wrap;
//         }
//         .file-type-badge {
//           background: #e3f2fd;
//           color: #1976d2;
//           padding: 0.25rem 0.5rem;
//           border-radius: 6px;
//           font-size: 0.75rem;
//           font-weight: 600;
//           text-transform: uppercase;
//         }
//         .file-type-badge.invalid {
//           background: #ffcdd2;
//           color: #d32f2f;
//         }
//         .file-size {
//           font-size: 0.8rem;
//           color: #666;
//         }
//         .file-actions {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//         }
//         .status-icon { font-size: 1.2rem; }
//         .status-icon.success { color: #4caf50; }
//         .status-icon.error { color: #f44336; }
//         .remove-button {
//           background: none;
//           border: none;
//           font-size: 1.2rem;
//           cursor: pointer;
//           padding: 0.25rem;
//           border-radius: 4px;
//           transition: background-color 0.2s ease;
//         }
//         .remove-button:hover { background-color: #ffebee; }
//         .progress-container {
//           margin: 2rem 0;
//           text-align: center;
//         }
//         .progress-text {
//           margin-bottom: 1rem;
//           color: #666;
//           font-size: 0.9rem;
//           font-weight: 500;
//         }
//         .alert {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 1rem;
//           padding: 1rem 2rem;
//           border-radius: 8px;
//           margin: 2rem auto;
//           max-width: 400px;
//           font-weight: 600;
//         }
//         .alert-success {
//           background: #e8f5e9;
//           color: #388e3c;
//         }
//         .alert-error {
//           background: #ffebee;
//           color: #d32f2f;
//         }
//         .alert-icon { font-size: 1.5rem; }
//         .upload-button-container {
//           display: flex;
//           justify-content: center;
//           margin: 2rem 0;
//         }
//         .upload-button {
//           background: #1976d2;
//           color: white;
//           border: none;
//           border-radius: 12px;
//           padding: 1rem 2.5rem;
//           font-size: 1.1rem;
//           font-weight: bold;
//           cursor: pointer;
//           transition: background 0.2s, transform 0.2s;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//         }
//         .upload-button.uploading {
//           opacity: 0.7;
//           pointer-events: none;
//         }
//         .upload-button:hover {
//           background: #1565c0;
//           transform: translateY(-2px);
//         }
//         .data-preview {
//           background: #f5f5f5;
//           border-radius: 8px;
//           padding: 1.5rem;
//           margin: 2rem auto;
//           max-width: 500px;
//           text-align: center;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default BulkUploadcopy;

import React, { useState, useRef, useEffect } from 'react';

function BulkUploadcopy() {
  const [files, setFiles] = useState([]);
  const [data, setData] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    if (isMobile) return;
    processFiles(Array.from(e.dataTransfer.files));
  };

  const handleBrowse = (e) => {
    processFiles(Array.from(e.target.files));
  };

  const processFiles = (selectedFiles) => {
    const validExt = ['csv', 'xlsx', 'xls'];
    const newFiles = selectedFiles.map(file => {
      const ext = file.name.split('.').pop().toLowerCase();
      return {
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: ext.toUpperCase(),
        valid: validExt.includes(ext),
        file: file
      };
    });
    setFiles(prev => [...prev, ...newFiles]);
    setUploadStatus(null);

    newFiles.forEach(fileObj => {
      if (fileObj.valid) {
        const reader = new FileReader();
        reader.onload = () => {
          setData(prev => [
            ...prev,
            { id: fileObj.id, name: fileObj.name, status: 'ready' }
          ]);
        };
        reader.readAsText(fileObj.file);
      }
    });
  };

  const handleUpload = async () => {
    setIsUploading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setUploadStatus('success');
    } catch {
      setUploadStatus('fail');
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
    setData(prev => prev.filter(d => d.id !== fileId));
    if (files.length === 1) setUploadStatus(null);
  };

  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'csv': return '📊';
      case 'xlsx':
      case 'xls': return '📈';
      default: return '📄';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="bulk-upload-container">
      <div className="bulk-header">
        <h1 className="title">Bulk Upload Files</h1>
        <p className="subtitle">Upload multiple banners at once using CSV or Excel files</p>
      </div>
      <div className={`upload-card ${isMobile ? 'upload-card-mobile' : ''}`}>
        <div className={`upload-grid ${isMobile ? 'upload-grid-mobile' : ''}`}>
          {!isMobile ? (
            <div
              className="drop-zone"
              onDrop={handleDrop}
              onDragOver={e => e.preventDefault()}
              onDragEnter={e => e.preventDefault()}
            >
              <div className="drop-content">
                <div className="upload-icon">☁️</div>
                <h3 className="drop-title">Drag and Drop Files Here</h3>
                <p className="drop-text">or</p>
                <label htmlFor="fileInput" className="browse-button">
                  <span className="button-icon">📁</span>
                  Browse Files
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleBrowse}
                  className="hidden-input"
                  multiple
                />
                <div className="file-info">
                  <p>Supported formats: CSV, XLSX, XLS</p>
                  <p>Maximum file size: 10MB</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mobile-browse">
              <label htmlFor="fileInputMobile" className="browse-button mobile">
                <span className="button-icon">📁</span>
                Browse Files
              </label>
              <input
                id="fileInputMobile"
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleBrowse}
                className="hidden-input"
                multiple
              />
              <div className="file-info">
                <p>Supported formats: CSV, XLSX, XLS</p>
                <p>Maximum file size: 10MB</p>
              </div>
            </div>
          )}
          <div className="file-list-container">
            <div className="file-list-header">
              <h3>Uploaded Files ({files.length})</h3>
            </div>
            <div className="file-list">
              {files.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📋</div>
                  <p>No files uploaded yet</p>
                  <small>Drop files or click browse to get started</small>
                </div>
              ) : (
                files.map((file, index) => (
                  <div
                    key={file.id}
                    className={`file-item ${!file.valid ? 'file-item-invalid' : ''}`}
                  >
                    <div className="file-avatar">{getFileIcon(file.type)}</div>
                    <div className="file-info-content">
                      <div className="file-name">{file.name}</div>
                      <div className="file-meta">
                        <span className={`file-type-badge ${!file.valid ? 'invalid' : ''}`}>
                          {file.type}
                        </span>
                        <span className="file-size">{formatFileSize(file.size)}</span>
                      </div>
                    </div>
                    <div className="file-actions">
                      {uploadStatus === 'success' && file.valid && (
                        <span className="status-icon success">✅</span>
                      )}
                      {uploadStatus === 'fail' && (
                        <span className="status-icon error">❌</span>
                      )}
                      {!file.valid && (
                        <span className="status-icon error">⚠️</span>
                      )}
                      <button
                        className="remove-button"
                        onClick={() => removeFile(file.id)}
                        title="Remove file"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      {isUploading && (
        <div className="progress-container">
          <div className="progress-text">Uploading files...</div>
        </div>
      )}
      {uploadStatus && (
        <div className={`alert ${uploadStatus === 'success' ? 'alert-success' : 'alert-error'}`}>
          <div className="alert-icon">
            {uploadStatus === 'success' ? '✅' : '❌'}
          </div>
          <div className="alert-message">
            {uploadStatus === 'success'
              ? 'Files uploaded successfully!'
              : 'Upload failed. Please try again.'
            }
          </div>
        </div>
      )}
      {data.length > 0 && files.some(f => f.valid) && (
        <div className="upload-button-container">
          <button
            className={`upload-button ${isUploading ? 'uploading' : ''}`}
            onClick={handleUpload}
            disabled={isUploading}
          >
            <span className="button-icon">☁️</span>
            {isUploading ? 'Uploading...' : 'Upload All Files'}
          </button>
        </div>
      )}
      {data.length > 0 && (
        <div className="data-preview">
          <h3>Data Preview</h3>
          <p>Found {data.length} records ready for upload</p>
        </div>
      )}
      <style jsx>{`
        /* ...keep your styles here... */
        .bulk-upload-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .bulk-header {
          text-align: center;
          margin-bottom: 3rem;
          background: #f0f4f8;
          padding: 2rem;
        }
        .title {
          font-size: 2.5rem;
          font-weight: bold;
          color: #1976d2;
          margin: 0 0 1rem 0;
        }
        @media (max-width: 768px) {
          .title { font-size: 2rem; }
        }
        .subtitle {
          font-size: 1.1rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.5;
        }
        .upload-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          margin-bottom: 2rem;
        }
        .upload-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 500px;
        }
        .upload-grid-mobile {
          grid-template-columns: 1fr;
        }
        .drop-zone {
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          border: 3px dashed #1976d2;
          border-right: none;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }
        @media (max-width: 768px) {
          .drop-zone {
            display: none;
          }
        }
        .drop-content {
          text-align: center;
          padding: 2rem;
        }
        .upload-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          display: block;
        }
        .drop-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #333;
          margin: 0 0 1rem 0;
        }
        @media (max-width: 768px) {
          .drop-title { font-size: 1.25rem; }
        }
        .drop-text {
          color: #666;
          margin: 0 0 1.5rem 0;
          font-size: 1.1rem;
        }
        .browse-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #1976d2;
          color: white;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          text-decoration: none;
        }
        .browse-button.mobile {
          width: 100%;
          justify-content: center;
          margin: 2rem 0;
        }
        .browse-button:hover {
          background: #1565c0;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
        }
        .button-icon { font-size: 1.2rem; }
        .hidden-input { display: none; }
        .file-info {
          margin-top: 2rem;
          color: #666;
          font-size: 0.9rem;
          line-height: 1.4;
        }
        .mobile-browse {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem 0;
        }
        .file-list-container {
          background: white;
          border-left: 1px solid #e0e0e0;
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 768px) {
          .file-list-container {
            border-left: none;
            border-top: 1px solid #e0e0e0;
          }
        }
        .file-list-header {
          padding: 1.5rem;
          background: #f5f5f5;
          border-bottom: 1px solid #e0e0e0;
        }
        .file-list-header h3 {
          margin: 0;
          font-size: 1.2rem;
          font-weight: 600;
          color: #333;
        }
        .file-list {
          flex: 1;
          overflow-y: auto;
          max-height: 400px;
          padding: 0;
        }
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 300px;
          color: #666;
          text-align: center;
        }
        .empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }
        .file-item {
          display: flex;
          align-items: center;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #f0f0f0;
          transition: background-color 0.2s ease;
        }
        .file-item:hover { background-color: #f9f9f9; }
        .file-item-invalid { background-color: #ffebee; }
        .file-avatar {
          font-size: 2rem;
          margin-right: 1rem;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e3f2fd;
          border-radius: 50%;
        }
        .file-info-content { flex: 1; min-width: 0; }
        .file-name {
          font-weight: 500;
          color: #333;
          margin-bottom: 0.25rem;
          word-break: break-word;
          font-size: 0.95rem;
        }
        .file-meta {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .file-type-badge {
          background: #e3f2fd;
          color: #1976d2;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        .file-type-badge.invalid {
          background: #ffcdd2;
          color: #d32f2f;
        }
        .file-size {
          font-size: 0.8rem;
          color: #666;
        }
        .file-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .status-icon { font-size: 1.2rem; }
        .status-icon.success { color: #4caf50; }
        .status-icon.error { color: #f44336; }
        .remove-button {
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 4px;
          transition: background-color 0.2s ease;
        }
        .remove-button:hover { background-color: #ffebee; }
        .progress-container {
          margin: 2rem 0;
          text-align: center;
        }
        .progress-text {
          margin-bottom: 1rem;
          color: #666;
          font-size: 0.9rem;
          font-weight: 500;
        }
        .alert {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          padding: 1rem 2rem;
          border-radius: 8px;
          margin: 2rem auto;
          max-width: 400px;
          font-weight: 600;
        }
        .alert-success {
          background: #e8f5e9;
          color: #388e3c;
        }
        .alert-error {
          background: #ffebee;
          color: #d32f2f;
        }
        .alert-icon { font-size: 1.5rem; }
        .upload-button-container {
          display: flex;
          justify-content: center;
          margin: 2rem 0;
        }
        .upload-button {
          background: #1976d2;
          color: white;
          border: none;
          border-radius: 12px;
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .upload-button.uploading {
          opacity: 0.7;
          pointer-events: none;
        }
        .upload-button:hover {
          background: #1565c0;
          transform: translateY(-2px);
        }
        .data-preview {
          background: #f5f5f5;
          border-radius: 8px;
          padding: 1.5rem;
          margin: 2rem auto;
          max-width: 500px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default BulkUploadcopy;