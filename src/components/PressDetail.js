import React,{ useState,useEffect } from 'react'

const PressDetail = () => {
  const [data, setdata] = useState()
  const slug = window.location.href.split("/").pop()
useEffect(() => {
  fetch(`https://safqat.pixelflames.net/wp-json/wp/v2/posts?slug={${slug}}&post_type=press`)
   .then(response => response.json())
   .then(json => setdata(json?.post_details[0]))

  return () => {
  }
}, [])

  return (
    <div>{console.log(data)}
    {
      JSON.stringify(data,null,2)
    }
    
    </div>
  )
}

export default PressDetail;
