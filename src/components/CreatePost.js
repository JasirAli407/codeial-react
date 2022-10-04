import { useState } from 'react';
import { addPost } from '../api';
import { usePosts } from '../hooks';
import styles from '../styles/home.module.css';
import { notify } from '../utils';

const CreatePost = () => {
  const [post, setPost] = useState('');
  const [addingPost, setAddingPost] = useState(false);

  const posts = usePosts();
//   console.log('CreatePost');

  const handleAddPostClick = async (e) => {
    setAddingPost(true);

    //I have to do some checks b4 posting!!

    const response = await addPost(post);
    if (response.success) {
      // console.log(response);
      setPost('');
      posts.addPostToState(response.data.post);
        notify('Post created successfully', 'success');
    } else {
      notify(response.message)
    }
    setAddingPost(false)
  };

  return (
    <div className={styles.createPost}>
      <textarea
        className={styles.addPost}
        value={post}
        onChange={(e) => setPost(e.target.value)}
      ></textarea>

      <div>
        <button className={styles.addPostBtn} onClick={handleAddPostClick}>
          {addingPost ? 'Adding post' : 'Add Post'}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
