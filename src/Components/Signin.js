import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Signin() {
  const [message, setMessage] = useState('');
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      // Send login credentials
      const response = await axios.post('http://localhost:80/api/user/login', inputs);
      
      if (response.data.status === 1) {
        // Store the user data received after successful login
        const userDetails = response.data.user;
        localStorage.setItem('user', JSON.stringify(userDetails));
        navigate('/logincost');
      } else {
        setMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setMessage('Login failed. Please try again.');
      console.error(error);
    }
  };
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Function to toggle the password visibility
  const togglePasswordVisibility = () => {
  setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <>
      <div id='dashboard' style={{background: 'white', height: '750px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-around' }}>
        <form onSubmit={handleLogin}>
          <h1>Vendor Sign In</h1>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              type="email"
              name="emails"
              placeholder="Enter Email"
              onChange={handleChange}
              style={{ margin: '10px', height: '30px' }}
            />
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              name="passwords"
              placeholder="Enter Password"
              onChange={handleChange}
              style={{ margin: '10px', height: '30px' }}
            />
            <div onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />   
            </div>
          </div>
          <div style={{ paddingRight: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
            <button type="submit" style={{ height: '30px', width: '150px', margin: '10px' }} >Signin
            </button>
            <Link to="/passwordrecovercost" style={{ margin: '10px' }}>Forgot Password?</Link>
            <p>{message && <span>{message}</span>}</p>
            <Link to="/signup">
              <button style={{ height: '30px', width: '150px', margin: '10px' }}>Signup</button>
            </Link>
          </div>
          <Link to='/' style={{textDecoration:'none',margin:'20px',fontSize:'20px'}}><i class="fa-solid fa-house"></i></Link>
        </form>
        <div style={{ height: '400px', width: '300px', margin: '10px' }}>
          <img src="loginiamge.jpeg" alt="signup*" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      </div>
    </>
  );
}

export default Signin;
