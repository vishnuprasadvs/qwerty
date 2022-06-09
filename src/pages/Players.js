import React , {useEffect , useState} from 'react'
import {db} from '../credentials/firebase'

const Players = () => {
  const [playersList, setplayersList] = useState();

  useEffect(() => {

    db.collection('players')
      .get()
      .then(snapshot => {
        setplayersList(snapshot.docs.map(doc =>({
          ...doc.data(), id: doc.id
        })))
      })
    return () => {
    };
  }, []);
  
  return <>
    <section className="players">
      <div className="container">
        <div className="players_wrap row">
{
  playersList?.map(player =>{
    var temp = player.dob.split('/')
var year = Number(temp[0])
var thisyear = new Date().getFullYear()

    return(
      <div className='col-lg-6 col-md-12'>
      <div className="player_block ">
        <div className="player_image">
          <img src={player.profile_image} alt="" />
        </div>
        <div className="player_details">

        <span>Name: {player.name}</span>
        <span>Club: {player.club}</span>
        <span>Age: {thisyear - year}</span>

        </div>
      </div>
      </div>
    )
  })
}
        </div>
      </div>
    </section>
  </>;
};

export default Players;
