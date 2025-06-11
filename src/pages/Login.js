// import React, { useState } from 'react';
// import styles from './Login.module.css';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     // keepSignedIn: false
//   });

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       // Replace with your actual API endpoint
//       const response = await fetch('/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: formData.username,
//           password: formData.password,
//         //   keepSignedIn: formData.keepSignedIn
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         // Handle successful login
//         console.log('Login successful:', data);
//         // Redirect to dashboard or home page
//         // window.location.href = '/dashboard';
//       } else {
//         // Handle login error
//         console.error('Login failed');
//         alert('Invalid credentials. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       alert('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className={styles.body}>
//       <div className={`${styles.shape} ${styles.shape1}`}></div>
//       <div className={`${styles.shape} ${styles.shape2}`}></div>
//       <div className={`${styles.shape} ${styles.shape3}`}></div>
      
//       <div className={styles.loginContainer}>
//         <div className={styles.logo}>
//           <div className={styles.logoIcon}></div>
//           <h1>Sign in</h1>
//         </div>
        
//         <div onSubmit={handleSubmit}>
//           <div className={styles.formGroup}>
//             <div className={styles.inputWrapper}>
//               <span className={styles.inputIcon}>👤</span>
//               <input 
//                 type="text" 
//                 className={styles.formInput} 
//                 placeholder="username" 
//                 name="username"
//                 value={formData.username}
//                 onChange={handleInputChange}
//                 required 
//               />
//             </div>
//           </div>
          
//           <div className={styles.formGroup}>
//             <div className={styles.inputWrapper}>
//               <span className={styles.inputIcon}>🔒</span>
//               <input 
//                 type="password" 
//                 className={styles.formInput} 
//                 placeholder="password" 
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 required 
//               />
//             </div>
//           </div>
          
//           {/* <div className={styles.checkboxWrapper}>
//             <input 
//               type="checkbox" 
//               id="keepSignedIn" 
//               className={styles.checkbox}
//               name="keepSignedIn"
//               checked={formData.keepSignedIn}
//               onChange={handleInputChange}
//             />
//             <label className={styles.checkboxLabel}>
//               Keep me signed in
//             </label>
//           </div> */}
          
//           <button type="button" className={styles.loginBtn} onClick={handleSubmit}>
//             Sign In
//           </button>
          
//           {/* <div className={styles.forgotPassword}>
//             <a href="#" onClick={(e) => {
//               e.preventDefault();
//               // Handle forgot password logic
//               console.log('Forgot password clicked');
//             }}>
//               Forgot Password?
//             </a>
//           </div> */}
//         </div>
//       </div>
      
//       {/* <div className={styles.signupLink}>
//         Not a Member? <a href="#" onClick={(e) => {
//           e.preventDefault();
//           // Handle sign up navigation
//           console.log('Sign up clicked');
//         }}>Sign up</a>
//       </div> */}
//     </div>
//   );
// };

// export default Login;



// import React, { useState } from 'react';
// import styles from './Login.module.css';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:4000/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: formData.username,
//           password: formData.password,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Login successful:', data);

//         // Save token to localStorage
//         localStorage.setItem('authToken', data.token);

//         // TODO: Navigate to dashboard or next step
//         alert('Login successful!');
//         // Inside handleSubmit success block
//         window.location.href = '/dashboard';
//       } else {
//         alert('Invalid credentials. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       alert('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className={styles.body}>
//       <div className={`${styles.shape} ${styles.shape1}`}></div>
//       <div className={`${styles.shape} ${styles.shape2}`}></div>
//       <div className={`${styles.shape} ${styles.shape3}`}></div>

//       <div className={styles.loginContainer}>
//         <div className={styles.logo}>
//           <div className={styles.logoIcon}></div>
//           <h1>Sign in</h1>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className={styles.formGroup}>
//             <div className={styles.inputWrapper}>
//               <span className={styles.inputIcon}>👤</span>
//               <input
//                 type="text"
//                 className={styles.formInput}
//                 placeholder="username"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//           </div>

//           <div className={styles.formGroup}>
//             <div className={styles.inputWrapper}>
//               <span className={styles.inputIcon}>🔒</span>
//               <input
//                 type="password"
//                 className={styles.formInput}
//                 placeholder="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//           </div>

//           <button type="submit" className={styles.loginBtn}>
//             Sign In
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;




import React, { useState } from 'react';
import styles from './Login.module.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input changed - ${name}: ${value}`);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);

    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response status:', response.status);
      const raw = await response.text();
      console.log('Raw response:', raw);
    //   const data = await response.json();
let data;
    try {
  data = JSON.parse(raw);
  console.log('Parsed JSON:', data);
  // Handle login success or failure here...
} catch (err) {
  console.error('Error parsing JSON:', err);
}
      if (data.success && data.token) {
        

        console.log('Login successful, token received:', data.token);

        localStorage.setItem('authToken', data.token);
        alert('Login successful!');
        window.location.href = '/dashboard';
      } else {
        console.warn('Login failed: Invalid credentials');
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error during login request:', error);
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
