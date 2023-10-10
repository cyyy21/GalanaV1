import "./home.css";
import { Link } from "react-router-dom";
import Profile from "/Profile/c1.jpg";
import Postpic from '/Profile/boracay.png';
import {FaUserAlt,FaImage,FaHome} from 'react-icons/fa'

import {FiLogOut} from 'react-icons/fi'
import { useEffect, useState } from "react";


function Home() {
const [getUser, setUser] = useState([]);

const fetchUser = async () => {
  const response = await fetch('http://localhost:3000/users');
  const {data} = await response.json();
  setUser(data);
}

useEffect(()=>{
  fetchUser();
},[])

const User = localStorage.getItem('userID');



  return (
    <div>
      <header></header>
      <div id="homeContainer">
    
  
  <div className="profile">
          <img src={Profile} alt="profile" className="profileImg" />
{/* not rendering the userName */}
          <div> <FaUserAlt/>{User}</div> 
       <Link to='/home'> <div> <FaHome/> Home</div> </Link>   
          <Link to="/login"> <div><FiLogOut/>Log out</div> </Link>
        </div>

        <div className="blogPost">

        <div id="createPost">
        <form action="submit">
        <textarea type="text" placeholder="Share Your Spot or Places." id="textPost"/>
       <input type="file"  name="imagePost" id='uploadImage'/> 
    <button type="Submit">post</button>
        </form>
       </div>

       

            <div id="userPost">
                <div className="userBlogName" style={{fontSize:'20px', fontWeight:'bold'}}>Cyril John De Leon</div>
                <div className="userPostText" style={{ font:'caption'}}> 
                <p>Welcome to Boracay, the ultimate tropical playground that will sweep you off your feet. Feel the powdery white sand between your toes as you stroll along the iconic White Beach, where vibrant sunsets and swaying palm trees set the stage for relaxation and romance. Dive into a world of underwater wonders as you snorkel or scuba dive in crystal-clear waters teeming with colorful marine life. Indulge in exhilarating water sports, from parasailing to paddleboarding. After an action-packed day, experience the vibrant nightlife and savor delectable cuisine at beachfront restaurants. Boracay is a destination that effortlessly blends relaxation, adventure, and entertainment, promising an unforgettable escape.</p>
                </div>
                <div className="picturePost" style={{margin:'5px'}}> <img src={Postpic} alt="profilepost" /></div>
            </div>
        
        </div>
      </div>

    </div>
  );
}

export default Home;
