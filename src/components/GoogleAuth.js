import React ,{useState} from 'react'
import GoogleLogin, { GoogleLogout } from 'react-google-login';
const GoogleAuth = () => {

  function submitHandler(response){
    // console.log(response.profileObj);
    setloggedIn(true)
    setuserData(response.profileObj)
  }
  function signOutSuccess(res){
    alert('logged out')
    setloggedIn(false)

  }
  const [loggedIn, setloggedIn] = useState(false);
  const [userData, setuserData] = useState()
  return (
    <div>
{
  loggedIn?
  <>
  <GoogleLogout 
  clientId='89088651737-4kgchr7rtth85624imcko7hd8tceh44c.apps.googleusercontent.com'
  onLogoutSuccess={signOutSuccess} />
  <div className="card text-center  p-2" style={{width: 20+'rem'}}>
  <img src={userData?.imageUrl} alt=""  style={{width:100+'%',height:100+'%',objFit:'contain'}}/>
  <div className="card-body">
    <h5 className="card-title">{userData?.givenName}  {userData?.familyName}</h5>
    <p className="card-text">{userData?.email}</p>
    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
  </div>
</div>
  </>
  :
  <>
  <GoogleLogin 
    clientId='89088651737-4kgchr7rtth85624imcko7hd8tceh44c.apps.googleusercontent.com'
    buttonText='Submit'
    onSuccess={submitHandler}
    onFailure={submitHandler}
    cookiePolicy={'single_host_origin'}
    />
    </>
}
    </div>
  )
}

export default GoogleAuth;