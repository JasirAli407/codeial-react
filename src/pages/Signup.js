import { useState } from 'react';
import { useAuth } from '../hooks';
import {  useNavigate, Navigate, redirect } from 'react-router-dom';
import { notify } from '../utils';
import styles from '../styles/login.module.css';
import { useEffect } from 'react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signingup, setSigningup] = useState(false);
  const auth = useAuth();
  //   console.log(auth);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let error = false;

    setSigningup(true);

    if (
      name === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      notify('Please fill all the fields', 'error');
      error = true;
    } else if (password !== confirmPassword) {
      notify('Password Doesnt match', 'error');
      error = true;
    }

    if (error) {
      return setSigningup(false);
    }

    const response = await auth.signup(name, email, password, confirmPassword);

    if (response.success) {
        navigate('/login');
      setSigningup(false);
      return notify('Successfully Registered', 'success');
    } else {
      notify(`Error!!${response.message}`, 'error');
    }
    setSigningup(false);
  };

   if(auth.user){
    return <Navigate to='/' replace />
   }


  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Signup</span>

      <div className={styles.field}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          autoComplete="on"
        />
      </div>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          autoComplete="on"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </div>

      <div className={styles.field}>
        <button disabled={signingup}>
          {signingup ? 'Signingup...' : 'Signin'}
        </button>
      </div>
    </form>
  );
};

export default Signup;
