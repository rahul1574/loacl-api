import React from 'react'
import { useState } from 'react';
import axios from 'axios';
function Image() {
    const [inputs,setinputs]=useState({})
    const handlechange=(event)=>{
        const name=event.target.name
        const value=event.target.value
        setinputs(values=>({...values,[name]:value}))
    }
    const handlesubmit=(event)=>{
        event.preventDefault();
        axios.post('http://localhost:80/api/user/save',inputs).then(function(response){
            console.log(response.data);
        });
    }
  return (
    <div>
    <h2>Image Manager</h2>

    {/* Upload Form */}
    <form onSubmit={handlesubmit}>
      <input type="file" name="name"onChange={handlechange} />
      <button type="submit">Upload Image</button>
    </form>
    </div>

);

}

export default Image