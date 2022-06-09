import React, {useEffect , useState} from 'react';
import AOS from 'aos';
import {db  } from "../credentials/firebase";

import 'aos/dist/aos.css'
const Gallery = () => {
 const [gallertImgages, setgallertImgages] = useState();
useEffect(() => {
  AOS.init({
    // initialise with other settings
    duration : 1400,
    offset:400
  });
  db.collection('gallery')
  .get()
  .then( snapshot =>{
    setgallertImgages(snapshot.docs.map((doc)=>({...doc.data(), id: doc.id})))
  })
    .catch(error => console.log(error))
  return () => {
    // second;
  };
}, []);


  return <section className='gallery_grid'>
    <div className="container">

    <div className="gallery_grid_scroller">
      {
        gallertImgages?.map(image =>{
          if(image.id / 1 ==1 || image.id / 7 ==1){
            return(
              <div className="image_holder first" key={image.id}  data-aos="fade-right">
              <img src={image.image_url} alt="" />
            </div>
            )
          }else if(image.id / 1 ==2 || image.id / 8 ==1){
            return(
              <div className="image_holder second" key={image.id}  data-aos="fade-left">
              <img src={image.image_url} alt="" />
            </div>
            )
          }else if(image.id / 1 ==3  || image.id / 9 ==1){
            return(
              <div className="image_holder third" key={image.id}  data-aos="flip-left">
              <img src={image.image_url} alt="" />
            </div>
            )
          }
          else if(image.id / 1 ==4 || image.id / 10 ==1){
            return(
              <div className="image_holder fourth" key={image.id}  data-aos="fade-right">
              <img src={image.image_url} alt="" />
            </div>
            )
          }else if(image.id / 1 ==5 || image.id / 11 ==1){
            return(
              <div className="image_holder fifth" key={image.id}  data-aos="flip-right">
              <img src={image.image_url} alt="" />
            </div>
            )
          }
          else if(image.id / 1 ==6 || image.id / 12 ==1){
            return(
              <div className="image_holder sixth" key={image.id}  data-aos="fade-left">
              <img src={image.image_url} alt="" />
            </div>
            )
          }
        })

      }
    </div>
    </div>
  </section>;
};

export default Gallery;
