import { useState } from 'react';
import styles from '../styles/login.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { notify } from '../utils';
import { useAuth } from '../hooks';
import { useEffect } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e) => {
    // to prevent reload
    e.preventDefault();
    // console.log('hii');
    if (!email || !password) {
      notify('Please enter both email and password', 'error');
      return;
    }
    setLoggingIn(true);

    const response = await auth.login(email, password);

    if (response.success) {
      notify('successfully logged in', 'success');
      navigate('/');
    } else {
      notify(response.message, 'error');
    }
    setLoggingIn(false);
  };

  if (auth.user) {
    return <Navigate to="/" replace />;
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Login</span>
      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          autoComplete='on'
          // value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Password"
          autoComplete= 'on'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
      </div>

      <div className={styles.field}>
        <button disabled={loggingIn}>
          {loggingIn ? 'Logging In' : 'Log In'}
        </button>
      </div>
    </form>
  );
};

export default Login;
