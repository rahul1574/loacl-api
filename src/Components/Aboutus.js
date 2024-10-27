import React,{useState,useEffect,useRef} from 'react'
import Foter from './Foter';
import {Link} from 'react-router-dom';

function Aboutus() {


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
    <div id='aboutus'style={{height:'700px',display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
      <div style={{height:'400px',width:'400px'}}>
         <h1 ref={textRef} style={{fontSize:'40px',color:'white',opacity:text?1:0,transition: 'opacity 2s ease-in'}}> Stay Informed, Eat Fresh: Discover the Best<strong style={{color:'#3f7d20'}}>Vegetables</strong > & <strong style={{color:'#3f7d20'}}>Fruits</strong> at Local Markets</h1>
      </div>

    </div>
    <h1 style={{margin:'10px'}}><Link to='/homepage' style={{textDecoration:'none'}}>Home</Link> |About Us</h1>
    <div style={{display:'flex',flexDirection:'column',justifyContent:'space-around',alignItems:'center',flexWrap:'wrap'}}>
        <div style={{margin:'25px',fontSize:'25px',display:'flex',flexWrap:'wrap'}}> We believe that fresh, healthy food should be accessible to everyone, and we aim to make that process easier by offering up-to-date details on availability, seasonality, and market-specific offerings. Whether you're a seasoned shopper or simply looking for the freshest ingredients, [Website Name] is here to help you find the best produce in your area.</div>

        <div style={{display:'flex',width:'100%',flexDirection:'row',alignItems:'center',flexWrap:'wrap',justifyContent:'space-around'}} >
            <div style={{height:'300px',width:'300px',display:'flex',flexDirection:'column',flexWrap:'wrap',justifyContent:'space-around'}}>
                <h1 style={{color:'#3f7d20'}}>MISSION</h1>
                <div>
                <h2>Our mission is to connect communities with fresh, local produce by providing accurate, up-to-date information on fruits and vegetables at nearby markets.</h2>
                </div>
            </div>
            <div id='image1'style={{height:'300px',margin:'25px'}}>
                <img 
                src='aboutus1.jpeg'
                alt='signup*'
                style={{width:'300px',height:'300px',objectFit:'contain'}} 
                />
        </div>
        
        </div>
        <div style={{display:'flex',width:'100%',flexDirection:'row',justifyContent:'space-around',alignItems:'center',flexWrap:'wrap',justifyContent:'space-around'}} >
            <div id='image1'style={{height:'300px',margin:'25px'}}>
                <img 
                src='aboutus2.jpeg'
                alt='signup*'
                style={{width:'300px',height:'300px',objectFit:'contain'}} 
                />
            </div>
            <div style={{height:'300px',width:'300px',display:'flex',flexDirection:'column',flexWrap:'wrap',justifyContent:'space-around'}}>
                <h1 style={{color:'#3f7d20'}}>VISION</h1>
                <div>
                <h2>Our vision is to create a seamless,empowering communities to support local markets while enjoying the convenience of finding fruits and vegetables at the nearest possible distance.</h2>
                </div>
            </div>
        </div>

    </div>
    <Foter/>
    </>
  )
}

export default Aboutus