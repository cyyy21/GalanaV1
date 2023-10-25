import { useState } from 'react';
import './login.css';
import { Link} from 'react-router-dom';


function Login() {
  // Define state variables
  const [userName, setUName] = useState('');
  const [password, setPword] = useState('');

  localStorage.removeItem('userID');
  localStorage.removeItem('token')


  const submit = async (e) => {
  
      e.preventDefault(); // Prevent the default form submission behavior
      let hasError = false;
  
      if (userName === '') {
        alert("Please enter your username");
        hasError = true; // Use assignment here, not comparison
      }
      if (password === '') {
        alert('Please enter a password');
        hasError = true; // Use assignment here, not comparison
      }
  
      if (!hasError) {
        try {
          const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userName, password }),
          });
          const data = await response.json();
          if (response.ok) {
            const { token } = data;
  
            localStorage.setItem('token', token);
            fetch('http://localhost:3000/isTokenValid', {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json',
              },
            })
              .then((res) => res.json())
              .then((data) => {
                localStorage.setItem('userID', data.message);
                console.log(data);
            window.location.href='/home'
              });
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
  
  
  
  return (
    
    <div id='bodyLogin'>
     
      <div id='formContainer'>
        <h1>Galana</h1>
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
          Don`t Have an Account? <Link to={'/'} id='linkSignUp'>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
