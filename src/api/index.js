import { LOCALSTORAGE_TOKEN_KEY, API_URLS, getFormBody } from '../utils';

const customFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

  const headers = {
    // format of content type that the server is expecting
    'content-type': 'application/x-www-form-urlencoded',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = getFormBody(body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    // console.log('response', response);
    // console.log('data',data);

    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }

    throw new Error(`Error!! ${data.message}`);
  } catch (error) {
    console.error('error catched');
    return {
      message: error.message,
      success: false,
    };
  }
};

export const getPost = (page = 1, limit = 20) => {
  return customFetch(API_URLS.posts(page, limit), { method: 'GET' });
};

export const login = (email, password) => {
  return customFetch(API_URLS.login(), {
    method: 'POST',
    body: { email, password },
  });
};

export const signup = (name, email, password, confirmPassword) => {
  return customFetch(API_URLS.signup(), {
    method: 'POST',
    body: {
      name,
      email,
      password,
      confirm_password: confirmPassword,
    },
  });
};

export const editProfile = (userId, name, password, confirmPassword) => {
  return customFetch(API_URLS.editUser(), {
    method: 'POST',
    body: {
      id: userId,
      name,
      password,
      confirm_password: confirmPassword,
    },
  });
};

export const fetchUserProfile = (userId) => {
  return customFetch(API_URLS.userInfo(userId), { method: 'GET' });
};

export const fetchUserFriends = () => {
  return customFetch(API_URLS.friends(), { method: 'GET' });
};

export const addFriend = (userId) => {
  return customFetch(API_URLS.createFriendship(userId), { method: 'POST' });
};

export const removeFriend = (userId) => {
  return customFetch(API_URLS.removeFriend(userId), {
    method: 'POST',
  });
};

export const addPost = (content) => {
  return customFetch(API_URLS.createPost(), {
    method: 'POST',
    body: {
      content,
    },
  });
};

export const createComment = (postId, content) => {
  return customFetch(API_URLS.comment(), {
    method: 'POST',
    body: { content, post_id: postId },
  });
};

export const toggleLike = (itemId, itemType) => {
  return customFetch(API_URLS.toggleLike(itemId, itemType), { method: 'POST' });
};

export const searchUsers = (searchText)=>{
  return customFetch(API_URLS.searchUsers(searchText), {method: 'GET'})
}
