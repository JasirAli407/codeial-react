import styles from '../styles/home.module.css';

const Home = () => {
  return (
    <div className={styles.postsList}>
      <div className={styles.postWrapper}>
        <div className={styles.postHeader}>
          <div className={styles.postAvatar}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/149/149071.png"
              alt="user-pic"
            />
            {/* <i className="fa fa-regular fa-user"></i> */}
            
            <div>
              <span className={styles.postAuthor}>Jasir</span>
              <span className={styles.postTime}>a minute ago</span>
            </div>
          </div>
          <div className={styles.postContent}>Post Content</div>

          <div className={styles.postActions}>
            <div className={styles.postLike}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/860/860808.png"
                alt="likes-icon"
              />

              {/* <i className="fa fa-regular fa-heart"></i> */}

              <span>5</span>
            </div>

            <div className={styles.postCommentsIcon}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/3031/3031126.png"
                alt="comments-icon"
              />

              {/* <i className="fa fa-comment"></i> */}
              <span>2</span>
            </div>
          </div>
          <div className={styles.postCommentBox}>
            <input placeholder="Start typing a comment" />
          </div>

          <div className={styles.postCommentsList}>
            <div className={styles.postCommentsItem}>
              <div className={styles.postCommentHeader}>
                <span className={styles.postCommentAuthor}>Bill</span>
                <span className={styles.postCommentTime}>a minute ago</span>
                <span className={styles.postCommentLikes}>22</span>
              </div>

              <div className={styles.postCommentContent}>Random comment</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
