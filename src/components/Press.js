import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

const Press = () => {
  useEffect(() => {
    fetch('https://safqat.pixelflames.net/wp-json/wp/v2/posts?post_type=press')
     .then(response => response.json())
     .then(json => setdata(json.post_details))
  
    return () => {
    }
  }, [])
  const [data, setdata] = useState()
  
  return (
    <ul className='mt-5 mb-5'>
    
    {
      data?.map((data,index)=>{
        return(
          <li key={index} className='text-center'><Link to={`/press-detail/${data.slug}`}>{data.name}</Link></li>
        )
      })
    }
    </ul>
  )
}

export default Press;