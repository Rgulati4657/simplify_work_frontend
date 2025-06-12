
import React, { useState } from 'react';
import styles from './Login.module.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const baseUrl = process.env.REACT_APP_API_BASE_URL || 'https://myapp-882701280393.us-central1.run.app'; 
    console.log('API Base URL:', process.env.REACT_APP_API_BASE_URL);
    console.log('Base URL:', baseUrl);
    if (!baseUrl) {
      alert('API base URL not configured. Set REACT_APP_API_BASE_URL in your .env file.');
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/api/auth/login`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const raw = await response.text();
      let data;

      try {
        data = JSON.parse(raw);
      } catch (err) {
        console.error('Error parsing JSON:', err);
        alert('Unexpected response from server.');
        return;
      }

      if (response.ok && data.jwt) {
        console.log('Login successful, JWT received:', data.jwt);
        localStorage.setItem('authToken', data.jwt);
        // alert('Login successful!');
        window.location.href = '/dashboard';
      } else {
        console.warn('Login failed:', data);
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login request error:', error);
      alert(`An error occurred. Please try again. ${error.message}`);
    }
  };

  return (
    <div className={styles.body}>
      <div className={`${styles.shape} ${styles.shape1}`}></div>
      <div className={`${styles.shape} ${styles.shape2}`}></div>
      <div className={`${styles.shape} ${styles.shape3}`}></div>

      <div className={styles.loginContainer}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}></div>
          <h1>Sign in</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>👤</span>
              <input
                type="text"
                className={styles.formInput}
                placeholder="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>🔒</span>
              <input
                type="password"
                className={styles.formInput}
                placeholder="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <button type="submit" className={styles.loginBtn}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
