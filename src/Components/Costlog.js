import React, { useState,useEffect } from 'react'
// import { Link } from 'react-router-dom';
import Open from './Open';
import Userlist from './Userlist';
import Usercreate from './Usercreate';
import Welcomeuser from './Welcomeuser';
import Usercost from './Usercost';

function Costlog() {
    const [name,setname]=useState('home')
    const [isvisible,setVisible]=useState(false)
    const [welcome,setwelcome]=useState(true)
    const handlechange=(component)=>{
        setUser(null)
        setVisible(component);
        setwelcome(false)
        if(component==='A'){
          setname("Get Product")
        }if(component==='B'){
          setname("My Products")
        }
        if(component==='C'){
          setname("Add Product")
        }if(component==='D'){
          setname("Home")
        }if(component==='E'){
          setname("My Profile")
        }
    }
    const currentHour = new Date().getHours();
  let greetingMessage = '';

  if (currentHour < 12) {
    greetingMessage = 'Good Morning';
  } else if (currentHour < 18) {
    greetingMessage = 'Good Afternoon';
  } else {
    greetingMessage = 'Good Evening';
  }

  const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);


  return (
    <>
    <div  id='dashboard'style={{background:'white',display:'flex',flexDirection:'column',flexWrap:'wrap',justifyContent:'space-between'}}>
      <div style={{backgroundColor:'wheat',height:'50px',width:'100%',position:'fixed',top:'0px',display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
      <div style={{height:'50px'}}>
        <img src='favicon.png' alt='logo' style={{width:'100%',height:'100%',objectFit:'contain'}}></img>
      </div>
      <h1>{name}</h1>
      </div>
      <div style={{paddingTop:'100px',margin:'5px'}}>
        {user ? (
          <>
          <h2>{greetingMessage},{user.firstnames}!</h2>
          {welcome && <Welcomeuser/>}
          </>
          ) : (
          <p>Any Update</p>
            )}
          <div >
          {isvisible==='A' && <Open/>}
          {isvisible==='B' && <Userlist/>}
          {isvisible==='C' && <Usercreate/>}
          {isvisible==='D' && <Welcomeuser/>}
          {isvisible==='E' && <Usercost/>}
         </div>  
        </div>
      {/* <div>wellcome Vendor!</div> */}
    </div>
    <div style={{backgroundColor:'black',width:'100%',height:'60px',position:'fixed',top:'700px',display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
      <button onClick={()=>handlechange('D')} style={{height:'50px',width:'50px'}}><i class="fa-solid fa-house" ></i></button>
      <button onClick={()=>handlechange('A')} style={{height:'50px',width:'50px'}}><i class="fa-solid fa-magnifying-glass"></i></button>
      <button onClick={()=>handlechange('B')} style={{height:'50px',width:'50px'}}><i class="fa-solid fa-bookmark"></i></button>
      <button onClick={()=>handlechange('C')} style={{height:'50px',width:'50px'}}><i class="fa-solid fa-folder-plus"></i></button>
      <button onClick={()=>handlechange('E')} style={{height:'50px',width:'50px'}}><i class="fa-solid fa-user"></i></button>
    </div>
    </>
  )
}

export default Costlog