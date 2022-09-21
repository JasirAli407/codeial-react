import React, { useEffect, useState } from 'react';
import { getPost } from '../api';
import {Home}  from '../pages';
function App() {

  const[loading, setLoading] = useState(true)

  // synchronous function can only be passed to useEffect hook; thats why we wrap it in a function
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPost();
      console.log('response',response);
    };

    fetchPosts();
  }, []);
  return <div>
   <Home/>
  </div>;
}

export default App;
