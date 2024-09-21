import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import { Login, Signup } from './Components';
import Chatbot from './Components/chatbot/Chatbot';
import { useAppStore } from './store';
import Cookies from 'js-cookie';

export default function App() {
  const { isLoading, userInfo, setUserInfo } = useAppStore();
  
  useEffect(() => {
    const idToken = Cookies.get('idToken');
    if (idToken) {
      setUserInfo({ idToken }); // Update userInfo based on token or other logic
    } else {
      setUserInfo(null);
    }
  }, [setUserInfo]);

  if (isLoading) return <div>Loading...</div>;

  // Authentication route protection for login/signup
  const AuthRoute = ({ children }) => {
    const isAuthenticated = !!userInfo;
  
    if (isAuthenticated) {
      // Prevent access to login or signup if authenticated
      return <Navigate to="/chatbot" />;
    }
    return children;
  };

  // Private route protection for authenticated-only routes
  const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!userInfo;
  
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      return <Navigate to="/login" replace />;
    }
  
    return children;
  };

  // Prevent going back to home or other pages when on chatbot
  const PreventNavigation = () => {
    const isAuthenticated = !!userInfo;
    const currentPath = window.location.pathname;
  
    if (isAuthenticated && currentPath !== '/chatbot') {
      // Redirect to chatbot if user tries to access any other page via URL change
      return <Navigate to="/chatbot" replace />;
    }
    return null;
  };

  return (
    <Router>
      <PreventNavigation />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRoute>
              <Signup />
            </AuthRoute>
          }
        />
        <Route
          path="/chatbot"
          element={
            <PrivateRoute>
              <Chatbot />
            </PrivateRoute>
          }
        />
        {/* Redirect any other route to the chatbot if authenticated */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}
