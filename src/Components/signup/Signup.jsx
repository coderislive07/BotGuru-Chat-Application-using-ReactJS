import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo1 from '../../assets/logo2.png';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import createUserWithEmailAndPassword for Firebase
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider for Google button
import { GoogleLogin } from '@react-oauth/google'; // Import GoogleLogin for Google button
import MicrosoftLogin from 'react-microsoft-login'; // Import MicrosoftLogin for Microsoft button
import auth from '../login/firebaseconfig'; // Import Firebase auth instance from your firebase file
import './signup.css'; // You can create this CSS file for styling

export default function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [signupError, setSignupError] = useState(null);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleGoogleLoginSuccess = () => {
    navigate('/chatbot');
  };

  const handleGoogleLoginError = () => {
    console.log('Google login failed');
  };

  const handleMicrosoftAuthCallback = (err, data) => {
    console.log('Microsoft auth callback:', err, data);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    try {
      await createUserWithEmailAndPassword(auth, email, password); // Use createUserWithEmailAndPassword for Firebase
      console.log('User signed up successfully');
      navigate('/chatbot');
    } catch (signupError) {
      setSignupError("An account already exist with this email , Please Login");

     
    }
  };

  return (
    <>
      <div className="top-logo">
        <img src={logo1} alt="Logo" />
      </div>
      <div className="middle-essentials">
        <h1>Create an account</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="user-input-wrp">
            <input type="email" name="email" className="inputText" placeholder="Email address" value={user.email} onChange={handleInputs} />
            <input type="password" name="password" className="inputPassword" placeholder="Password" value={user.password} onChange={handleInputs} />
            <span className="floating-input">Email address</span>
          </div>
          <button type="submit">Sign Up</button>
          {signupError && <p className="error-message">{signupError}</p>}
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <h2><span>OR</span></h2>
      </div>
      <div className="buttons">
        <div className="googlebutton">
          <GoogleOAuthProvider clientId="703349034098-p46flheubh9hrs5d8f3le5baukqtf9al.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
            />
          </GoogleOAuthProvider>
        </div>
        <div className="microsoftbutton">
          <MicrosoftLogin
            clientId='5adbb0be-12db-4c0e-bdc9-b56db79da36f'
            authCallback={handleMicrosoftAuthCallback}
            redirectUri={'https://mridulchatgpt.vercel.app/chatbot'}
          />
        </div>
      </div>
      <div className="policies">
        <p>Terms of Use | Privacy Policy</p>
      </div>
    </>
  );
}
