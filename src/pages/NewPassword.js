import React , {useState , useRef} from 'react'
import {sendPasswordResetEmail} from "firebase/auth"
import {auth} from "../credentials/firebase"
import { useNavigate } from 'react-router-dom'

const NewPassword = () => {
const navigate = useNavigate()
const [onSubmit, setonSubmit] = useState(false)

const sendresetmail=(e)=>{
  e.preventDefault()
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  setonSubmit(true)
  if(inputEmail.current.value == ''){
    setsuccessMsg('')
    seterrorMsg('')
  setonSubmit(false)
    setTimeout(function(){
      seterrorMsg('Please enter an email ID')
    }, 500)
  }else if(inputEmail.current.value.match(mailformat)){
  setonSubmit(true)

    seterrorMsg('')
        try{
            sendPasswordResetEmail(auth , inputEmail.current.value , {url:'http://localhost:3004/login'})
            setsuccessMsg('Reset mail sent! Please check you inbox')
            setTimeout(function(){
              navigate('/login')
            },3000)
        }catch(err){
  setonSubmit(false)
          seterrorMsg(err.message)
      
        }
  }
  
  else{
    seterrorMsg('')
    setTimeout(function(){
      seterrorMsg('Enter valid email')
    }, 500)

  }
}
const [errorMsg, seterrorMsg] = useState('')
const [successMsg, setsuccessMsg] = useState('')
const inputEmail = useRef()

  return (
    <div className="login_form">
    <form >
      <h5 className='text-center mb-3 text-lg'>Confirm email address </h5>
      <div className="error_msg">{errorMsg}</div>
      <div className="success_msg">{successMsg}</div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={inputEmail} />
      </div>
    {successMsg?'':
      <button type="submit" className="btn btn-red w-100 mt-5"  onClick={sendresetmail}>
            {
        onSubmit?<>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
   <span class="">Loading...</span></> : 'Send Mail'
  }
        </button>
    }
    
 
    </form>
  </div>
  )
}

export default NewPassword;
