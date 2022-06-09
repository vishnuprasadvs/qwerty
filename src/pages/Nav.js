import React , {useState , useEffect , useRef} from 'react'
import { Link } from 'react-router-dom';
import {onAuthStateChanged , signOut} from "firebase/auth"
import {auth} from "../credentials/firebase"
import {db  } from "../credentials/firebase";
import Press from '../components/Press';

const Nav = () => {
const [headerLogoData, setheaderLogoData] = useState();
const [logoUrl, setlogoUrl] = useState();
const [navLinks, setnavLinks] = useState();
const [playerData, setplayerData] = useState();
  useEffect(() => {
    db.collection('site_header')
    .get()
    .then( snapshot =>{
      setheaderLogoData(snapshot.docs.map((doc)=>({...doc.data(), id: doc.id})))
    })
      .catch(error => console.log(error))
      db.collection('header_links')
      .get()
      .then( snapshot =>{
        setnavLinks(snapshot.docs.map((doc)=>({...doc.data(), id: doc.id})))
      })
        .catch(error => console.log(error))

        db.collection('players')
    .get()
    .then( snapshot =>{
      setplayerData(snapshot.docs.map((doc)=>({...doc.data(), id: doc.id})))
    })
    
        // activeteNavElement()
    return () => {
      
    };
  }, []);
  useEffect(() => {
    headerLogoData?.map(logo => setlogoUrl(logo.site_logo))
  // console.log(logoUrl);
  playerData?.map(player=>{

    if(user?.email == player.email){
      if(player.profile_image !== ''){
        document.getElementById('main_image').setAttribute('src' , player.profile_image)
      }else{
      }
    }
  })
    return () => {
      // second;
    };
  });
  

  const [user, setuser] = useState({})
  onAuthStateChanged(auth , (currentUser)=>{
    setuser(currentUser)
  })

  function toggleNavMenu(){
    document.querySelector('body').classList.toggle('nav_open')
  }
  var links =  document.querySelectorAll('header nav .nav_links li a')
  links.forEach(link => {
    link.addEventListener('click' , function(){
    document.querySelector('body').classList.remove('nav_open')
    })
  })
  const logout = async()=>{
    await signOut(auth)
  }
  return (
    <header className='dark_mode'>
      <div className="container">
        <nav>
          <div className="user_name">
              {user?.email}
          </div>
        <Link to="/" className="logo"><img src={logoUrl} alt="" /> </Link>
        <ul className="hamburger_menu_mobile" onClick={toggleNavMenu}>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <ul className='nav_links'>
        <li>
                  <Link to='google-auth'>Google</Link>
                </li>
          {
            navLinks?.map(link =>{
              return(
           <li key={link.id}><Link to={link.page_url} >{link.page_name}</Link> </li>
              )
            })
          }

          {user?<li>
            
              <span>
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.clipartkey.com%2Fmpngs%2Fm%2F301-3011907_profile-image-placeholder-circle-png.png&f=1&nofb=1" id='main_image' alt="" />
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="" class="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg> */}
            </span>

              <ul className="dropdown">
                
                  {user? '': <li><Link to='/signup'>Sign up</Link></li>}
                 <li>
                  {user? <Link to='/' onClick={logout}>Log out</Link>:<Link to="/login">Login</Link>}
                   </li>
                   {/* {user? <li><Link to='/signup'>Sign up</Link></li>} */}
                   {user? <li><Link to='/account'>Account</Link></li>:''}
                
              </ul>
              </li> : <li><Link to='/login' className='btn btn-red'>Sign up</Link></li> }
              <li><Link to='/press'>Press</Link></li>
            
        </ul>

        </nav>
      </div>
    </header>
  )
}

export default Nav;
