import React , {useState , useEffect} from 'react'
import {db  } from "../credentials/firebase";
import firebase from '../credentials/firebase'
import { stringify } from '@firebase/util';
import Aos from 'aos';
const HomepageGrid = () => {
 const [historyData, sethistoryData] = useState()
 const [sortedData, setsortedData] = useState()


  useEffect(() => {
    // console.log('useeffeect');
    Aos.init({
      // initialise with other settings
      duration : 1400,
      offset:400
    });
    db.collection('history_grid')
    .get()
    .then( snapshot =>{
      sethistoryData(snapshot.docs.map((doc)=>({...doc.data(), id: doc.id})))
     
   
    })
      .catch(error => console.log(error))
setTimeout(function(){

  // console.log(JSON.stringify(historyData , null ,4));

},2000)
    return () => {
  
    }
  } ,[])

  

  return (
<>
    <div className='hero_grid_section'>
      <div className="container">
        <div className="inner_wrapper">
    {

      historyData?.map(docs =>{
        
        return(
          <div className="grid_item row"  data-aos="fade-up">
          <div className="col-md-6">
            <div className="feature_image">
              <img src={docs.feature_image} alt="" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="body_copy">
              <h2>{docs.feature_head}</h2>
              <p>{docs.feature_body_content}</p>
            </div>
          </div>
        </div>
        )
      } )
    }
        </div>

      </div>
    </div>

    
</>
  )
}

export default HomepageGrid;
