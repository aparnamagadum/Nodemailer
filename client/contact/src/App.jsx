import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
function App() {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [text,setText]=useState('');
  async function sendData(e){
    e.preventDefault();
    try{
    await axios.post('https://nodemailer-server-jn33.onrender.com/sendMail' , {name , email , text})
    console.log("mail sent");
    
    }
    catch(err){console.log(err);}
    
  }
  return (
    <>
      onSubmit={sendData}
     <form >
      <h1>Contact</h1>
      <input type="text" name="name" placeholder='enter your name' value={name} onChange={(e)=>setName(e.target.value)}/>
      <input type="email" name="email" placeholder='enter your mail' value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <textarea rows='5' placeholder='enter your message' value={text} onChange={(e)=>setText(e.target.value)}/>
      <button type='submit'>send Email</button>
      <br />
     </form>
    </>
  )
}

export default App
