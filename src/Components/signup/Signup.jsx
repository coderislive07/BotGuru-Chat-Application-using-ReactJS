import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo1 from '../../assets/logo2.png';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
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
    navigate('/login');
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
    </>
  );
}
