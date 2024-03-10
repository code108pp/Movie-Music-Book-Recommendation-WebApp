const express = require('express')
const axios = require('axios') 
const moment = require('moment')
const router  = express.Router()
// const mongoose = require('mongoose')
require("../db/conn");
const Insight = require("../model/insightSchema");
const { mongo, default: mongoose } = require('mongoose')

let value = 0

const key = process.env.key;

const fetchMovie = (movieId) =>
  axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=en-US`
  );

async function getMovie(movieId){
    const movie  = await fetchMovie(movieId)
    return movie
}

  async function createData(userData,user){
    return new Promise((resolve,reject)=>{
      try {
        user.history.map(async (e) => {
          const id = e.movieId;
          //  console.log(id)
          const movie = await getMovie(id);
          // console.log(movie)
          movie.data.genres.map((e) => {
            let gCount = 0;
            let i = 0;
            let index = 0;
            userData.map((dt) => {
              if (dt.id === e.id) {
                // console.log("data id",dt.id,"genre id",e.id)
                index = i;
                gCount++;
                // console.log(dt.count)
                // dt.count = dt.count +  1
                // console.log(dt.count)
              }
              i++;
            });

            userData[index].count = userData[index].count + gCount;
            //  console.log(userData[index].count)
            // statData = userData
            // console.log("inside func",statData)
          });
        });

        setTimeout(() => {
          resolve(userData);
        }, 2000);
      } catch (error) {
        console.log(error);
      }
      
    })
    

}

router.get('/getTotalHistory',async (req,res)=>{
    const {userId} = req.body
    const data = await Insight.findOne({userId:userId})
    console.log(data)
    return res.json({hsitory:data,status:true})
})

router.post("/addToHistory", async (req, res) => {
  let count=0;
  const { userId, movieId } = req.body;
  const data = await Insight.findOne({ userId: userId });
  console.log("outside function");
  console.log(data);
  if (data === null) {
    console.log("Inside function"); 
    const history = [
      {
        movieId: movieId,
        histDate: [
          {
            date: moment(new Date()),
          },
        ], 
      },
    ];
    const user = new Insight({ userId, history });
    await user
      .save()
      .then(console.log("succesfully save"))
      .catch((e) => {
        console.log(e);
      });
    return res.json({ message: "Added to history", status: true });
  } else {
    data.history.map(async (e) => {
      if (e.movieId === movieId) {
        const newDate = { 
          date: new Date(),
        };
        count = 1
        e.histDate.push(newDate);
        console.log("inside map func")
        await Insight.findOneAndUpdate({ userId: userId }, data);
        return res.json({ message: "Added to history", status: true });
      }
       else { 
        count += 2
      }
    });
  }
  
  if(count > 1 || count == 0){
    const history = {
    movieId: movieId,
    histDate: [
      {
        date: new Date(),
      },
    ],
    };
    data.history.push(history);
    await Insight.findOneAndUpdate({ userId: userId }, data);
    return res.json({
      message: "Succesfully added to history",
      status: true,
    });
  }

  console.log(count)
});
 
router.post('/userStat',async (req,res)=>{
  const {userId} = req.body
  console.log("id",req.body.userId)
  var statData =[]
  let userData = [
    {"id":28,"name":"Action", "count": 0},
    {"id":16,"name":"Animation", "count": 0},
    {"id":35,"name":"Comedy", "count": 0},
    {"id":80,"name":"Crime", "count": 0},
    {"id":99,"name":"Documentary", "count": 0},
    {"id":18,"name":"Drama", "count": value}, 
    {"id":10751,"name":"Family", "count": 0},
    {"id":14,"name":"Fantasy", "count": 0},
    {"id":36,"name":"History", "count": 0},
    {"id":27,"name":"Horror", "count": 0},
    {"id":10402,"name":"Music", "count": 0},
    {"id":9648,"name":"Mystery", "count": 0},
    {"id":10749,"name":"Romance", "count": 0},
    {"id":878,"name":"Science Fiction", "count": 0},
    {"id":10770,"name":"TV Movie", "count": 0},
    {"id":53,"name":"Thriller", "count": 0},
    {"id":10752,"name":"War", "count": 0},
    {"id":37,"name":"Western", "count": 0},
    {"id":12,"name":"Adventure", "count": 0},
  ]
 
  const user  = await Insight.findOne({userId:userId})
  console.log("user",user)
  if(user === null){
    return res.json({message:"User does not exit",status:false})
  }
  else{
    const genre = [] 
    
    let data = []
     await createData(userData,user).then(e=>{return res.json({stat:e})})
      // console.log("data",data)
    }
    // console.log("statData",statData) 
    // await display(statData)
    // setTimeout(()=>{res.json({stat:statData})},1000)
    // console.log("outside func",statData , "\n")
    // return res.json({data:userData})
  })


router.post('/userHistory',async (req,res)=>{
  // try {
    const { userId } = req.body;
    console.log(userId)
    const nowDate = moment(new Date());

    console.log(nowDate);
    const user = await Insight.findOne({ userId: userId });
    console.log(user)
    const history = user.history;
    // console.log(history)
    let history1 = await Promise.all(
      history.map(async (e) => {
        // e.histDate.map(a=>{
        //   history.push(a)
        // })
        let latestMovieDate = null;
        // let dateDiff = Infinity;
        let dateDiff = 10000000;

        console.log(dateDiff);

        e.histDate.map((a) => {
          var end = moment(a.date); // another date
          var duration = moment.duration(nowDate.diff(end));
          var days = duration.asHours();
          console.log("Days ", days);
          if (days >= 0 && days <= dateDiff) {
            dateDiff = days;
            latestMovieDate = moment(a.date);
          }
          // console.log("Days ",end.hour());
        });

        console.log("latest movie Date", latestMovieDate);

        const movieData = await getMovie(e.movieId);

        return {
          name: movieData.data.title,
          releaseDate: movieData.data.release_date,
          date: latestMovieDate,
          poster: `https://image.tmdb.org/t/p/w185${movieData.data.poster_path}`,
          id: movieData.data.id,
        };
      })
    );

    history1.sort(
      (a, b) =>
        new moment(a.date).format("YYYYMMDD") -
        new moment(b.date).format("YYYYMMDD")
    );

    return res.json({ history: history1, status: true });
  // } catch (error) {
  //   console.log("error ",error)
  // }
  
})

module.exports = router
