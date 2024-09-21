import React from 'react';
import './LogoutModal.css';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store'; 
import { signOut } from 'firebase/auth';
import auth from '../login/firebaseconfig';
import Cookies from 'js-cookie';

export default function LogoutModal({ isOpen, onClose,  onLogout }) {
  const { userInfo, setUserInfo } = useAppStore(); 
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserInfo(null);
      Cookies.remove('idToken');
      Cookies.remove('email');
      Cookies.remove('displayName');
      Cookies.remove('photoURL');
      Cookies.remove('chatHistory'); 
      onLogout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <svg onClick={onClose} className="w-6 h-6 text-gray-800 modal-close-btn" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L17.94 6M18 18L6.06 6" />
        </svg>

        <div className="modal-body">
          <h1 className='emailinfo'>{userInfo?.email}</h1>
          <img src={userInfo?.photoURL} alt="Profile" />
          <h1 className='name'>{`Hi, ${userInfo?.displayName}!`}</h1>
          <hr style={{ marginTop: '25px', width: '220px', marginLeft: '35px' }} />
          <button onClick={handleLogout} className='signoutbtn'>Sign out with this account</button>
        </div>
      </div>
    </div>
  );
}
