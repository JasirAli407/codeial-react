import styles from '../styles/navbar.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import { useState } from 'react';
import { useEffect } from 'react';
import { searchUsers } from '../api';

const Navbar = () => {
  const auth = useAuth();
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  // console.log(auth);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await searchUsers(searchText);
      if (response.success) {
        setResults(response.data.users);
      }
    };

    if (searchText.length > 2) {
      fetchUsers();
    }else{
      setResults([])
    }
  }, [searchText]);

  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
            alt="app-logo"
          />
        </Link>
      </div>

      <div className={styles.searchContainer}>
        <img
          className={styles.searchIcon}
          src="https://cdn-icons-png.flaticon.com/128/54/54481.png"
          alt=""
        />

        <input
          type="text"
          placeholder="Search Users"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />

        {results.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {results.map((user) => (
                <li
                  className={styles.searchResultsRow}
                  key={`user-${user._id}`}
                >
                  <Link to={`/user/${user._id}`} onClick={()=>{setResults([])
                  setSearchText('')}}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
                      alt="user-img"
                    />
                    <span>{user.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
                alt="user-img"
                className={styles.userDp}
              />
            </Link>
            <span>{auth.user.name}</span>
          </div>
        )}

        <div className={styles.navLinks}>
          <ul>
            {!auth.user ? (
              <>
                <li>
                  <Link to="/login">Log In</Link>
                </li>

                <li>
                  <Link to="/signup">Register</Link>
                </li>
              </>
            ) : (
              <li onClick={auth.logout}>
                <Link to="/">Log Out</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
