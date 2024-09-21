  import React, { useState, useEffect } from 'react';
  import { Link, useNavigate } from 'react-router-dom';
  import logo from '../../assets/logo.svg';
  import axios from 'axios';
  import Preloader from '../../Components/preloaders/dog';
  import auth from './firebaseconfig';
  import GoogleButton from 'react-google-button';
  import './login.css';
  import Cookies from 'js-cookie';
  import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
  import { useAppStore } from '../../store'; 

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  });

  const provider = new GoogleAuthProvider();

  export default function Login() {
    const navigate = useNavigate();
    const { setUserInfo } = useAppStore(); 
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

    const handleFormSubmit = async (e) => {
      e.preventDefault();
      
      try {
        const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
        const idToken = await userCredential.user.getIdToken();
        Cookies.set('idToken', idToken, { expires: 1 });
        const response = await axiosInstance.post('/api/login', { idToken });
        console.log("API called successfully");

        if (response.status === 200) {
          setUserInfo(userCredential.user); 
          console.log(userCredential.user)
          navigate('/Chatbot');
        }
      } catch (error) {
    

        switch (error.code) {
          case 'auth/user-not-found':
            setLoginError('No account found with this email. Please check your email or sign up.');
            break;
          case 'auth/invalid-credential':
            setLoginError('Invalid credentials. Please check your email and password.');
            break;
          default:
            setLoginError('Login failed. Please try again.');
            break;
        }
      }
    };

    const handleGoogleSignIn = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const idToken = await result.user.getIdToken();
        
        const user = result.user;
        const  userProfile = {
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
        };
        
    
        Cookies.set('idToken', idToken, { expires: 7 });  
        Cookies.set('email', user.email, { expires: 7 });
        Cookies.set('displayName', user.displayName, { expires: 7 });
        Cookies.set('photoURL', user.photoURL, { expires: 7 });
        const response = await axiosInstance.post('/api/google-auth', { idToken });
    
        if (response.status === 200) {
          setUserInfo({ ...userProfile, idToken }); 
          navigate('/chatbot');
        }
      } catch (error) {
        console.error('Google Sign-In Error:', error);
      }
    };
    
    

    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
      return <Preloader />;
    }

    return (
      <>
        <div  className="middle-essentials">
          <div className='leftarrow'>
            <svg onClick={() => { navigate('/') }}  aria-hidden="true" xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24">
              <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
            </svg>
          </div>
          <div className="applogo">
            <img src={logo} alt="logo" />
          </div>

          <form className="container" onSubmit={handleFormSubmit}>
            <div className="input-container">
              <div className="input-content">
                <div className="input-dist">
                  <h1 className='loginh1'>Login</h1>

                  <div className="input-type">
                    <input
                      type="email"
                      name="email"
                      className="input-is"
                      placeholder="Email"
                      value={user.email}
                      onChange={handleInputs}
                      required
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="input-is"
                      placeholder="Password"
                      value={user.password}
                      onChange={handleInputs}
                      required
                    />
                  </div>
                  <button type="submit" className="submit-button">Log in</button>
                  <div className='googlebutton'>
                    <GoogleButton
                      type="light"
                      onClick={handleGoogleSignIn}
                    />
                  </div>
                </div>
              </div>
            </div>

          

            <p className='tosignin'>
            {loginError && <p className="error-message">{loginError}</p>}
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </div>
      </>
    );
  }
