// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import PostDetail from './Pages/PostDetail';
import CreateEditPost from './Pages/CreateEditPost';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import NotFoundPage from './Pages/NotFoundPage';
import Layout from './components/Layout'; // We'll create this
import { AuthProvider } from './context/AuthContext'; // We'll create this

function App() {
  return (
    <Router>
      <AuthProvider> {/* Wrap your app with AuthProvider */}
        <Routes>
          <Route path="/" element={<Layout />}> {/* Use Layout for common elements */}
            <Route index element={<HomePage />} />
            <Route path="/posts/:slug" element={<PostDetail />} />
            <Route path="/create-post" element={<CreateEditPost />} />
            <Route path="/edit-post/:slug" element={<CreateEditPost />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} /> {/* Catch-all for 404 */}
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;