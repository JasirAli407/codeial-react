import Comment from './Comment';
import styles from '../styles/home.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { createComment, toggleLike } from '../api';
import { usePosts } from '../hooks';
import { notify } from '../utils';

const Post = (props) => {
  const [comment, setComment] = useState('');
  const [creatingComment, setCreatingComment] = useState(false);
  const posts = usePosts();
  const { post } = props;

  const handleAddComment = async (postId, content) => {
    setCreatingComment(true);
    const response = await createComment(postId, content);
    // console.log('response.data', response.data);
    if (response.success) {
        setComment('');
      notify('Commented created Successfully', 'success');
      posts.addCommentToPost(postId, response.data.comment);
    } else {
      notify(response.message, 'error');
    }
    setCreatingComment(false);
  };

  const handlePostLikeClick = async ()=>{
    const response = await toggleLike(post._id, 'Post');
    if(response.success){
      if(response.data.deleted){
        notify('Post Unliked','error')
      }else{
        notify('Post Liked ', 'success')

      }
    }else{
      notify(response.message)
    }
  }

  return (
    <div className={styles.postWrapper}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
            alt="user-pic"
          />
          {/* <i className="fa fa-regular fa-user"></i> */}

          <div>
            <Link
              to={`/user/${post.user._id}`}
              state={{
                user: post.user,
              }}
            >
              <span className={styles.postAuthor}>{post.user.name}</span>
            </Link>
            <span className={styles.postTime}>a minute ago</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike}>
            <button onClick={handlePostLikeClick}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/860/860808.png"
              alt="likes-icon"
            />
            </button>

            {/* <i className="fa fa-regular fa-heart"></i> */}

            <span>{post.likes.length}</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/3031/3031126.png"
              alt="comments-icon"
            />

            {/* <i className="fa fa-comment"></i> */}
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input
            placeholder="Start typing a comment..."
            value={comment}
            disabled={creatingComment}
            onChange={(e) => setComment(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleAddComment(post._id, comment);
              }
            }}
          />
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => {
            return <Comment comment={comment} key={comment._id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
