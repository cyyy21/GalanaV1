import { useState } from "react";
import './register.css'
import { Link } from "react-router-dom";

function Register() {
const [userName, setUname] = useState('');
const [password,setPword] = useState('');
const [error, setError] = useState('');
const [userNameError, setUserNameError] = useState('');
const [passwordError, setPasswordError] = useState('');

const handleSubmit = async (e) => {
    
e.preventDefault();
let hasError = false; 

console.log(userName);  
console.log(password);
if(userName.length < 5) {
 
    hasError = true;
    setUserNameError('Username must be at least five characters')
  
} 
else {
    setUserNameError('')
}

if(password.length < 5) {
    setPasswordError('Password must be five characters')
    hasError = true;
}


else {
    console.log(`Username :${userName} and password: ${password}`)
   setPasswordError('')
}

if(!hasError) {


try {
    const response = await fetch('http://localhost:3000/register', {
        method:'POST',
        headers:{ 'Content-Type': 'application/json'},
        body: JSON.stringify({userName, password}),
     
    });


    if(response.ok) {
        
            alert('Registration successfully');
            window.location.href= '/login';
            setError('');
    }

   else  {
    
        setError('Username already Exists')
      
      }
     



} 
catch (error) {
    console.log(error)
}

}
}
    
    return (
        <div>
            <div id="containerForm">
            <form onSubmit={handleSubmit} id="registerForm">
<h1 >Register</h1>
            {error && <p className="errorMessage">{error}</p>}

           <input type="text" id="userName" placeholder="Username" onChange={(e)=> setUname(e.target.value)} />
           <br/>{userNameError && <p className="errorMessage">{userNameError}</p>}
           <br/>
           <input type="password" placeholder="password" onChange={(e) =>  setPword(e.target.value)} />
           <br/>{passwordError && <p className="errorMessage">{passwordError}</p>}
           <br/>
           <button type="submit">Submit</button>
<br /> 
            <p>Already have an account ? <Link to={'/login'} id="linkLogin">Login</Link></p>
           </form>
        </div>
        </div>
    );
}


export default Register;
