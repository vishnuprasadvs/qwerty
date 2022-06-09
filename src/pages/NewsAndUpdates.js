import { isIndexedDBAvailable } from '@firebase/util';
import React , {useEffect , useState} from 'react'
import {db} from '../credentials/firebase'
import Aos from 'aos';
const NewsAndUpdates = () => {
const [newsAndUpdates, setnewsAndUpdates] = useState();

useEffect(() => {
  Aos.init({
    // initialise with other settings
    duration : 1400,
    offset:400
  });
  db.collection('news_and_updates')
    .get()
    .then(snapshot => {
      setnewsAndUpdates(snapshot.docs.map(doc =>({
        ...doc.data(), id: doc.id
      })))
    })
  return () => {
  };
}, []);


  return (
    <>
    <section className="news_and_updates">
      <div className="container">
        <h2>News and Events</h2>
        <div className="news_wrap">
                {
            newsAndUpdates?.map(news =>{
              return(
                <div className="news_item">
                <div className="news_thumbnail_image" data-aos="fade-left">
                  <img src={news.news_image} alt="" />
                </div>
                <div className="news_body_copy">
                  <div className="news_thumb">
                    <p>{news.news_destination}</p>
                    <span>{news.news_date}</span>
                  </div>
                  <h3>{news.news_heading}</h3>
                  <p>{news.news_description}</p>
                </div>
              </div>
              )
            })
          }
        </div>
      </div>
    </section>
    </>
  )
}

export default NewsAndUpdates;
