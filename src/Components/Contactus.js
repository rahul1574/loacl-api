import React, { useRef,useState} from 'react';
import emailjs from '@emailjs/browser';
import {Link} from 'react-router-dom';
import Foter from './Foter';


function Contactus() {
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
          .sendForm('service_m0g157b', 'template_7sfjce3', form.current, {
            publicKey: 'OvCLRYSeO6XzFSpH3',
          })
          .then(
            () => {
              console.log('SUCCESS!');
            },
            (error) => {
              console.log('FAILED...', error.text);
            },
          );
      };
        const [inputusername,setusername]=useState('')
        const [inputemail,setinputmail]=useState('')
        const [inputpassword,setpassword]=useState('')
        const checkvalue=()=>{
          if(inputusername.trim()==='' || inputpassword==='' || inputemail===''){
            alert('enter vaild input')
          }else{
            document.getElementById('form').style.display='none'
            document.getElementById('append2').style.display='flex'
            document.getElementById('change').innerHTML="Thank You!"
          }
        }
  return (
    <>
    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',flexWrap:'wrap',alignItems:'center'}}>
      <div style={{margin:'10px',alignItems:'start'}}>
        <h1  id="change" style={{color:'yellow',fontSize:'50px'}}>Drop me a Message Here!</h1>
      </div>
      <div style={{display:'flex',flexDirection:'column',justifyContent:'space-evenly',flexWrap:'wrap'}}>
        <form ref={form}id='form' onSubmit={sendEmail} style={{ height:'600px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-evenly',color:'white'}}>
          <input type="text" name="user_name" value={inputusername}placeholder="Your Name" onChange={(e)=> setusername(e.target.value)} style={{height:'30px', background:'none',textAlign:'center',color:'white'}} />
          <input type="email" name="user_mail"value={inputemail} placeholder="Your Email" onChange={(e)=> setinputmail(e.target.value)} style={{height:'30px', background:'none',textAlign:'center',color:'white'}}/>
          <textarea name="message" id='text' value={inputpassword} placeholder="Your Message" onChange={(e)=> setpassword(e.target.value)} style={{height:'30px', background:'none',textAlign:'center',color:'white'}}/>
          <button type='submit' onClick={checkvalue} style={{height:'40px',width:'200px',backgroundColor:'transparent',color:'white',borderColor: 'white',borderStyle:'solid'}} >Send Message</button>
        </form>
        <div id='append2' style={{height:'700px',display:'none',flexDirection:'column',justifyContent:'flex-start',alignContent:'center',alignItems:'center',textAlign:'center'}}>
          <Link to='/intro'><button id='begin'style={{height:'30px',width:'150px',margin:'10px',borderColor: 'white',borderStyle:'solid',fontSize:'20px'}}>Back</button></Link>
        </div>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
          <a href='https://www.instagram.com/urstrulyrahul_09' target='_main'><i class="fa-brands fa-instagram" style={{color:'white',fontSize:'30px'}}></i></a>
          <a href='https://www.linkedin.com/in/rahul-mudavath-848978301/' target='_main'><i class="fa-brands fa-linkedin"style={{color:'white',fontSize:'30px'}}></i></a>
        </div>
      </div>
    </div>
    <Foter/>
    </>
  )
}

export default Contactus