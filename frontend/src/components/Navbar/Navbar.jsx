//to convert jsx file to component, we use rafce. rafce use korute tolor khini ahi jai
//1st ami div tag tur bhitorot <img src={assets.logo} alt="" /> eitu disilu. this will show the logo on the screen. then eitu delte kori navigation bar bonuwa start korilu
import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin}) => {
  //the below is a state variable. to create a state variable, we are using const
  const [menu,setMenu] = useState("home"); //menu items buror tolot underline ahiboloi eitu use korisu and tolotu kiba kibi korisu aru
  //state variable name is menu, and setup function name is setMenu. we have initialised the state variable by "home"
  
  const {getTotalCartAmount,token,setToken} = useContext(StoreContext);

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token") 
    setToken("")
    navigate("/") //after logging out, user will be navigated to home page. "/" is the path of home page
  }

  //tolor khinit li tag t dynamic classname use korisu, pisot li tag tu link tag oloi change korilu
  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        {/* <li onClick={()=>setMenu("home")} className={menu === "home" ? "active" : ""}>Home</li>
          in the above one, we will change li to Link tag and import Link*/}
        <Link to='/' onClick={()=>setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        {/* <li onClick={()=>setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</li>
        <li onClick={()=>setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile-app</li>
        <li onClick={()=>setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</li>
        in the above three, replace li tag with a href */}
        <a href="#explore-menu" onClick={()=>setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href="#app-download" onClick={()=>setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile-app</a>
        <a href="#footer" onClick={()=>setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to='/cart' ><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {!token?<button onClick={()=>setShowLogin(true)}>Sign In</button>
        :<div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>}
        
      </div>
    </div>
  )
}

export default Navbar
  