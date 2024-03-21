import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo1 from '../../assets/logo2.png';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth } from 'firebase/auth'; // Combined imports
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider for Google button
import { GoogleLogin } from '@react-oauth/google'; // Import GoogleLogin for Google button
import MicrosoftLogin from 'react-microsoft-login'; // Import MicrosoftLogin for Microsoft button
import './signup.css';

export default function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLoginForm = () => {
    navigate('/chatbot');
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
      try {
        const userData = await createUserWithEmailAndPassword(auth, email, password);
        console.log(userData, "authData");
        navigate('/chatbot');
      } catch (signupError) {
        console.error('Error creating user:', signupError);
      }
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
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
      <div className="policies">
        <p>Terms of Use | Privacy Policy</p>
      </div>
      
      {/* Google and Microsoft buttons */}
      <div className="buttons">
        <div className="googlebutton">
          <GoogleOAuthProvider clientId="703349034098-p46flheubh9hrs5d8f3le5baukqtf9al.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleLoginForm} // You can replace handleLoginForm with the appropriate handler for Google login success
              onError={() => console.log('Google login failed')} // Handle Google login error
            />
          </GoogleOAuthProvider>
        </div>
        <div className="microsoftbutton">
          <MicrosoftLogin
            clientId='5adbb0be-12db-4c0e-bdc9-b56db79da36f'
            authCallback={() => console.log('Microsoft auth callback')} 
            redirectUri={navigate('./chatbot')} 
          />
        </div>
      </div>
    </>
  );
}
