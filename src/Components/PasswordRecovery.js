import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


function PasswordRecovery() {
    // State to manage the steps
    const [step, setStep] = useState(1);
    // Input states
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    // Message state
    const [message, setMessage] = useState('');
  
    // Function to send OTP
    const sendOTP = async () => {
      try {
        const response = await axios.post('http://localhost:80/api/send-otp.php', { email });
        setMessage(response.data.message);
        console.log(response.data.status);
        if (response.data.status === 1) {
          setStep(2); // Move to OTP verification step
        }
      } catch (error) {
        setMessage('Error sending OTP');
      }
    };
  
    // Function to verify OTP
    const verifyOTP = async () => {
      try {
        const response = await axios.post('http://localhost:80/api/verify_otp.php', { email, otp });
        setMessage(response.data.message);
        if (response.data.status === 1) {
          setStep(3); // Move to password update step
        }
      } catch (error) {
        setMessage('Error verifying OTP');
      }
    };
  
    // Function to update the password
    const updatePassword = async () => {
      if (password !== confirmPassword) {
        setMessage('Passwords do not match!');
        return;
      }
  
      try {
        const response = await axios.post('http://localhost:80/api/update_password.php', { email, password });
        setMessage(response.data.message);
        if (response.data.status === 1) {
          setMessage('Password updated successfully!');
          setStep(4);
        }
      } catch (error) {
        setMessage('Error updating password');
      }
    };
  

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Function to toggle the password visibility
    const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    }

    return (
      <div id='dashboard' style={{background:'white',height:'750px',display:'flex',flexDirection:'row',flexWrap:'wrap',alignItems:'center',justifyContent:'space-around'}}>
        {step === 1 && (
          // Step 1: Send OTP
          <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',alignItems:'center',justifyContent:'space-evenly'}}>
            <div  style={{display:'flex',flexDirection:'column',    flexWrap:'wrap',alignItems:'center'}}>
              <h2>Password Recovery Customer</h2>
              <h3>Send OTP</h3>
              <input  style={{margin:'10px',height:'30px'}}
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              />
              <button onClick={sendOTP} style={{height:'30px',width:'150px',margin:'10px'}}>Send OTP</button>
              <p>{message}</p>
          </div>
          <div style={{height:'400px',width:'300px',margin:'10px'}}>
                <img 
                src='forgotpassword.jpeg'
                alt='signup*'
                style={{width:'100%',height:'100%',objectFit:'contain'}} 
                />
            </div>
          </div>
        )}
  
        {step === 2 && (
          // Step 2: Verify OTP
          <div tyle={{display:'flex',flexDirection:'row',flexWrap:'wrap',alignItems:'center',justifyContent:'space-evenly'}}>
            <div  style={{display:'flex',flexDirection:'column',flexWrap:'wrap',alignItems:'center'}}>
              <h3>Verify OTP</h3>
              <input style={{margin:'10px',height:'30px'}}
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              />
              <input style={{margin:'10px',height:'30px'}}
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              />
              <button onClick={verifyOTP} style={{height:'30px',width:'150px',margin:'10px'}}>Verify OTP</button>
              <p>{message}</p>
          </div>
          <div style={{height:'400px',width:'300px',margin:'10px'}}>
                <img 
                src='otpverify.jpeg'
                alt='signup*'
                style={{width:'100%',height:'100%',objectFit:'contain'}} 
                />
            </div>
          </div>
        )}
  
        {step === 3 && (
          // Step 3: Update Password
          <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',alignItems:'center'}}>
            <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',alignItems:'center'}} >
              <h3>Update Password</h3>
             <input  style={{margin:'10px',height:'30px'}}
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              />
              <input  style={{margin:'10px',height:'30px'}}
              type={isPasswordVisible ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              />
               <div onClick={togglePasswordVisibility}>
                  <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />   
                </div>
              <input
              type="password"  style={{margin:'10px',height:'30px'}}
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              />
              <button onClick={updatePassword}>Update Password</button>
              <p>{message}</p>
              <div style={{height:'400px',width:'300px',margin:'10px'}}>
                <img 
                src='changepassword.jpeg'
                alt='signup*'
                style={{width:'100%',height:'100%',objectFit:'contain'}} 
                />
              </div>
          </div>
          </div>
        )}

         {step === 4 && (
          <div style={{display:'flex',flexDirection:'column',flexWrap:'wrap',alignItems:'flex-start',justifyContent:'space-evenly'}}>
            <h1>{message}</h1>
            <Link to='/signinlog'><button style={{height:'30px',width:'150px',margin:'10px'}}>Back to login</button></Link>
          </div>
        )}
      </div>
    );
}

export default PasswordRecovery;