import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg'; // Use the same logo as the login page
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import auth from '../login/firebaseconfig'; 
import './signup.css'; // Use the same CSS as the login page

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

  const handleFormSubmit = async (e) => {
    e.preventDefault(); 

    try {
      await createUserWithEmailAndPassword(auth, user.email, user.password);
      navigate('/login');
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          setSignupError('Invalid email address format.');
          break;
        case 'auth/email-already-in-use':
          setSignupError('An account already exists with this email.');
          break;
        case 'auth/weak-password':
          setSignupError('Password should be at least 6 characters.');
          break;
        default:
          setSignupError('Signup failed. Please try again.');
          break;
      }
    }
  };

  return (
    <>
      <div style={{ backgroundColor: '#212121' }} className="middle-essentials1">
        <div className='leftarrow'>
          <svg onClick={() => { navigate('/') }} className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24">
            <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
          </svg>
        </div>
        <div className="applogo">
          <img src={logo} alt="logo" />
        </div>

        <form className="container1" onSubmit={handleFormSubmit}>
          <div className="input-container1">
            <div className="input-content1">
              <div className="input-dist1">
                <h1 className='loginh1'>Create an account</h1>

                <div className="input-type1">
                  <input
                    type="email"
                    name="email"
                    className="input-is1"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleInputs}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    className="input-is1"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleInputs}
                    required
                  />
                </div>
                <button type="submit" className="submit-button1">Sign Up</button>
              </div>
            </div>
          </div>

          {signupError && <p className="error-message1">{signupError}</p>}

          <p className='tosignin1'>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
}
