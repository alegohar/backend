import React from "react";
import { useState } from 'react'
import axios from "axios";
function CustForm() {
  const [count, setCount] = useState(0)
  const [name,setName] = useState("")
  const [status,setStatus] = useState("")
const newArr = [];

var a = 0;
const handleSubmit = async (e)=>{
  e.preventDefault()
  console.log(newArr);
  await axios.post('http://localhost:5000/todo', {
    text: name,
    status: status
  })
  .then(function (response) {
    console.log(response);
  })
}
  return (
    <>
    <form onSubmit={handleSubmit}>
    <h1>Contact Form</h1>
    <div>
      <input 
      onChange={(e)=>{
        setName(e.target.value);
        if(name === " ")
        {
          alert("Please Enter Correct Name");
        }
        if(!isNaN(name))
        {
          alert("Please Enter Characters");
        }

      }} 
      required
    
      type="text" placeholder="Name" />
    </div>
<div>
      <input 
      onChange={(e)=>{
        setStatus(e.target.value);
       
      }} 
      required
    
      type="text" placeholder="Status" />
    </div>
    

    <button  type='Submit'>Submit</button>
    </form>
  
    </>
  )
}

export default CustForm