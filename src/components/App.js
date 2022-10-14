import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Home, Login, Signup, Settings, UserProfile } from '../pages';
import { Loader, Navbar } from './';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';

const Page404 = () => {
  return <div style={{margin:'auto'}}>404:PAGE NOT FOUND!!</div>;
};


function PrivateRoutes(){
const auth = useAuth();
  // v use outlet comp so that v can nest child route comps inside route comps
 return  auth.user? <Outlet /> :  <Navigate to='/login'/>
}


function App() {
  const auth = useAuth();
 

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div> 
      
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route  element={<PrivateRoutes />} >
          <Route path="/settings" element={<Settings />} />
          <Route path="/user/:userid" element={<UserProfile />} />
          </Route>

          <Route path="/signup" element={<Signup />} />          
          <Route path="/login" element={<Login />} />          
          <Route path="*" element={<Page404 />} />
        </Routes>
      
    </div>
  );
}

export default App;
