import React, { useState } from "react";
import styles from "./UploadBanner.module.css";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function UploadBanner() {
  const [form, setForm] = useState({
    clientId: "",
    panId: "",
    channel: "",
    priority: "",
    clickAction: "",
    file: null,
  });

  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setForm((prev) => ({ ...prev, file: e.dataTransfer.files[0] }));
    }
  };

  const handleSubmit = async () => {
    if (!form.file) {
      alert("Please select a file to upload.");
      return;
    }

    setUploading(true);

    const bannerMetadata = {
      clientId: form.clientId,
      panId: form.panId,
      channel: form.channel.toLowerCase(),
      priority: parseInt(form.priority, 10),
      clickAction: form.clickAction,
      status: "active",
    };

    const formData = new FormData();
    formData.append("banner", new Blob([JSON.stringify(bannerMetadata)], { type: "application/json" }));
    formData.append("file", form.file);

    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.post(`${API_BASE_URL}/api/banners`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        setUploadSuccess(true);
        clearForm();
        setTimeout(() => setUploadSuccess(false), 3000);
      } else {
        alert("Upload failed with status: " + response.status);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload error: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const clearForm = () => {
    setForm({
      clientId: "",
      panId: "",
      channel: "",
      priority: "",
      clickAction: "",
      file: null,
    });
  };

  const isFormValid =
    form.clientId &&
    form.panId &&
    form.channel &&
    form.priority &&
    form.clickAction &&
    form.file;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Upload a Banner</h1>
        </div>

        <div className={styles.card}>
          <div className={styles.formContainer}>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Client ID</label>
                <input
                  name="clientId"
                  value={form.clientId}
                  placeholder="Enter client ID"
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>PAN ID</label>
                <input
                  name="panId"
                  value={form.panId}
                  placeholder="Enter PAN ID"
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Channel</label>
                <select
                  name="channel"
                  value={form.channel}
                  onChange={handleChange}
                  required
                  className={styles.select}
                >
                  <option value="">Select channel</option>
                  <option value="web">Web</option>
                  <option value="mobile">Mobile</option>
                  <option value="email">Email</option>
                  <option value="social media">Social Media</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Priority</label>
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  required
                  className={styles.select}
                >
                  <option value="">Select priority</option>
                  <option value="1">High (1)</option>
                  <option value="2">Medium (2)</option>
                  <option value="3">Low (3)</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Redirect URL</label>
                <input
                  name="clickAction"
                  type="url"
                  value={form.clickAction}
                  placeholder="https://example.com"
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.uploadSection}>
              <label className={styles.label}>Banner Image</label>
              <div
                className={`${styles.uploadArea} ${
                  dragActive
                    ? styles.dragActive
                    : form.file
                    ? styles.fileSelected
                    : ""
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className={styles.fileInput}
                />

                {form.file ? (
                  <div className={styles.fileInfo}>
                    <div className={styles.checkIcon}>✓</div>
                    <p className={styles.fileName}>{form.file.name}</p>
                    <p className={styles.fileSize}>
                      {(form.file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className={styles.uploadPrompt}>
                    <div className={styles.uploadIcon}>↑</div>
                    <div className={styles.uploadText}>
                      <p className={styles.primaryText}>
                        Drop your banner image here
                      </p>
                      <p className={styles.secondaryText}>
                        or click to browse files
                      </p>
                    </div>
                    <div className={styles.fileTypes}>
                      <span>JPG up to 5MB</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button
                type="button"
                className={styles.clearButton}
                onClick={clearForm}
              >
                Clear Form
              </button>

              <button
                type="button"
                disabled={!isFormValid || uploading}
                className={`${styles.submitButton} ${
                  isFormValid && !uploading
                    ? styles.submitButtonActive
                    : styles.submitButtonDisabled
                }`}
                onClick={handleSubmit}
              >
                {uploading ? (
                  <div className={styles.loadingContent}>
                    <div className={styles.spinner}></div>
                    <span>Uploading...</span>
                  </div>
                ) : (
                  "Upload Banner"
                )}
              </button>
            </div>
          </div>
        </div>

        {uploadSuccess && (
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✓</div>
            <p className={styles.successText}>Banner uploaded successfully!</p>
          </div>
        )}

        <div className={styles.infoCard}>
          <div className={styles.infoIcon}>i</div>
          <div className={styles.infoContent}>
            <h3 className={styles.infoTitle}>Banner Guidelines</h3>
            <ul className={styles.infoList}>
              <li>• Recommended size: 1200x630 pixels</li>
              <li>• Maximum file size: 5MB</li>
              <li>• Supported formats: JPG</li>
              <li>• Banner will be active for 7 days by default</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadBanner;
