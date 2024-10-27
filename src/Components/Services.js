import React,{useState,useEffect,useRef} from 'react'
import Foter from './Foter';
import {Link} from 'react-router-dom';

function Services() {
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
    <div id='services'style={{height:'700px',display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
      <div style={{height:'400px',width:'400px'}}>
         <h1 ref={textRef} style={{fontSize:'40px',color:'white',opacity:text?1:0,transition: 'opacity 2s ease-in'}}>Find the <strong style={{color:'#3f7d20'}}>Fruits</strong > & <strong style={{color:'#3f7d20'}}>Vegetables</strong> near you with ease, at the best prices.</h1>
      </div>Find the fruits and vegetables near you with ease, at the best prices.
      
    </div>
    <h1 style={{margin:'10px'}}><Link to='/homepage' style={{textDecoration:'none'}}>Home</Link> |Services</h1>
    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center',flexWrap:'wrap'}}>
         <div style={{width:'500px',margin:'25px',fontSize:'25px',display:'flex',flexWrap:'wrap'}}>At [App Name], we offer a user-friendly platform that provides real-time, location-based information about the freshest fruits and vegetables available at nearby local markets. Our services are designed to make your shopping experience easier by helping you find produce at the shortest distance, compare prices, and stay updated on market offerings. Whether you're searching for specific location or place, seasonal deals, or the closest markets, our app ensures you get access to fresh produce quickly and conveniently. Supporting local vendors has never been easier!</div>
         
         <div id='image1'style={{height:'500px',margin:'25px'}}>
         <img 
             src='services.jpeg'
             alt='signup*'
             style={{width:'300px',height:'5 00px',objectFit:'contain'}} 
             />
         </div>
    </div>
    <Foter/>
    </>
  )
}

export default Services