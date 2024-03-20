import React from 'react'
import logo1 from '../../assets/logo2.png';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import apple from '../../assets/apple.png';
import microsoft from '../../assets/microsoft.png';
import google from '../../assets/google1.png';
import {jwtDecode} from "jwt-decode";
import MicrosoftLogin from "react-microsoft-login";
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const authHandler = (err, data) => {
    console.log(err, data);
  };
      const navigate =useNavigate()
      return (
        <>
          <div className="top-logo">
            <img src={logo1} alt="Logo" />
          </div>
          <div className="middle-essentials">
            <h1>Create your account</h1>
            <div className="user-input-wrp">
              <input type="email" className="inputText" placeholder="Email address" />
              <span className="floating-input">Email address</span>
            </div>
            <button type="button">Continue</button>
            <p>Don't have any account? <a href="#"onClick={()=>navigate("/login")}>Login</a></p>
            <h2><span>OR</span></h2>
          </div>
          <div className="buttons">
          <div className="googlebutton">
        <GoogleOAuthProvider clientId="703349034098-p46flheubh9hrs5d8f3le5baukqtf9al.apps.googleusercontent.com">
          <GoogleLogin
          
            onSuccess={credentialResponse => {
              const decoded = jwtDecode(credentialResponse.credential);
              console.log(decoded);
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
          redirectUri="http://localhost:3001/Chatgpt5-Application-using-ReactJS"
        />
        </div>
      </div>
      </>
      )
    }
  
