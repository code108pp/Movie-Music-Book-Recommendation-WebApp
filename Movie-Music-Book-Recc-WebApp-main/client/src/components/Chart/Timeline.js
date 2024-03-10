import react from 'react'
import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import {useSelector } from "react-redux";
import axios from 'axios'
import moment from 'moment'

import './timelineStyle.css'

const tl = [
  {
    date: "65Million B.C.",
    description: "65Million B.C.",
    property: "RAWWWWWWRRR 🐢🦂",
  },
  {
    date: "48Million B.C.",
    description: "Humans",
    property: "Hehe",
  },
  {
    date: "30Million B.C.",
    description: "Dogs",
    property: "Bhao bhao",
  },
];

function Timeline(){

    
    // const id = useSelector(authdata);
    const [movieInfo,setMovieInfo] = useState([])
   
    // setMovieInfo([null])
    
    useEffect(()=>{
      var obj = JSON.parse(localStorage.getItem("profile"));
      const id = JSON.parse(localStorage.getItem("profile")).profile._id;
      console.log(obj.profile._id)
      async function getMovieInfo(id){
        await axios
          .post("http://localhost:3010/userHistory", {
            userId: JSON.stringify(id),
          })
          .then((e) => {
            console.log("history", e.data.history);
            setMovieInfo(e.data.history)
          });

        // setMovieInfo(info.history1)
      }

      getMovieInfo(id);
      // getMovieInfo(obj.profile._id);sk

      console.log("movieinfo ",movieInfo)
    },[])

 
    
    

    return (
      <>
        <div id="timeline-content">
          <h1 className="timlineHeading">Timeline</h1>
          <ul class="timeline">
            {movieInfo.map((e) => {
              return (
                <>
                  <Link to={`/timeline/${e.id}`} className="event" data-date={moment(e.date).format("D MMMM yyyy")}>
                    <div className="arrow-right"></div>
                    <div
                      // to={`/timeline/${e.id}`}
                      className='timelineCard'
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "20px",
                        marginTop: "-11px",
                      }}
                    >
                      <div className="timelineInfo">
                        <div className="timelineName">
                          <h3>{e.name}</h3> 
                          <p className="paraghraph">{e.releaseDate}</p>
                        </div>
                        <img src={e.poster} alt={e.name} width="200" height="135" className="movieImg"></img>
                      </div>
                    </div>
                  </Link>
                </>
              );
            })}
          </ul>
        </div>
      </>
    );
}   

export default Timeline;