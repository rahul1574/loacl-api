import React, {useEffect,useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';

function Usercost() {


    const [user, setUser] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        // Clear localStorage
        localStorage.removeItem('user');
        // Redirect to login page
        navigate('/signin');
    };
  return (
    <>
    <div style={{display:'flex',flexDirection:'column',justifyContent:'space-evenly',margin:'5px',alignItems:'center'}}>
        <i class="fa-solid fa-circle-user" style={{fontSize:'100px'}}></i>
        {user ? (
            <>
            <h2>{user.lastnames}!</h2>
            <p>{user.emails}</p>
            </>
            ) : (
            <p>No user information available.</p>
        )}
        <div style={{height:'350px'}}></div>
        {/* <div style={{display:'flex',flexDirection:'row',justifyContent:'center',height:'50px',border:'2px solid black',margin:'5px',width:'100%',textAlign:'center',alignContent:'center'}}>
           <div style={{padding:'5px'}}>
                <i class="fa-solid fa-gear"></i><p >Settings</p>
           </div>
        </div> */}
        
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',height:'50px',border:'2px solid black',margin:'5px',width:'100%',textAlign:'center',alignContent:'center'}}>
            <div style={{padding:'5px'}}>
            <p><Link to='/' onClick={handleLogout} style={{textDecoration:'none'}}><i class="fa-solid fa-right-from-bracket"></i>Logout</Link></p>
           </div>
        </div>
    </div>
    </>
  )
}

export default Usercost