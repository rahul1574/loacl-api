import React, { useState } from 'react'
import { Link } from 'react-router-dom';


function Home() {
  const [line,setline]=useState('')
  const removeline=()=>{
    setline(null)
  }
  const makechange=(id)=>{
    setline(id);
    // document.getElementById('open').style.display='none'
  }
  return (
    <>
    <div style={{background:'yellow',display:'flex',flexDirection:'row',justifyContent:'space-around',flexWrap:'wrap',alignItems:'center',position:'sticky',top:'0px'}}>
      <div style={{height:'70px'}}>
        <img src='favicon.png' alt='logo' style={{width:'100%',height:'100%',objectFit:'contain'}}></img>
      </div>
      <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
        <p style={{margin:'10px'}} onClick={removeline}><Link to="signup"><button style={{height:'30px',width:'150px'}}>Vendor?</button></Link></p>
        <p style={{margin:'10px'}} onClick={removeline}><Link to="signuplog"><button style={{height:'30px',width:'150px'}}>Customer?</button></Link></p>
      </div>
    </div>
    <div id='content' style={{background:'blue',display:'flex',flexDirection:'row',justifyContent:'flex-end',height:'50px',alignItems:'center'}}>
      <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'350px'}}>
        <p id='one' onClick={()=>makechange(1)} style={{textDecoration:line===1?'underline':'none',textDecorationColor:line===1?'yellow':'none',textDecorationThickness:line===1?'3px':'none'}}><Link to='/homepage' style={{color:'white',textDecoration:'none'}}>HOME</Link></p>
        <p id='two' onClick={()=>makechange(2)} style={{textDecoration:line===2?'underline':'none',textDecorationColor:line===2?'yellow':'none',textDecorationThickness:line===2?'3px':'none'}}><Link to='/aboutus' style={{color:'white',textDecoration:'none'}}>ABOUT US</Link></p>
        <p id='three' onClick={()=>makechange(3)} style={{textDecoration:line===3?'underline':'none',textDecorationColor:line===3?'yellow':'none',textDecorationThickness:line===3?'3px':'none'}}><Link to='/services'style={{color:'white',textDecoration:'none'}}>SERVICES</Link></p>
        <p id='four' onClick={()=>makechange(4)} style={{textDecoration:line===4?'underline':'none',textDecorationColor:line===4?'yellow':'none',textDecorationThickness:line===4?'3px':'none'}}><Link to='/contactus' style={{color:'white',textDecoration:'none'}}>CONTACT US</Link></p>
      </div>
    </div>
    </>
  )
}

export default Home