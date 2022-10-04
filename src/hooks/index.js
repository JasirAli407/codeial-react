import { useContext, useEffect, useState } from 'react';
import { AuthContext, PostsContext } from '../providers';
import {
  editProfile,
  fetchUserFriends,
  login as userLogin,
  signup as userSignup,
  getPost,
} from '../api';
import {
  getItemFromLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
  removeItemFromLocalStorage,
  setItemInLocalStorage,
} from '../utils';
import jwt from 'jwt-decode';

// v make this custom hook so that v dont need to call useContext()hook again and again in every function component
export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  // console.log('useProvideAuth');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // v use useEffect hook bcos of side effects
  useEffect(() => {
    // console.log('useEffect');
    const getUser = async () => {
      const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
      // console.log('userToken', userToken);
      if (userToken) {
        const decodedUser = jwt(userToken);
        // console.log('decoded user', decodedUser);
        const response = await fetchUserFriends();
        // console.log(response);
        let friends = [];
        if (response.success) {
          friends = response.data.friends;
          // console.log('friends', friends);
        }

        setUser({
          ...decodedUser,
          friends,
        });
      }

      setLoading(false);
    };

    getUser();
  }, []);

  // handle user update

  const updateUser = async (userId, name, password, confirmPassword) => {
    const response = await editProfile(userId, name, password, confirmPassword);

    console.log(response);
    if (response.success) {
      setUser(response.data.user);
      // localStorage[LOCALSTORAGE_TOKEN_KEY] = response.data.token
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return { success: true };
    } else {
      return { success: false, message: response.message };
    }
  };

  // handle signup
  const signup = async (name, email, password, confirmPassword) => {
    const response = await userSignup(name, email, password, confirmPassword);

    if (response.success) {
      return { success: true };
    } else {
      return { success: false, message: response.message };
    }
  };

  // handle login
  const login = async (email, password) => {
    const response = await userLogin(email, password);
    console.log('response', response);

    if (response.success) {
      console.log('response.data.user', response.data.user);

      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      const fetchFriendsresponse = await fetchUserFriends();
      // console.log(response);
      let friends = [];
      if (fetchFriendsresponse.success) {
        friends = fetchFriendsresponse.data.friends;
        // console.log('friends', friends);
      }
      setUser({
        ...response.data.user,
        friends,
      });

      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  // handle logout
  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };

  const updateUserFriends = (addFriend, friend) => {
    if (addFriend) {
      setUser({
        ...user,
        friends: [...user.friends, friend],
      });
    } else {
      // console.log('friend', friend);
      // console.log('user.friends', user.friends);

      const newFriends = user.friends.filter(
        (friendElement) => friendElement.to_user._id !== friend
      );
      // console.log('newFriends',newFriends);
      setUser({
        ...user,
        friends: newFriends,
      });
    }
  };

  return {
    user,
    signup,
    login,
    updateUser,
    logout,
    loading,
    updateUserFriends,
  };
};

export const useProvidePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // synchronous function can only be passed to useEffect hook; thats why we wrap it in a function
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPost();
      // console.log('response', response);

      if (response.success) {
        setPosts(response.data.posts);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const addPostToState = (post) => {
    const newPosts = [post, ...posts];
    setPosts(newPosts);
  };

  const addCommentToPost =  (postId, content)=>{
    const newPosts = posts.map((post)=>{
      if(post._id === postId){
      return {...post, comments: [content, ...post.comments]} 
      }

      return post;
    })
    setPosts(newPosts)
  }

  return {
    data: posts,
    loading,
    addPostToState,
    addCommentToPost
  };
};

export const usePosts = () => {
  return useContext(PostsContext);
};
