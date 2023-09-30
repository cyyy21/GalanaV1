import { useEffect, useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';


function Login() {
  // Define state variables
  const [userName, setUName] = useState('');
  const [password, setPword] = useState('');
  const [userData, setUserData] = useState([]);
useEffect(()=>{
  localStorage.removeItem('userId');
  localStorage.removeItem('token')
}, [])

  const submit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userName,password}),
        
      });
  const data = await response.json() ;

if(response.ok) {
  const {token} = data;
  localStorage.setItem("token", token);
  fetch('http://localhost:3000/isTokenValid', {
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      Authorization:`Bearer ${token}`
    },
  })
  .then((response)=>response.json())
  .then((data) => {
    localStorage.setItem("userId" , data )
window.location.href = '/home'
  })
  
}
else{
  alert('Error Login')
}
   
    } 
    catch (error) {
      console.error(error);
    }
    
  }


  return (
    <div id='bodyLogin'>
      <div id='formContainer'>
        <h1>Welcome to Galana</h1>
        <form onSubmit={submit}>
          <input
            type='text'
            placeholder='UserName'
            onChange={(e) => setUName(e.target.value)}
          />
          <br />
          <br />
          <input
            id='passwrd'
            type='password'
            placeholder='Password'
            onChange={(e) => setPword(e.target.value)} // Corrected '='
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't Have an Account? <Link to={'/'}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
