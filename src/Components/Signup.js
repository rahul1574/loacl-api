import { useState,useEffect,useRef } from 'react';
import { useNavigate,Link} from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


function Signup() {
    const [visible, setVisible] = useState('second');
    const [message, setMessage] = useState('');
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(prevValues => ({ ...prevValues, [name]: value }));
    };

    const validateInputs = () => {
        if (!inputs.firstnames || !inputs.lastnames || !inputs.emails || !inputs.passwords) {
            setMessage('All fields are required.');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(inputs.emails)) {
            setMessage('Please enter a valid email address.');
            return false;
        }
        if (inputs.passwords.length < 6) {
            setMessage('Password must be at least 6 characters long.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateInputs()) return;

        try {
            const response = await axios.post('http://localhost:80/api/user/register', inputs);
            setMessage(response.data.message);
            // console.log(response.data.status);
            if (response.data.status === 1) {
                navigate('/signin'); 
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
                // navigate('/logincost', { state: { user: userDetails } });
                localStorage.setItem('user', JSON.stringify(userDetails));
                navigate('/logincost');
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
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Function to toggle the password visibility
    const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    }

    return (
        <>
        <div id='dashboard'style={{background:'white',height:'750px',display:'flex',flexDirection:'column',justifyContent:'space-around',flexWrap:'wrap'}}>
            <div style={{ display: visible === 'second' ? 'flex' : 'none' ,flexDirection:'row',flexWrap:'wrap',alignItems:'center',justifyContent:'space-around'}}>
                <form ref={textRef} onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',flexWrap:'wrap',alignItems:'center',margin:'30px',paddingLeft:'40px',opacity:text?1:0,transition: 'opacity 2s ease-in'}}>
                    {/* <label>First name:</label> */}
                    <h1 ref={textRef} style={{opacity:text?1:0,transition: 'opacity 0s ease-in'}}>Vendor Register</h1>
                    <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',alignItems:'center'}}>
                        <input type='text' name='firstnames' placeholder='Enter Your Name' onChange={handleChange} style={{margin:'10px',height:'30px'}} />
                        <br />
                        {/* <label>Last name:</label> */}
                        <input type='text' name='lastnames' placeholder='Enter User Name' onChange={handleChange} style={{margin:'10px',height:'30px'}}/>
                    <br />
                    </div>
                    <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',alignItems:'center'}}>
                    {/* <label>Email:</label> */}
                        <input type="email" name='emails' placeholder='Email Address' onChange={handleChange} style={{margin:'10px',height:'30px'}}/>
                        <br />
                        {/* <label>Password:</label> */}
                        <input type={isPasswordVisible ? 'text' : 'password'}  name='passwords' placeholder='Create Password' onChange={handleChange} style={{margin:'10px',width:'150px',height:'30px'}} />
                        <br />
                        <div onClick={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />   
                        </div>
                    </div>
                    <div style={{paddingRight:'50px'}}>
                        <button type='submit' style={{height:'30px',width:'150px'}}>SignUp</button>
                        <p style={{color:'red'}}>{message && <span>{message}</span>}</p>
                        <p style={{color:'blue'}}>Already have a account?</p>
                        <button onClick={() => setVisible('first')} style={{height:'30px',width:'150px'}}>Signin</button>
                    </div>
                    <Link to='/' style={{textDecoration:'none',margin:'20px',fontSize:'20px',paddingRight:'50px'}}><i class="fa-solid fa-house"></i></Link>
                </form>
                <div  ref={textRef}  style={{height:'400px',width:'300px',margin:'10px',opacity:text?1:0,transition: 'opacity 7s ease-in'}}>
                <img 
                src='sigupimage.jpeg'
                alt='signup*'
                style={{width:'100%',height:'100%',objectFit:'contain'}} 
                />
                
                </div>
            </div>

            <div style={{ display: visible === 'first' ? 'flex' : 'none' ,flexDirection:'row',flexWrap:'wrap',alignItems:'center',justifyContent:'space-around'}}>
                <form onSubmit={handleLogin} style={{display:'flex',flexDirection:'column',flexWrap:'wrap',alignItems:'center',margin:'30px',paddingLeft:'40px'}}>
                    <h1 >VendorSign In</h1>
                    {/* <label>Email:</label> */}
                    <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',alignItems:'center'}}>
                        <input type="email" name='emails' placeholder='Enter Email' onChange={handleChange} style={{margin:'10px',height:'30px'}} />
                        <br />
                        {/* <label>Password:</label> */}
                        <input type={isPasswordVisible ? 'text' : 'password'}  name='passwords' placeholder=' Enter Password' onChange={handleChange}style={{margin:'10px',height:'30px'}} />
                        <br />
                        <div onClick={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />   
                        </div>
                    </div>
                    <div style={{paddingRight:'50px',display:'flex',flexDirection:'column',justifyContent:'space-evenly'}}>
                        <button type='submit'  style={{height:'30px',width:'150px',margin:'10px'}}>Signin</button>
                        <Link to='/passwordrecovercost'style={{margin:'10px'}}>Forgot Password?</Link>
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
    );
}

export default Signup;