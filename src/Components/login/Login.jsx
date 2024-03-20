import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo1 from '../../assets/logo2.png';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider for Google button
import { GoogleLogin } from '@react-oauth/google'; // Import GoogleLogin for Google button
import MicrosoftLogin from 'react-microsoft-login'; // Import MicrosoftLogin for Microsoft button
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

  const handleMicrosoftRedirectUri = () => {
    console.log('Microsoft redirect URI');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully');
      navigate('/chatbot');
    } catch (signInError) {
      setLoginError("You don't have an existing account. Please sign up first.");
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
          <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
            />
          </GoogleOAuthProvider>
        </div>
        <div className="microsoftbutton">
          <MicrosoftLogin
            clientId="3338bf4f-4e11-4043-b366-9df8d243d82c"
            authCallback={handleMicrosoftAuthCallback}
            redirectUri={handleMicrosoftRedirectUri}
          />
        </div>
      </div>
      <div className="policies">
        <p>Terms of Use | Privacy Policy</p>
      </div>
    </>
  );
}
