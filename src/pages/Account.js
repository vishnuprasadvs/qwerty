import React , {useState , useEffect , useRef} from 'react'
import {auth} from "../credentials/firebase"
import {onAuthStateChanged , signOut} from "firebase/auth"
import {db  } from "../credentials/firebase";
import {storage} from "../credentials/firebase"
import {getDownloadURL, ref , uploadBytesResumable} from 'firebase/storage'
import { Link } from 'react-router-dom';


const Account = () => {
  const [user, setuser] = useState({})
  const [editor, seteditor] = useState(false)
  onAuthStateChanged(auth , (currentUser)=>{
    setuser(currentUser)
    setuserEmail(user.email)
  })

const [userEmail, setuserEmail] = useState()
const [getImageUrl, setgetImageUrl] = useState()
  const clientName = useRef()
  const clientDob = useRef()
  const clientClub = useRef()
  const clientMarital = useRef()
  const clientGender = useRef()
  const clientAddress = useRef()
  const clientCountry = useRef()
  const clientNumber = useRef()
  const clientId = useRef()
  const clientEmail = useRef()
  // const getImageUrl = useRef()
  const clientImage = useRef()

const [users, setusers] = useState([])

  const openeditor=()=>{
    {editor?seteditor(false):seteditor(true)}
  }

useEffect(() => {
  // console.log('useeffeect');
  db.collection('players')
  .get()
  .then( snapshot =>{

    setusers(snapshot.docs.map((doc)=>({...doc.data(), id: doc.id})))
    updatedatefield(new Date())
    })
    .catch(error => console.log(error))

  return () => {

  }
} ,[editor])

 users.map(client =>{
  if(client.email === user?.email){
    clientName.current.value = client.name;
    clientNumber.current.value = client.mobile;
    clientClub.current.value = client.club;
    clientMarital.current.value = client.marital_status;
    clientGender.current.value = client.gender;
    clientAddress.current.value = client.address;
    clientCountry.current.value = client.country;
    clientId.current.value = client.id;
    clientDob.current.value = client.dob;
    // clientImage.current.value = client?.profile_image;
    document.getElementById('profielimg').setAttribute('src' , client?.profile_image) 
    var split = client.dob.split('/')

    document.getElementById('year_field').innerText = split[0]
    document.getElementById('month_field').innerText = split[1]
    document.getElementById('date_field').innerText = split[2]

    if(client.dob){
      document.getElementById('dob').value = new Date(split[0] , split[1]-1 , split[2])
    }
  }
})

  function uploaddetails(clientid){
    var date = `${document.getElementById('year_field').innerText}/${document.getElementById('month_field').innerText}/${document.getElementById('date_field').innerText}`;
    if(clientid){
        users.map(entry =>{
          if(entry.id == clientid){
           db.collection('players').doc(clientid).set({
            name:clientName.current.value,
            mobile:clientNumber.current.value,
            email: user?.email,
            dob: date,
            club:clientClub.current.value,
            marital_status:clientMarital.current.value,
            gender:clientGender.current.value,
            address:clientAddress.current.value,
            country:clientCountry.current.value,
            profile_image: document.getElementById('profielimg').getAttribute('src')
           })
          }
          // console.log(clientDob.current.value.getDate());
        })
    }
    else{
      db.collection('players')
          .add({
            name:clientName.current.value,
            mobile:clientNumber.current.value,
            email: user?.email,
            dob:date,
            club:clientClub.current.value,
            marital_status:clientMarital.current.value,
            gender:clientGender.current.value,
            address:clientAddress.current.value,
            country:clientCountry.current.value,
            profile_image: document.getElementById('profielimg').getAttribute('src')

          })
        .catch(error => console.log(error))
    }
    // window.location.reload(false);

  }

  function imageChange(e){
    const file = e.target.files[0];
    // console.log(file);
    uploadImage(file)
  }
    function uploadImage(file){
      if(file){
        const storageRef = ref(storage ,`/profile/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef , file)
        uploadTask.on(
          'state_changed' ,
          (snapshot)=>{

        }, (err)=>console.log(err),
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref)
          .then(url =>{ 
            // console.log(url)
            document.getElementById('profielimg').setAttribute('src' , url);
              })
        }
        )

      }
    
    }

  function deleteAccount(){
    //need to implement
  }
function updatedatefield(date){
  // console.log(date);
  document.getElementById('year_field').innerText = new Date(date).getFullYear()
document.getElementById('month_field').innerText = new Date(date).getMonth() +1
document.getElementById('date_field').innerText = new Date(date).getDate()
}
  return (
    <section className={editor? 'account_details editor_open': 'account_details'}  >
      <div className="container">
        <div className="account_details_wrap" >
              <div className="account_setting_dropdown">
                <span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
  <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
</svg></span>
                <ul className="drop_down">
                    {
                      editor? <> 
                      <li> <span onClick={()=>{ uploaddetails(clientId.current.value) ;
                        seteditor(false)}}>Save</span></li> 
                      <li> <span onClick={()=>seteditor(false)}>Cancel</span></li>
                      </> :
                        <li>

                  <span onClick={openeditor}>Edit profile</span>
                        </li>
                    }
                  
                  <li>
                  <Link to='/edit-password'>Reset password</Link>
                  </li>
                </ul>
              </div>
          <h2>Account Information</h2>
          <div className="details_box row mb-5" id='account_creds'>
            <div className="col-sm-12 mb-5" >
                    <div className='profile_image_section'>
                      <div className="profile_image">
                        {clientImage? 
                        <img  id='profielimg' ref={clientImage} alt="pick image" src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.clipartkey.com%2Fmpngs%2Fm%2F301-3011907_profile-image-placeholder-circle-png.png&f=1&nofb=1'/>: <img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.clipartkey.com%2Fmpngs%2Fm%2F301-3011907_profile-image-placeholder-circle-png.png&f=1&nofb=1' /> }
                          <label htmlFor="profile_image">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16">
  <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
  <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
</svg>
                          </label>
                      </div>

                        <div className='form'>
                            <input type="file" id='profile_image'  onChange={imageChange} />
                          {/* <button className='btn btn-red' onClick={uploadImage} type='submit'>Upload</button> */}
                        </div>

                    <fieldset  className='hidden'>
                      <label htmlFor="">Db Id :</label>
                    <input type="text" ref={clientId} />
                    </fieldset >
                    <fieldset  className='hidden'>
                      <label htmlFor="">User Id :</label>
                    <input type="text" value={user?.uid} />
                    </fieldset>
                   
                    </div>
            </div>
            <div className="col-md-6">

                  <fieldset>
                    <label htmlFor="name">Name :</label>
                    <input type="text"     ref={clientName} onChange={(e)=>clientName.current.value = e.target.value} />
                  </fieldset>
                  <fieldset>
                    <label htmlFor="mail">Email :</label>
                    <input type="text"  value={userEmail} ref={clientEmail} disabled />
                  </fieldset>
                  <fieldset>
                    <label htmlFor="">Mobile number :</label>
                    <input type="text"  ref={clientNumber} onChange={(e)=>clientNumber.current.value = e.target.value}/>
                  </fieldset>
                  <fieldset>
                    <label htmlFor="">DOB :</label>
                    <div className='custom_date_field'><span id='year_field'></span>/<span id='month_field'></span>/<span id='date_field'></span></div>
                    <input type="date" ref={clientDob}  id='dob' name='dob' className='hidden_field' onChange={(e)=>{clientDob.current.value = e.target.value
                    updatedatefield(e.target.value)
                    }}/>
                  </fieldset>
                  <fieldset>
                    <label htmlFor="">Club Name :</label>
                    <input type="text"   ref={clientClub} onChange={(e)=>clientClub.current.value = e.target.value}/>
                  </fieldset>
                 
            </div>
            <div className="col-md-6">
                  <fieldset>
                    <label htmlFor="">Marital Status :</label>

                         <select name="marital_status" id="marital_status" ref={clientMarital} onChange={(e)=>clientMarital.current.value = e.target.value}>
                          <option value="married">Married</option>
                          <option value="single">Single</option>
                    </select>
                  </fieldset>
                  <fieldset>
                    <label htmlFor="">Gender :</label>
                    <select name="gender" id="gender" ref={clientGender} onChange={(e)=>clientGender.current.value = e.target.value}>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Others</option>
                    </select>
                  </fieldset>
                  <fieldset>
                    <label htmlFor="">Address :</label>
                    <textarea name="address" id="" cols="30" rows="5" ref={clientAddress} onChange={(e)=>clientAddress.current.value = e.target.value}/>
                  </fieldset>
                  <fieldset>
                    <label htmlFor="">Country :</label>
                    <select className='' name="user_country" id="account__details__country" ref={clientCountry} onChange={(e)=>clientCountry.current.value = e.target.value}>
                        <option data-locale="any" value="AF">Afghanistan
                        </option>
                        <option data-locale="any" value="AX">Aland Islands
                        </option>
                        <option data-locale="any" value="AL">Albania
                        </option>
                        <option data-locale="any" value="DZ">Algeria
                        </option>
                        <option data-locale="any" value="AS">American Samoa
                        </option>
                        <option data-locale="any" value="AD">Andorra
                        </option>
                        <option data-locale="any" value="AO">Angola
                        </option>
                        <option data-locale="any" value="AQ">Antarctica
                        </option>
                        <option data-locale="any" value="AG">Antigua and Barbuda
                        </option>
                        <option data-locale="es-AR" value="AR">Argentina
                        </option>
                        <option data-locale="any" value="AM">Armenia
                        </option>
                        <option data-locale="any" value="AW">Aruba
                        </option>
                        <option data-locale="en-AU" value="AU">Australia
                        </option>
                        <option data-locale="de-AT" value="AT">Austria
                        </option>
                        <option data-locale="any" value="AZ">Azerbaijan
                        </option>
                        <option data-locale="any" value="BS">Bahamas
                        </option>
                        <option data-locale="any" value="BH">Bahrain
                        </option>
                        <option data-locale="any" value="BD">Bangladesh
                        </option>
                        <option data-locale="any" value="BB">Barbados
                        </option>
                        <option data-locale="any" value="BY">Belarus
                        </option>
                        <option data-locale="fr-BE" value="BE">Belgium
                        </option>
                        <option data-locale="any" value="BZ">Belize
                        </option>
                        <option data-locale="any" value="BJ">Benin
                        </option>
                        <option data-locale="any" value="BM">Bermuda
                        </option>
                        <option data-locale="any" value="BT">Bhutan
                        </option>
                        <option data-locale="any" value="BO">Bolivia
                        </option>
                        <option data-locale="any" value="BA">Bosnia and Herzegovina
                        </option>
                        <option data-locale="any" value="BW">Botswana
                        </option>
                        <option data-locale="any" value="BV">Bouvet Island
                        </option>
                        <option data-locale="pt-BR" value="BR">Brazil
                        </option>
                        <option data-locale="any" value="IO">British Indian Ocean Territory
                        </option>
                        <option data-locale="any" value="BN">Brunei Darussalam
                        </option>
                        <option data-locale="bg-BG" value="BG">Bulgaria
                        </option>
                        <option data-locale="any" value="BF">Burkina Faso
                        </option>
                        <option data-locale="any" value="BI">Burundi
                        </option>
                        <option data-locale="any" value="KH">Cambodia
                        </option>
                        <option data-locale="any" value="CM">Cameroon
                        </option>
                        <option data-locale="en-CA" value="CA">Canada
                        </option>
                        <option data-locale="any" value="IC">Canary Islands
                        </option>
                        <option data-locale="any" value="CV">Cape Verde
                        </option>
                        <option data-locale="any" value="KY">Cayman Islands
                        </option>
                        <option data-locale="any" value="CF">Central African Republic
                        </option>
                        <option data-locale="any" value="TD">Chad
                        </option>
                        <option data-locale="es-CL" value="CL">Chile
                        </option>
                        <option data-locale="any" value="CX">Christmas Island
                        </option>
                        <option data-locale="any" value="CC">Cocos (Keeling) Islands
                        </option>
                        <option data-locale="any" value="CO">Colombia
                        </option>
                        <option data-locale="any" value="KM">Comoros
                        </option>
                        <option data-locale="any" value="CG">Congo
                        </option>
                        <option data-locale="any" value="CD">Congo, The Democratic Republic of the (Zaire)
                        </option>
                        <option data-locale="any" value="CK">Cook Islands
                        </option>
                        <option data-locale="any" value="FX">Corsica
                        </option>
                        <option data-locale="any" value="CR">Costa Rica
                        </option>
                        <option data-locale="any" value="CI">Cote d'Ivoire
                        </option>
                        <option data-locale="hr-HR" value="HR">Croatia
                        </option>
                        <option data-locale="any" value="CY">Cyprus
                        </option>
                        <option data-locale="cs-CZ" value="CZ">Czech Republic
                        </option>
                        <option data-locale="da-DK" value="DK">Denmark
                        </option>
                        <option data-locale="any" value="DJ">Djibouti
                        </option>
                        <option data-locale="any" value="DO">Dominican Republic
                        </option>
                        <option data-locale="any" value="EC">Ecuador
                        </option>
                        <option data-locale="any" value="EG">Egypt
                        </option>
                        <option data-locale="any" value="SV">El Salvador
                        </option>
                        <option data-locale="any" value="GQ">Equatorial Guinea
                        </option>
                        <option data-locale="any" value="ER">Eritrea
                        </option>
                        <option data-locale="et-EE" value="EE">Estonia
                        </option>
                        <option data-locale="any" value="ET">Ethiopia
                        </option>
                        <option data-locale="any" value="FK">Falkland Islands (Malvinas)
                        </option>
                        <option data-locale="any" value="FO">Faroe Islands
                        </option>
                        <option data-locale="any" value="FJ">Fiji
                        </option>
                        <option data-locale="fi-FI" value="FI">Finland
                        </option>
                        <option data-locale="fr-FR" value="FR">France
                        </option>
                        <option data-locale="any" value="GF">France Guyana
                        </option>
                        <option data-locale="any" value="PF">French Polynesia
                        </option>
                        <option data-locale="any" value="TF">French Southern Territories
                        </option>
                        <option data-locale="any" value="GA">Gabon
                        </option>
                        <option data-locale="any" value="GM">Gambia
                        </option>
                        <option data-locale="any" value="GE">Georgia
                        </option>
                        <option data-locale="de-DE" value="DE">Germany
                        </option>
                        <option data-locale="any" value="GH">Ghana
                        </option>
                        <option data-locale="any" value="GI">Gibraltar
                        </option>
                        <option data-locale="el-GR" value="GR">Greece
                        </option>
                        <option data-locale="any" value="GL">Greenland
                        </option>
                        <option data-locale="any" value="GP">Guadeloupe
                        </option>
                        <option data-locale="any" value="GU">Guam
                        </option>
                        <option data-locale="any" value="GT">Guatemala
                        </option>
                        <option data-locale="any" value="GG">Guernsey
                        </option>
                        <option data-locale="any" value="GN">Guinea
                        </option>
                        <option data-locale="any" value="GW">Guinea-Bissau
                        </option>
                        <option data-locale="any" value="GY">Guyana
                        </option>
                        <option data-locale="any" value="HM">Heard Island and McDonald Islands
                        </option>
                        <option data-locale="any" value="HN">Honduras
                        </option>
                        <option data-locale="any" value="HK">Hong Kong
                        </option>
                        <option data-locale="hu-HU" value="HU">Hungary
                        </option>
                        <option data-locale="any" value="IS">Iceland
                        </option>
                        <option data-locale="en-IN" value="IN" selected="">India
                        </option>
                        <option data-locale="in-ID" value="ID">Indonesia
                        </option>
                        <option data-locale="any" value="IQ">Iraq
                        </option>
                        <option data-locale="en-IE" value="IE">Ireland
                        </option>
                        <option data-locale="any" value="IM">Isle of Man
                        </option>
                        <option data-locale="any" value="IL">Israel
                        </option>
                        <option data-locale="it-IT" value="IT">Italy
                        </option>
                        <option data-locale="any" value="JM">Jamaica
                        </option>
                        <option data-locale="ja-JP" value="JP">Japan
                        </option>
                        <option data-locale="any" value="JE">Jersey
                        </option>
                        <option data-locale="any" value="JO">Jordan
                        </option>
                        <option data-locale="any" value="KZ">Kazakhstan
                        </option>
                        <option data-locale="any" value="KE">Kenya
                        </option>
                        <option data-locale="any" value="KI">Kiribati
                        </option>
                        <option data-locale="ko-KR" value="KR">Korea, Republic of
                        </option>
                        <option data-locale="any" value="KV">Kosovo
                        </option>
                        <option data-locale="any" value="KW">Kuwait
                        </option>
                        <option data-locale="any" value="KG">Kyrgyzstan
                        </option>
                        <option data-locale="lv-LV" value="LV">Latvia
                        </option>
                        <option data-locale="any" value="LB">Lebanon
                        </option>
                        <option data-locale="any" value="LS">Lesotho
                        </option>
                        <option data-locale="any" value="LR">Liberia
                        </option>
                        <option data-locale="any" value="LY">Libyan Arab Jamahiriya
                        </option>
                        <option data-locale="any" value="LI">Liechtenstein
                        </option>
                        <option data-locale="lt-LT" value="LT">Lithuania
                        </option>
                        <option data-locale="any" value="LU">Luxembourg
                        </option>
                        <option data-locale="any" value="MO">Macao
                        </option>
                        <option data-locale="any" value="MK">Macedonia, The Former Yugoslav Republic of
                        </option>
                        <option data-locale="any" value="MG">Madagascar
                        </option>
                        <option data-locale="zh-CN" value="CN">Mainland China (中国大陆)
                        </option>
                        <option data-locale="any" value="MW">Malawi
                        </option>
                        <option data-locale="ms-MY" value="MY">Malaysia
                        </option>
                        <option data-locale="any" value="MV">Maldives
                        </option>
                        <option data-locale="any" value="ML">Mali
                        </option>
                        <option data-locale="any" value="MT">Malta
                        </option>
                        <option data-locale="any" value="MH">Marshall Islands
                        </option>
                        <option data-locale="any" value="MQ">Martinique
                        </option>
                        <option data-locale="any" value="MR">Mauritania
                        </option>
                        <option data-locale="any" value="MU">Mauritius
                        </option>
                        <option data-locale="any" value="YT">Mayotte
                        </option>
                        <option data-locale="es-MX" value="MX">Mexico
                        </option>
                        <option data-locale="any" value="FM">Micronesia, Federated States of
                        </option>
                        <option data-locale="any" value="MD">Moldova, Republic of
                        </option>
                        <option data-locale="any" value="MC">Monaco
                        </option>
                        <option data-locale="any" value="MN">Mongolia
                        </option>
                        <option data-locale="any" value="ME">Montenegro
                        </option>
                        <option data-locale="any" value="MS">Montserrat
                        </option>
                        <option data-locale="any" value="MA">Morocco
                        </option>
                        <option data-locale="any" value="MZ">Mozambique
                        </option>
                        <option data-locale="any" value="NA">Namibia
                        </option>
                        <option data-locale="any" value="NR">Nauru
                        </option>
                        <option data-locale="nl-NL" value="NL">Netherlands
                        </option>
                        <option data-locale="any" value="AN">Netherlands Antilles
                        </option>
                        <option data-locale="any" value="NC">New Caledonia
                        </option>
                        <option data-locale="en-NZ" value="NZ">New Zealand
                        </option>
                        <option data-locale="any" value="NI">Nicaragua
                        </option>
                        <option data-locale="any" value="NE">Niger
                        </option>
                        <option data-locale="any" value="NG">Nigeria
                        </option>
                        <option data-locale="any" value="NU">Niue
                        </option>
                        <option data-locale="any" value="NF">Norfolk Island
                        </option>
                        <option data-locale="any" value="MP">Northern Mariana Islands
                        </option>
                        <option data-locale="nb-NO" value="NO">Norway
                        </option>
                        <option data-locale="any" value="OM">Oman
                        </option>
                        <option data-locale="any" value="PK">Pakistan
                        </option>
                        <option data-locale="any" value="PW">Palau
                        </option>
                        <option data-locale="any" value="PS">Palestinian Territory,Occupied
                        </option>
                        <option data-locale="any" value="PA">Panama
                        </option>
                        <option data-locale="any" value="PG">Papua New Guinea
                        </option>
                        <option data-locale="any" value="PY">Paraguay
                        </option>
                        <option data-locale="any" value="PE">Peru
                        </option>
                        <option data-locale="en-PH" value="PH">Philippines
                        </option>
                        <option data-locale="any" value="PN">Pitcairn
                        </option>
                        <option data-locale="pl-PL" value="PL">Poland
                        </option>
                        <option data-locale="pt-PT" value="PT">Portugal
                        </option>
                        <option data-locale="any" value="PR">Puerto Rico
                        </option>
                        <option data-locale="any" value="QA">Qatar
                        </option>
                        <option data-locale="any" value="RE">Reunion
                        </option>
                        <option data-locale="ro-RO" value="RO">Romania
                        </option>
                        <option data-locale="ru-RU" value="RU">Russian Federation
                        </option>
                        <option data-locale="any" value="RW">Rwanda
                        </option>
                        <option data-locale="any" value="SH">Saint Helena
                        </option>
                        <option data-locale="any" value="KN">Saint Kitts and Nevis
                        </option>
                        <option data-locale="any" value="LC">Saint Lucia
                        </option>
                        <option data-locale="any" value="WS">Samoa
                        </option>
                        <option data-locale="any" value="SM">San Marino
                        </option>
                        <option data-locale="any" value="ST">Sao Tome and Principe
                        </option>
                        <option data-locale="any" value="SA">Saudi Arabia
                        </option>
                        <option data-locale="any" value="SN">Senegal
                        </option>
                        <option data-locale="any" value="RS">Serbia
                        </option>
                        <option data-locale="any" value="CS">Serbia and Montenegro
                        </option>
                        <option data-locale="any" value="SC">Seychelles
                        </option>
                        <option data-locale="any" value="SL">Sierra Leone
                        </option>
                        <option data-locale="any" value="SG">Singapore
                        </option>
                        <option data-locale="sk-SK" value="SK">Slovakia 
                        </option>
                        <option data-locale="sl-SI" value="SI">Slovenia
                        </option>
                        <option data-locale="any" value="SB">Solomon Islands
                        </option>
                        <option data-locale="any" value="SO">Somalia
                        </option>
                        <option data-locale="en-ZA" value="ZA">South Africa
                        </option>
                        <option data-locale="any" value="GS">South Georgia and the South Sandwich Islands
                        </option>
                        <option data-locale="es-ES" value="ES">Spain
                        </option>
                        <option data-locale="any" value="LK">Sri Lanka
                        </option>
                        <option data-locale="any" value="PM">St Pierre + Miquelon
                        </option>
                        <option data-locale="any" value="SR">Suriname
                        </option>
                        <option data-locale="any" value="SJ">Svalbard and Jan Mayen
                        </option>
                        <option data-locale="any" value="SZ">Swaziland
                        </option>
                        <option data-locale="sv-SE" value="SE">Sweden
                        </option>
                        <option data-locale="de-CH" value="CH">Switzerland
                        </option>
                        <option data-locale="zh-TW" value="TW">Taiwan
                        </option>
                        <option data-locale="any" value="TJ">Tajikistan
                        </option>
                        <option data-locale="any" value="TZ">Tanzania, United Republic of
                        </option>
                        <option data-locale="th-TH" value="TH">Thailand
                        </option>
                        <option data-locale="any" value="TG">Togo
                        </option>
                        <option data-locale="any" value="TK">Tokelau
                        </option>
                        <option data-locale="any" value="TO">Tonga
                        </option>
                        <option data-locale="any" value="TT">Trinidad and Tobago
                        </option>
                        <option data-locale="any" value="TN">Tunisia
                        </option>
                        <option data-locale="tr-TR" value="TR">Turkey
                        </option>
                        <option data-locale="any" value="TM">Turkmenistan
                        </option>
                        <option data-locale="any" value="TV">Tuvalu
                        </option>
                        <option data-locale="any" value="UG">Uganda
                        </option>
                        <option data-locale="uk-UA" value="UA">Ukraine
                        </option>
                        <option data-locale="any" value="AE">United Arab Emirates
                        </option>
                        <option data-locale="en-GB" value="GB">United Kingdom
                        </option>
                        <option data-locale="en-US" value="US">United States
                        </option>
                        <option data-locale="any" value="UM">United States Minor Outlying Islands
                        </option>
                        <option data-locale="any" value="UY">Uruguay
                        </option>
                        <option data-locale="any" value="UZ">Uzbekistan
                        </option>
                        <option data-locale="any" value="VU">Vanuatu
                        </option>
                        <option data-locale="any" value="VA">Vatican City
                        </option>
                        <option data-locale="any" value="VE">Venezuela
                        </option>
                        <option data-locale="vi-VN" value="VN">Vietnam
                        </option>
                        <option data-locale="any" value="VG">Virgin Islands, British
                        </option>
                        <option data-locale="any" value="VI">Virgin Islands, U.S.
                        </option>
                        <option data-locale="any" value="WF">Wallis + Futuna Island
                        </option>
                        <option data-locale="any" value="EH">Western Sahara
                        </option>
                        <option data-locale="any" value="YE">Yemen
                        </option>
                        <option data-locale="any" value="ZM">Zambia
                        </option>
                        <option data-locale="any" value="ZW">Zimbabwe
                        </option>
                     </select>
                  </fieldset>
            </div>
          </div>
               
                  {/* {
                    editor? <div className="account_cred_btn"> <button className='btn btn-red'onClick={()=>seteditor(false)} >Cancel</button> 
                    <button className='btn btn-red' onClick={()=>{ uploaddetails(clientId.current.value) ;
                      seteditor(false)}}>Upload </button>
                     </div> : <div className="account_cred_btn"> <button className='btn btn-red' onClick={openeditor}>Edit</button></div>
                  } */}
        </div>
      </div>
          {/* <div className="footer_image mt-5">
            <img className='w-100 h-100' src="https://i.pinimg.com/564x/dd/3c/ee/dd3ceee563c6ca14fba183f257d4a256.jpg" alt="" />
          </div> */}
    </section>
  )
}

export default Account;
