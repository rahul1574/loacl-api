import React,{useState,useEffect,useRef} from 'react'
import Foter from './Foter';

function Homepage() {

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
   <div id='homepage'style={{height:'700px',display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
     <div style={{height:'400px',width:'400px'}}>
        <h1 ref={textRef} style={{fontSize:'40px',color:'white',opacity:text?1:0,transition: 'opacity 2s ease-in'}}>Explore What's Fresh Today, <strong style={{color:'#3f7d20'}}>Fruits</strong > & <strong style={{color:'#3f7d20'}}>Vegetables</strong> from Local Markets Near You!</h1>
     </div>
   </div>
   <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center',flexWrap:'wrap'}}>
        <div style={{width:'500px',margin:'25px',fontSize:'25px',display:'flex',flexWrap:'wrap'}}>"Welcome to [Website Name], your trusted guide to discovering the freshest vegetables and fruits available at local markets near you. Whether you're looking for seasonal produce, pricing, or availability, we provide up-to-date information to help you make informed choices. Explore various markets in your area, find out what’s in season, and enjoy the best of nature’s bounty."</div>
        <div id='image1'style={{height:'300px',margin:'25px'}}>
        <img 
            src='homepage.jpeg'
            alt='signup*'
            style={{width:'300px',height:'300px',objectFit:'contain'}} 
            />
        </div>
   </div>
   <Foter/>
   </>
  )
}

export default Homepage