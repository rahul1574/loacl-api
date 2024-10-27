import React from 'react'

function Foter() {
  return (
    <>
    <div style={{background:'#161a1d',display:'flex',flexDirection:'row',justifyContent:'space-evenly',flexWrap:'wrap'}}>
      <div style={{width:'300px',margin:'20px', color:'white',display:'flex',flexDirection:'column',justifyContent:'space-evenly'}}>
        <strong>Contact Info</strong>
        <div>
        <i class="fa-solid fa-location-dot"></i>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur vitae quas adipisci sunt velit eaque, provident maiores neque obcaecati quidem vel in possimus, tempore minus voluptatibus! Dignissimos dolore ratione ducimus.</p>
        <div>
        <i class="fa-solid fa-envelope"></i><span>rahulmudavath333@gmail.com</span>
        </div>
        <a href='https://www.instagram.com/urstrulyrahul_09/' target='_main'><i class="fa-brands fa-instagram"></i></a>
      </div>
      <div style={{width:'300px',margin:'20px',color:'white'}}>
        <strong>Produts</strong>
        <p>Vegetables</p>
        <p>Fruits</p>
      </div>
      <div style={{width:'300px',color:'white',margin:'20px'}}>
        <strong>About Us</strong>
        <p>At [Website Name], we are passionate about connecting people with the freshest fruits and vegetables available at local markets. Our mission is to provide easy access to detailed information about produce at specific locations, helping consumers make informed decisions about what to buy and where to find it.</p>
      </div>
    </div>
    <div style={{height:'50px',background:'#001011',display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
      <div style={{height:'45px'}}>
        <img src='favicon.png' alt='logo' style={{width:'100%',height:'100%',objectFit:'contain'}}></img>
      </div>
    </div>
    </>
  )
}

export default Foter