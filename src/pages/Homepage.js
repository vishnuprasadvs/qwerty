import { logDOM } from '@testing-library/react';
import React , {useState , useEffect} from 'react'
import HomepageGrid from '../components/HomepageGrid';
import {db  } from "../credentials/firebase";
import AdBanner from '../components/AddBanner';
import SponsorGrid from '../components/SponsorGrid';
const Homepage = () => {

  const [bannerData, setbannerData] = useState()
  useEffect(() => {
    db.collection('banner')
    .get()
    .then( snapshot =>{
  
      setbannerData(snapshot.docs.map((doc)=>({...doc.data(), id: doc.id})))
      })
      .catch(error => console.log(error))
  
    return () => {
  
    }
  } ,[])
  return (
    <>
    <section className='homepage_banner'>
      {
        bannerData?.map(data =>{
          return(
            <>
              <div className="banner_image">
                <img src={data.banner_image} alt="" />
              </div>
              <div className="banner_content">
                <div className="container">
                  <div className="content_wrap">
                    <h1>{data.banner_title}<span>.</span>
                    </h1>
                  </div>
                </div>
              </div>
            </>
          )
        })
      }
    </section>
    <HomepageGrid />
    <AdBanner />
    <SponsorGrid />

    </>
  )
}

export default Homepage;
