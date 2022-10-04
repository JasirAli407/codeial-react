import { useAuth } from '../hooks';
import styles from '../styles/settings.module.css';
import {
  useLocation,
  useNavigate,
  useParams,
  Navigate,
} from 'react-router-dom';
import { useState } from 'react';
import { addFriend, fetchUserProfile, removeFriend } from '../api';
import { useEffect } from 'react';
import { notify } from '../utils';
import { Loader } from '../components';

const UserProfile = () => {
  const auth = useAuth();
  // console.log('UserProfile', auth);
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);
  const userId = useParams().userid;
  // console.log("userid",userId);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setRequestInProgress] = useState(false);

  // old way to solve missing of user on reload page  using api call
  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);

      if (response.success) {
        setUser(response.data.user);
      } else {
        console.error(response.message);
        notify('Cannot find user', 'error');
        navigate('/');
      }
      setLoading(false);
    };

    getUser();
  }, [userId, navigate]);

  // this is the new way
  // if user is undefined, we make it as an empty object
  //  const { user = {} } = location.state;
  //  if(user.length ===0){
  //    notify('Account trying to reach is deleted', 'error');
  //   return <Navigate to='/' replace /> }

  if (loading) {
    return <Loader />;
  }

  const checkIfUserIsAFriend = () => {
    if( auth.user.friends){
    const friends = auth.user.friends;
    const friendIds = friends.map((friend) => friend.to_user._id);

    const index = friendIds.indexOf(userId);

    if (index === -1) {
      return true;
    } else {
      return false;
    }
  }
  return false;
  };

  const handleAddFriendClick = async () => {
    setRequestInProgress(true);
    const response = await addFriend(userId);
    // console.log(response);
    if (response.success) {
      const { friendship } = response.data;
      auth.updateUserFriends(true, friendship);
      notify('Successfully added', 'success');
    } else {
      notify('response.message', 'error');
    }
    setRequestInProgress(false);
  };

  const handleremoveFriendClick = async () => {
    setRequestInProgress(true);
    const response = await removeFriend(userId);
    if (response.success) {
      auth.updateUserFriends(false, userId);
      notify('Successfully unfriended', 'success');
    } else {
      notify('response.message', 'error');
    }
    setRequestInProgress(false);
  };

  const showAddFriendsButton = checkIfUserIsAFriend();

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
        <div className={styles.fieldValue}>{user.email}</div>
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {showAddFriendsButton ? (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleAddFriendClick}
            disabled={requestInProgress}
          >
            {requestInProgress ? ' Adding ...' : 'Add Friend'}
          </button>
        ) : (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleremoveFriendClick}
            disabled={requestInProgress}
          >
            {requestInProgress ? ' Removing ...' : 'Remove Friend'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
