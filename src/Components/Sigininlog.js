import React from 'react'
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


function Sigininlog() {
    const [message, setMessage] = useState('');
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Function to toggle the password visibility
    const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    }
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(prevValues => ({ ...prevValues, [name]: value }));
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:80/api/user/login', inputs);
            setMessage(response.data.message);
            if (response.data.status === 1) {
                const userDetails = response.data.user;
                // navigate('/loginlog', { state: { user: userDetails } }); // Redirect to dashboard on successful login
                localStorage.setItem('user', JSON.stringify(userDetails));
                navigate('/loginlog');
            }
        } catch (error) {
            setMessage('Login failed. Please try again.');
            console.error(error);
        }
    };
  return (
    <>
    <div id='dashboard'style={{background:'white',height:'750px',display:'flex',flexDirection:'row',flexWrap:'wrap',alignItems:'center',justifyContent:'space-around'}} >
        <form onSubmit={handleLogin}>
            {/* <label>Email:</label> */}
            <h1> log Sign In </h1>
            <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',alignItems:'center'}}>
                <input type="email" name='email' placeholder='Email' onChange={handleChange} style={{margin:'10px',height:'30px'}} />
                <br />
                {/* <label>Password:</label> */}
                <input type={isPasswordVisible ? 'text' : 'password'}  name='password'  placeholder='Password' onChange={handleChange} style={{margin:'10px',height:'30px'}}/>
                <br />
                <div onClick={togglePasswordVisibility}>
                    <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />   
                </div>
            </div>
            <div  style={{paddingRight:'50px',display:'flex',flexDirection:'column',justifyContent:'space-evenly'}}>
                <button type='submit' style={{height:'30px',width:'150px',margin:'10px'}}>Signin</button>
                <Link to="/passwordrecoverlog"style={{margin:'10px'}} >Forgot Password</Link>
                <p>{message && <span>{message}</span>}</p>
                <Link to='/signuplog'><button style={{height:'30px',width:'150px',margin:'10px'}}>Signup</button></Link>
            </div>
           <Link to='/' style={{textDecoration:'none',margin:'20px',fontSize:'20px',paddingRight:'50px'}}><i class="fa-solid fa-house"></i></Link>
        </form>
        <div style={{height:'400px',width:'300px',margin:'10px'}}>
            <img 
            src='loginiamge.jpeg'
            alt='signup*'
            style={{width:'100%',height:'100%',objectFit:'contain'}} 
            />
        </div>
    </div>
</>
  )
}

export default Sigininlog