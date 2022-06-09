import React , {useState , useRef , useEffect} from 'react'
import {db  } from "../credentials/firebase";

const AdBanner = () => {

    const playername = useRef();
    const playerNumber = useRef();
    const playernAddress = useRef();
    const playerDob = useRef();
const [errorMsg, seterrorMsg] = useState()
const [openregisterform, setopenregisterform] = useState(false)
    function registerForm(e){
        seterrorMsg('')
            e.preventDefault()
            if(playername.current.value !== '' && playerNumber.current.value !== '' && playernAddress.current.value !== '' && playerDob.current.value !== ''){
                db.collection('summercamp').doc(playername.current.value + playerNumber.current.value).set({
                    name:playername.current.value,
                    dob:playerDob.current.value,
                    address:playernAddress.current.value,
                    number:playerNumber.current.value
    
                })
                  .catch(error => {
                            seterrorMsg(error.msg)
                  })  
                  seterrorMsg('')
                     setopenregisterform(false)

            }else{
                seterrorMsg('All fields are required')
            }
    }
    function openRegisterForm(){
        setopenregisterform(true)
    }
  return (<>
    <section className='ad_modal'>
        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.OjGGopa6ZgSNI2HlGVAI8QHaEK%26pid%3DApi&f=1" alt="" />
        <div className="container">
            <h3>Join our SUMMER CAMP 2022</h3>
            <button onClick={openRegisterForm} className="btn btn-red w-auto">Register</button>
        </div>
    </section>
{openregisterform && 
    <form className='registerforcamp'>
        <h3 className='mb-4'>Fill the fields</h3>

        <p className='danger'>{errorMsg && errorMsg}</p>
        <fieldset>
            <label htmlFor="">Name: </label><input ref={playername} onChange={(e)=>{playername.current.value = e.target.value}} type="text" />
        </fieldset>
        <fieldset>
            <label htmlFor="">DOB: </label><input ref={playerDob} type="date" />
        </fieldset>
        <fieldset>
            <label htmlFor="">Phone Number: </label><input  ref={playerNumber} onChange={(e)=>{playerNumber.current.value = e.target.value}}  type="text" />
        </fieldset>
        <fieldset>

            <label htmlFor="">Address: </label><textarea  ref={playernAddress} onChange={(e)=>{playernAddress.current.value = e.target.value}}  type="text" className='' />
        </fieldset>

        <button className='btn btn-red mt-5' onClick={registerForm}>Submit</button>

    </form>
}
  </>
  )
}

export default AdBanner;