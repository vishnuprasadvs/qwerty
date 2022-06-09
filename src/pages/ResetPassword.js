import React ,{useState , useRef} from 'react'
import {confirmPasswordReset} from "firebase/auth"
import {auth} from "../credentials/firebase"
import { useLocation , useNavigate} from 'react-router-dom';


const ResetPassword = () => {
  const navigate = useNavigate()
  const [errorMsg, seterrorMsg] = useState('')
  const inputPassword = useRef()
  const query = useQuery();

  console.log(query.get('mode'));
  console.log(query.get('continueUrl'));
  console.log(query.get('oobCode'));


  const resetPassword=(e)=>{

    e.preventDefault();
    try{

      confirmPasswordReset(auth , query.get('oobCode') ,inputPassword.current.value )
      seterrorMsg('Password reset')
      setTimeout(function(){
        navigate('/login')
      }, 2000)
    }catch(err){
      seterrorMsg(err.message)

    }
  }

  function useQuery(){
    return new URLSearchParams(useLocation().search)
  }


  return (
    <div className="login_form">
    <form >
      <h5 className='text-center mb-3 text-lg'>Enter new password </h5>
      <div className="Success_msg">{errorMsg}</div>
      <div className="mb-3">
        <input type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={inputPassword} />
      </div>
    
      <button type="submit" className="btn btn-red w-100 mt-5" onClick={resetPassword}>Reset Password</button>
 
    </form>
  </div>
  )
}

export default ResetPassword;
