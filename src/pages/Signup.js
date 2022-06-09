import React , {useRef , useState } from 'react'
import {auth} from "../credentials/firebase"
import {createUserWithEmailAndPassword , onAuthStateChanged , signOut , GoogleAuthProvider , signInWithPopup} from "firebase/auth"
import { Link , useNavigate} from 'react-router-dom'
const Signup = () => {
  const inputEmail = useRef()
  const inputPassword = useRef()
  const inputPasswordConfirm = useRef()
  const navigate = useNavigate()
const [errorMsg, seterrorMsg] = useState('')
  const [user, setuser] = useState({})
  onAuthStateChanged(auth , (currentUser)=>{
    setuser(currentUser)
  })

 const signinwithgoogle =(e) =>{
   e.preventDefault()
   const provider = new GoogleAuthProvider()
   try{
     signInWithPopup(auth , provider)
     navigate('/account')
   }catch(err){
     console.log(err.message);
   }

 }
const register = async(e)=>{
    e.preventDefault()
    seterrorMsg('')

    if(inputPassword.current.value == '' || inputPasswordConfirm.current.value == '' || inputEmail.current.value == ''){
      seterrorMsg('All fields are mandatory!')
    }else if(inputPassword.current.value !==  inputPasswordConfirm.current.value){
      seterrorMsg('Passwords do not match!')
    }else if(inputPassword.current.value ==  inputPasswordConfirm.current.value){
        try{
    
        const user =  await createUserWithEmailAndPassword(auth ,inputEmail.current.value , inputPassword.current.value);
        navigate('/account')
      }catch(error){
        switch (error.code) {
          case "auth/wrong-password":
            seterrorMsg("Wrong Password!")          
            break;
          case "auth/user-not-found":
            seterrorMsg("User with this mail id is not found!")          
            break;
            case "auth/weak-password":
              seterrorMsg("Password is weak!")          
              break;
              case "auth/email-already-in-use":
                seterrorMsg("This E-mail is already in use!")          
                break;
          
          case "auth/invalid-email":
            seterrorMsg("Invalid E-mail!")          
            break;
      
          default:
            break;
        }
        // seterrorMsg(error.message)
      }
    }

}
  return (
    <div className="login_form">
      <form>
        <h5 className='text-center mb-3 text-lg'>Sign Up Here! </h5>
      <div className="error_msg">{errorMsg}</div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"   ref={inputEmail}/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1"  ref={inputPassword}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="exampleInputPassword2"  ref={inputPasswordConfirm}/>
        </div>
        <button type="submit" id='signup_btn'   className="btn btn-red w-100 mt-5 " onClick={register}>Sign Up</button>

        <button onClick={signinwithgoogle} className="btn btn-red btn-border w-100 mt-5"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-google" viewBox="0 0 16 16">
  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
</svg> Sign in with google</button>
      </form>
      <p className='mt-4 '>Already have an account?  <Link to='/login'>Login in here</Link></p>
    </div>
  )
}

export default Signup;
