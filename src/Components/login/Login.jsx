import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo1 from '../../assets/logo2.png';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Removed unnecessary getAuth import
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider for Google button
import { GoogleLogin } from '@react-oauth/google'; // Import GoogleLogin for Google button
import MicrosoftLogin from 'react-microsoft-login'; // Import MicrosoftLogin for Microsoft button
import auth from './firebaseconfig'; // Import Firebase auth instance from your firebase file
import './login.css';

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [loginError, setLoginError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSignUp = () => {
    navigate('/signup');
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
      await signInWithEmailAndPassword(auth, email, password); // Use the imported auth instance
      console.log('User logged in successfully');
      navigate('/chatbot');
    } catch (signInError) {
      setLoginError("No existing account with these credentials ,  Please sign up first.");
    }
  };

  return (
    <>
      <div className="top-logo">
        <img src={logo1} alt="Logo" />
      </div>
      <div className="middle-essentials">
        <h1>Welcome back</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="user-input-wrp">
            <input type="email" name="email" className="inputText" placeholder="Email address" value={user.email} onChange={handleInputs} />
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="inputPassword"
                placeholder="Password"
                value={user.password}
                onChange={handleInputs}
              />
              <div className='check'>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <span className='showpwd'>Show Password</span>
                </label>
              </div>
            </div>
            <span className="floating-input">Email address</span>
          </div>
          <button type="submit">Continue</button>
          {loginError && <p className="error-message">{loginError}</p>}
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
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
            redirectUri={'http://localhost:3000/chatbot'}
          />
        </div>
      </div>
      <div className="policies">
        <p>Terms of Use | Privacy Policy</p>
      </div>
    </>
  );
}
