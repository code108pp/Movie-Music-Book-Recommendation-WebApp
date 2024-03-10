const express = require('express')
const axios = require('axios') 
const mongoose = require('mongoose')
const router  = express.Router()

require("../db/conn");

const personalRecommendation = require('../algorithms/personalRecommendation');

const WatchCount = require('../model/watchSchema.js');

router.post('/createWatchCount', async (req, res) => {
    const { email } = req.body;

    try {
        const isExisting = await WatchCount.findOne({ email: email });

        if( isExisting ) return res.status(400).json({ message: "User already exists." });

        const result = await WatchCount.create({ email: email, stats: [] });

        return res.status(400).json({ message: "User watch count created", data: result });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
})

router.post('/doesWatchListExist', async (req, res) => {
    const { email } = req.body;

    try {
        const isExisting = await WatchCount.findOne({ email: email });

        if( isExisting ) return res.status(200).json({ message: "User already exists.", doesExist: true });
        else return res.status(200).json({ message: "User does not exist.", doesExist: false });

        // const result = await WatchCount.create({ email: email, stats: [] });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});



const fetchMovies = (page, genres) => axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=f20575175c2deae7974eb547727d1ace&language=en-US&page=${page}&with_genres=${genres}`);

const filterReccMovies = async ( mList ) => {

    const ids = mList.map( o => o.id );

    const filteredList = await mList.filter( ( {id}, index ) => !ids.includes(id, index+1) );
// console.log(filteredList)
    return filteredList;
}

const compare = (a, b) => {
    if( a.vote_average < b.vote_average ) return 1;
    if( a.vote_average > b.vote_average ) return -1;
    return 0;
}

const sortReccMovies = async ( mList ) => {
    const sortedList = mList.sort( compare );

    return sortedList;
}

const fetchReccMovies = async ( reccGenres ) => {

    let list = [];

    const m1 = await fetchMovies(1, `${reccGenres[0]},${reccGenres[1]},${reccGenres[2]}`);
    list = list.concat(m1.data.results);
    
    const m2 = await fetchMovies(1, `${reccGenres[0]},${reccGenres[1]}`);
    list = list.concat(m2.data.results);
    
    const m3 = await fetchMovies(1, `${reccGenres[0]},${reccGenres[2]}`);
    list = list.concat(m3.data.results);

    const m4 = await fetchMovies(1, `${reccGenres[1]},${reccGenres[2]}`);
    list = list.concat(m4.data.results);

    const m5 = await fetchMovies(1, `${reccGenres[0]}`);
    list = list.concat(m5.data.results);

    const m6 = await fetchMovies(1, `${reccGenres[1]}`);
    list = list.concat(m6.data.results);

    const m7 = await fetchMovies(1, `${reccGenres[2]}`);
    list = list.concat(m7.data.results);

    // console.log(list);
    
    list = await filterReccMovies(list);

    list = await sortReccMovies(list);
    // console.log(list)
    // setTimeout(() => {
    //     setReccMovies(list);
    //     // console.log(reccMovies)
    // }, 1000);
    return list;
}



router.post('/getPerRecc', async (req, res) => {
    const { email } = req.body;

    const userData = await WatchCount.findOne({ email: email });
    try {
        const length = userData.stats.length;
    
        if( length !== 0 ){
            const recommendedGenre = personalRecommendation(userData.stats);
    
            // res.status(200).json({ message: 'Calculated!!!', data:userData });
            const recommendedMovies = await fetchReccMovies(recommendedGenre);
    
            console.log(recommendedGenre);
            // console.log(recommendedMovies);
            
            return res.json({ message: "calculations done.", reccGenres: recommendedGenre, reccMovies: recommendedMovies, status: true });
        }
        else {
            return res.json({ message: 'no data for processing', status: false });
        }
    } catch (error) {
        // console.log(error);
        return res.json({message: "something went wrong", error: userData});
    }

});


function isInWatchCount(genre_id, stats) {
    return stats.findIndex((g) => g.genreId === genre_id);
}


router.patch('/updateWatchCount', async (req, res) => {
    const { email, genre_ids } = req.body;

    // if(!mongoose.Types.ObjectId.isValid(email)) return res.status(404).send('No user with that id');
    try {
        let userData = await WatchCount.findOne({ email: email });
        console.log(userData)
        await genre_ids.map(async (g_id) => {
            // userData.stats.g_id += 1;
            // let index = userData.stats.findIndex((g) => {g.genreId === g_id});

            let index = await isInWatchCount(g_id, userData.stats);
            // console.log(index)

            if( index !== -1 ) userData.stats[index].count += 1;
            
            if( index === -1 ) userData.stats.push({genreId: g_id, count: 1});
            console.log(g_id)
        })
    
        // setTimeout(async ()=>{const updatedData = await WatchCount.findOneAndUpdate({email: email}, userData);
        // res.json({ message: 'Count updated successfully' });
        // console.log(updatedData);},1000)


        const updatedData = await WatchCount.findOneAndUpdate({email: email}, userData);
        res.json({ message: 'Count updated successfully' });

        console.log(updatedData);
    } catch (error) {
        console.log(error)
    }
    
});

module.exports = router;  