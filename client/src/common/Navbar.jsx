import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BASE_URL } from '../Config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const logout = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#da8cff',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
    });

    if (result.isConfirmed) {
      try {
        await axios.post(`${BASE_URL}/logout`);
        localStorage.removeItem('token');
        navigate('/');
        closeDropdown();
      } catch (error) {
        console.error('Error logging out:', error);
      }
    }
  };

  const goToProfile = () => {
    navigate('/profile'); 
    closeDropdown();
  };

  const goToChangePassword = () => {
    navigate('/password'); 
    closeDropdown();
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data && response.data.body) {
          const { image, name } = response.data.body;
          setImage(`${BASE_URL}/${image}`);
          setName(name);
        }
      } catch (error) {
        console.error("Error fetching profile data", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 15px', backgroundColor: '#fff' }}>
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
        <Link className="navbar-brand brand-logo" to="/dashboard">
          <img src="assets/images/logo.svg" alt="logo" style={{ width: '100px', height: 'auto' }} />
        </Link>
        <Link className="navbar-brand brand-logo-mini" to="/dashboard">
          <img src="assets/images/logo-mini.svg" alt="logo" style={{ width: '50px', height: 'auto' }} />
        </Link>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-stretch" style={{ flexGrow: 1, justifyContent: 'flex-end' }}>
        <button
          className="navbar-toggler navbar-toggler align-self-center"
          type="button"
          onClick={toggleSidebar} 
          style={{ backgroundColor: 'transparent', border: 'none' }}
        >
          <FontAwesomeIcon icon={faBars} style={{ fontSize: '24px' }} />
        </button>
        <ul className="navbar-nav navbar-nav-right" style={{ display: 'flex', alignItems: 'center' }}>
          <li className="nav-item nav-profile dropdown" ref={dropdownRef}>
            <button
              className="nav-link"
              onClick={toggleDropdown}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }} 
            >
              <div className="nav-profile-text" style={{ cursor: 'pointer', marginRight: '10px' }}>
                <h3 className="mb-1 text-black" style={{ fontSize: '18px' }}>{name || "User Name"}</h3>
              </div>
              <div className="nav-profile-img">
                <img
                  src={image}
                  alt="Profile"
                  style={{ width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }} 
                />
                
              </div>
            </button>
            {dropdownOpen && (
              <div
                className="dropdown-menu"
                style={{
                  position: 'absolute',
                  top: '50px',  
                  right: '0', 
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  padding: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '150px', 
                  zIndex: 1000,
                }}
              >
                <button
                  className="dropdown-item"
                  onClick={goToProfile}
                  style={{
                    color: '#333',
                    textAlign: 'left',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    width: '100%',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 15px',
                  }}
                >
                  <FontAwesomeIcon icon={faUser} style={{ marginRight: '8px' }} />
                  Profile
                </button>
                <button
                  className="dropdown-item"
                  onClick={goToChangePassword}
                  style={{
                    color: '#333',
                    textAlign: 'left',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    width: '100%',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 15px', 
                  }}
                >
                  <FontAwesomeIcon icon={faLock} style={{ marginRight: '8px' }} />
                  Password
                </button>
                <button
                  className="dropdown-item text-danger"
                  onClick={logout}
                  style={{
                    color: '#d9534f',
                    textAlign: 'left',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    width: '100%',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 15px', 
                  }}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '8px' }} />
                  Logout
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
