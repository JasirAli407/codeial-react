import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import './styles/index.css';
import 'font-awesome/css/font-awesome.min.css';
import { App } from './components';
import { BrowserRouter as Router} from 'react-router-dom';
import { AuthProvider, PostsProvider } from './providers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <AuthProvider>
      <PostsProvider>
        <Router>
        <App />
        </Router>
      </PostsProvider>
    </AuthProvider>
  </React.StrictMode>
);
