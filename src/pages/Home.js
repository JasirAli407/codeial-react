// import PropTypes from 'prop-types';
import { CreatePost, FriendsList, Loader, Post } from '../components';
import styles from '../styles/home.module.css';
import { useAuth, usePosts } from '../hooks';
// import { createComment } from '../api';

const Home = () => {
  const auth = useAuth();
  // console.log('Home', auth.user);
  const posts = usePosts();
  // console.log(posts);

  if (posts.loading) {
    return <Loader />;
  }

 

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        {auth.user && <CreatePost />}
        {posts.data.map((post) => {
          return (
            <Post post={post} key={`post-${post._id}`}/>
          );
        })}
      </div>
      {auth.user && <FriendsList />}
    </div>
  );
};
//  in our initial stage v get posts via props..thats why :
// Home.propTypes = {
//   posts: PropTypes.array.isRequired,
// };

export default Home;
