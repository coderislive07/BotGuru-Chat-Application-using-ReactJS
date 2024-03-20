import React, { useState } from 'react'
import logo1 from '../../assets/logo2.png';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import MicrosoftLogin from "react-microsoft-login";
import './login.css';

export default function Login() {
  const authHandler = (err, data) => {
    console.log(err, data);
  };
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({...user, [name]: value});
   
  }

  return (
    <>
      <div className="top-logo">
        <img src={logo1} alt="Logo" />
      </div>
      <div className="middle-essentials">
        <h1>Welcome back</h1>
        <div className="user-input-wrp">
          <input type="email" name="email" className="inputText" placeholder="Email address" value={user.email} onChange={handleInputs} />
          <input type="password" name="password" className="inputPassword" placeholder="Password" value={user.password} onChange={handleInputs} />
          <span className="floating-input">Email address</span>
        </div>
        <button type="button">Continue</button>
        <p>Don't have any account? <a href="#" onClick={() => navigate("/signup")}>Sign up</a></p>
        <h2><span>OR</span></h2>
      </div>
      <div className="buttons">
        <div className="googlebutton">
        <GoogleOAuthProvider clientId="703349034098-p46flheubh9hrs5d8f3le5baukqtf9al.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={credentialResponse => {
              const decoded = jwtDecode(credentialResponse.credential);
              console.log(decoded);
              window.location.href="https://coderislive07.github.io/Chatgpt5-Application-using-ReactJS/"
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </GoogleOAuthProvider>
        </div>
        <div className="microsoftbutton">
        <MicrosoftLogin
          clientId="5adbb0be-12db-4c0e-bdc9-b56db79da36f"
          authCallback={authHandler}
          redirectUri="https://coderislive07.github.io/Chatgpt5-Application-using-ReactJS/"
        />
        </div>
      </div>
      <div className="policies">
      <p>Terms of Use | Privacy Policy</p>
      </div>
    </>
  );
}
