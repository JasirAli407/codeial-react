import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import styles from '../styles/settings.module.css';
import { notify } from '../utils';
const Settings = () => {
  const auth = useAuth();
//   console.log(auth);
   const navigate = useNavigate()

  const [editmode, setEditMode] = useState(false);
  const [name, setName] = useState(auth.user?.name);
    const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [savingForm, setSavingForm] = useState(false);

  const clearForm = ()=>{
    setPassword('');
    setconfirmPassword('');
  }
  const updateProfile = async() => {
    setSavingForm(true);

    let error = false;
    if (!name || !password || !confirmPassword) {
      notify('Please fill all the fields', 'error');
      error = true;
    }

    if (password !== confirmPassword) {
      notify('password and confirmPassword does not match', 'error');
      error = true;
    }

    if (error) {
      return setSavingForm(false);
    }

    const response = await auth.updateUser(
      auth.user._id,
      name,
      password,
      confirmPassword
    );

    if(response.success){
        notify("Successfully updated", 'success')
      setSavingForm(false);
      setEditMode(false);
      clearForm()
      return;
    }else{
        notify(response.message, 'error')
        setSavingForm(false);
        setEditMode(false);
    }

    setSavingForm(false);
  };

   
  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
          alt="user-img"
        />
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        {editmode ? (
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        ) : (
          <div className={styles.fieldValue}>{auth.user?.name}</div>
        )}
      </div>
      {editmode && (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.fieldLabel}>Confirm Password</div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setconfirmPassword(e.target.value);
              }}
            />
          </div>
        </>
      )}

      <div className={styles.btnGrp}>
        {editmode ? (
          <>
            <button
              className={`button ${styles.saveBtn}`}
              onClick={updateProfile}
              disabled={savingForm}
            >
              {savingForm ? 'Saving Profile...' : 'Save Profile'}
            </button>
            <button
              className={`button ${styles.editBtn}`}
              onClick={() => {
                setEditMode(false);
              }}
            >
              GoBack
            </button>
          </>
        ) : (
          <button
            className={`button ${styles.editBtn}`}
            onClick={() => {
              setEditMode(true);
            }}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Settings;
