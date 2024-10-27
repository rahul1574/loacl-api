import { useState,useEffect,useRef } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


function Signupuplog() {
    const [visible, setVisible] = useState('second');
    // const [isvisible, setisVisible] = useState('two');
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

    const validateInputs = () => {
        if (!inputs.firstname || !inputs.lastname || !inputs.email || !inputs.password) {
            setMessage('All fields are required.');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(inputs.email)) {
            setMessage('Please enter a valid email address.');
            return false;
        }
        if (inputs.password.length < 6) {
            setMessage('Password must be at least 6 characters long.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateInputs()) return;

        try {
            const response = await axios.post('http://localhost:80/api/user/register1', inputs);
            setMessage(response.data.message);
            // console.log(response.data);
            if (response.data.status === 1) {
                const userDetails = response.data.user;
                localStorage.setItem('user', JSON.stringify(userDetails));
                navigate('/signinlog'); // Redirect to login on success
            }
        } catch (error) {
            setMessage('There was an error during registration.');
            console.error(error);
        }
    };
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:80/api/user/login', inputs);
            setMessage(response.data.message);
            if (response.data.status === 1) {
                const userDetails = response.data.user;
                localStorage.setItem('user', JSON.stringify(userDetails));
                navigate('/loginlog'); // Redirect to dashboard on successful login
            }
        } catch (error) {
            setMessage('Login failed. Please try again.');
            console.error(error);
        }
    };

    const [text, settext] = useState(false);
    const textRef = useRef(null);
  
    useEffect(() => {
      const currentElement = textRef.current; 
    
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
                settext(true);
              observer.disconnect(); 
            }
          });
        },
        { threshold: 0.1 }
      );
    
      if (currentElement) {
        observer.observe(currentElement);
      }
    
      return () => {
        if (currentElement) {
          observer.unobserve(currentElement);
        }
      };
    }, []);
  return (
    <>
    <div  id='dashboard'style={{background:'white',height:'750px',display:'flex',flexDirection:'column',justifyContent:'space-around',flexWrap:'wrap'}}>
        <div style={{ display: visible === 'second' ? 'flex' : 'none', flexDirection:'row',flexWrap:'wrap',alignItems:'center',justifyContent:'space-around'}}>
            <form ref={textRef} onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',flexWrap:'wrap',alignItems:'center',margin:'30px',paddingLeft:'40px',opacity:text?1:0,transition: 'opacity 2s ease-in'}}>
                {/* <label>First name:</label> */}
                <h1 ref={textRef} style={{opacity:text?1:0,transition: 'opacity 0s ease-in'}}>Customer Register</h1>
                <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',alignItems:'center'}}>
                    <input type='text' name='firstname' placeholder='First name' onChange={handleChange}  style={{margin:'10px',height:'30px'}} />
                    <br />
                    {/* <label>Last name:</label> */}
                    <input type='text' name='lastname' placeholder='Enter User Name' onChange={handleChange}  style={{margin:'10px',height:'30px'}} />
                <br />
                </div>
                <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',alignItems:'center'}}>
                {/* <label>Email:</label> */}
                    <input type="email" name='email' placeholder='Email' onChange={handleChange} style={{margin:'10px',height:'30px'}}/>
                    <br />
                    {/* <label>Password:</label> */}
                    <input type={isPasswordVisible ? 'text' : 'password'}  name='password' placeholder='Password' onChange={handleChange} style={{margin:'10px',height:'30px'}} />
                    <div onClick={togglePasswordVisibility}>
                        <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />   
                    </div>
                <br />
                </div>
                <div style={{paddingRight:'50px'}}>
                    <button type='submit'style={{height:'30px',width:'150px'}}>Signup</button>
                    <p style={{color:'red'}}>{message && <span>{message}</span>}</p>
                    <p style={{color:'blue'}}>Already have a account?</p>
                    <button onClick={() => setVisible('first')} style={{height:'30px',width:'150px'}} >Signin</button>
                </div>
                <Link to='/' style={{textDecoration:'none',margin:'20px',fontSize:'20px',paddingRight:'50px'}}><i class="fa-solid fa-house"></i></Link>
            </form>
            <div  ref={textRef}  style={{height:'400px',width:'300px',      margin:'10px',opacity:text?1:0,transition: 'opacity 7s ease-in'}}>
            <img 
            src='sigupimage.jpeg'
            alt='signup*'
            style={{width:'100%',height:'100%',objectFit:'contain'}} 
            />
            </div>
        </div>

        <div style={{ display: visible === 'first' ? 'flex' : 'none' ,flexDirection:'row',flexWrap:'wrap',alignItems:'center',justifyContent:'space-around'}}>
            <form onSubmit={handleLogin} style={{display:'flex',flexDirection:'column',flexWrap:'wrap',alignItems:'center',margin:'30px',paddingLeft:'40px'}}>
            <h1>Customer Sign In</h1>
                {/* <label>Email:</label> */}
                <div  style={{display:'flex',flexDirection:'row',flexWrap:'wrap',alignItems:'center'}}>
                    <input type="email" name='email' placeholder='Email' onChange={handleChange} style={{margin:'10px',height:'30px'}} />
                    <br />
                    {/* <label>Password:</label> */}
                    <input type={isPasswordVisible ? 'text' : 'password'}  name='password' placeholder='Password' onChange={handleChange} style={{margin:'10px',height:'30px'}}/>
                    <br />
                    <div onClick={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />   
                    </div>
                </div>
                <div style={{paddingRight:'50px',display:'flex',flexDirection:'column',justifyContent:'space-evenly'}}>
                    <button type='submit'  style={{height:'30px',width:'150px',margin:'10px'}}>Signin</button>
                    <Link to="/passwordrecoverlog" style={{margin:'10px'}}>Forgot Password</Link>
                    <p>{message && <span>{message}</span>}</p>
                    <button onClick={() => setVisible('second')}  style={{height:'30px',width:'150px',margin:'10px'}}>Signup</button>

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
    </div>
   </>
  )
}

export default Signupuplog