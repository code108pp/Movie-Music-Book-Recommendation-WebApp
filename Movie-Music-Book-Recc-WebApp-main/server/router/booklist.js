const express = require('express')
const axios = require('axios')
const router = express.Router();
const mongoose = require('mongoose')
require("../db/conn");
const User = require("../model/userSchema");

// const key = process.env.bookkey



async function getData(volumeId){

    const data =  await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${encodeURIComponent(volumeId)}?key=AIzaSyCB5WxDZV3N4SanfMg3opjJGa3Gs-9RpEQ`
      )

    return {
      data
    }
}

const getWithPromise = async (watchlist)=>{
  
}

// router.post('/getBooksByText',async (req,res)=>{
//     const {text} = req.body
//     const books = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(text)}&key=AIzaSyCB5WxDZV3N4SanfMg3opjJGa3Gs-9RpEQ`) 
//     if(books.length != 0){
//         res.json({books:books,status:true})
//     }else{
//         res.json({message:"Books not found",status:false})
//     }
// })

// router.post('/getBooksByAuthor',async(req,res)=>{
//     const {author} = req.body
//     const books = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=+inauthor:${encodeURIComponent(author)}&key=AIzaSyCB5WxDZV3N4SanfMg3opjJGa3Gs-9RpEQ`) 
//     if(books.length != 0){
//         res.json({books:books,status:true})
//     }else{
//         res.json({message:"Books not found",status:false})
//     }
// })

// router.post('/getBooksByCategory',async(req,res)=>{
//     console.log(req.body)
//     const {category} = req.body
//     const url = `https://www.googleapis.com/books/v1/volumes?q=+subject:${JSON.stringify(category)}&key=AIzaSyCB5WxDZV3N4SanfMg3opjJGa3Gs-9RpEQ`
//     const books = await axios.get(url) 
//     if(books.length != 0){
//         res.json({books:books,status:true})
//     }else{
//         res.json({message:"Books not found",status:false})
//     }
// })

router.post('/getBooksByText', async (req, res) => {
    const { text } = req.body;
    const books = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(text)}&key=AIzaSyCB5WxDZV3N4SanfMg3opjJGa3Gs-9RpEQ`) 
  
    if (books.data.items && books.data.items.length > 0) {
      res.json({ books: books.data.items, status: true });
    } else {
      res.json({ message: "Books not found", status: false });
    }
  });
  
  router.post('/getBooksByAuthor', async (req, res) => {
    const { author } = req.body;
    const books = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=+inauthor:${encodeURIComponent(author)}&key=AIzaSyCB5WxDZV3N4SanfMg3opjJGa3Gs-9RpEQ`) 
  
    if (books.data.items && books.data.items.length > 0) {
      res.json({ books: books.data.items, status: true });
    } else {
      res.json({ message: "Books not found", status: false });
    }
  });


router.post('/getBooksByCategory', async (req, res) => {
    console.log(req.body);
    const { category } = req.body;
    const url = `https://www.googleapis.com/books/v1/volumes?q=+subject:${encodeURIComponent(category)}&key=AIzaSyCB5WxDZV3N4SanfMg3opjJGa3Gs-9RpEQ`;
  
    try {
      const response = await axios.get(url);
      const { data } = response;
  
      if (data.items && data.items.length > 0) {
        res.json({ books: data.items, status: true });
      } else {
        res.json({ message: "Books not found", status: false });
      }
    } catch (error) {
      if (error.response) {
        // The request was made, and the server responded with a status code
        // that falls out of the range of 2xx
        res.status(error.response.status).json({ message: error.response.statusText, status: false });
      } else if (error.request) {
        // The request was made, but no response was received
        res.status(500).json({ message: "Network error", status: false });
      } else {
        // Something happened in setting up the request that triggered an Error
        res.status(500).json({ message: error.message, status: false });
      }
    }
  });

// router.post('/getBooksByTitle',async(req,res)=>{
//     const {title} = req.body
//     const books = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=+intitle:${encodeURIComponent(title)}&key=AIzaSyCB5WxDZV3N4SanfMg3opjJGa3Gs-9RpEQ`) 
//     if(books.length != 0){
//         res.json({books:books,status:true})
//     }else{
//         res.json({message:"Books not found",status:false})
//     }
// })

// router.post('/getBooks',async(req,res)=>{
//     const {text,author,cat,isbn,publisher,title} = req.body
//     const books = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(text)}+intitle:${encodeURIComponent(title)}+subject:${encodeURIComponent(cat)}+inauthor:${encodeURIComponent(author)}+inpublisher:${encodeURIComponent(publisher)}+isbn:${encodeURIComponent(isbn)}&key=AIzaSyCB5WxDZV3N4SanfMg3opjJGa3Gs-9RpEQ`) 
//     if(books.length != 0){
//         res.json({books:books,status:true})
//     }else{
//         res.json({message:"Books not found",status:false})
//     }
// })

router.post('/getBooksByTitle', async (req, res) => {
    const { title } = req.body;
    const books = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=+intitle:${encodeURIComponent(title)}&key=AIzaSyCB5WxDZV3N4SanfMg3opjJGa3Gs-9RpEQ`) 
  
    if (books.data.items && books.data.items.length > 0) {
      res.json({ books: books.data.items, status: true });
    } else {
      res.json({ message: "Books not found", status: false });
    }
  });
  
  router.post('/getBooks', async (req, res) => {
    const { text, author, cat, isbn, publisher, title } = req.body || {};
    const queryParams = [
      `q=${encodeURIComponent(text || '')}+`,
      `intitle:${encodeURIComponent(title || '')}+`,
      `subject:${encodeURIComponent(cat || '')}+`,
      `inauthor:${encodeURIComponent(author || '')}+`,
      `inpublisher:${encodeURIComponent(publisher || '')}+`,
      `isbn:${encodeURIComponent(isbn || '')}`,
    ].join('');
  
    const books = await axios.get(`https://www.googleapis.com/books/v1/volumes?${queryParams}&key=AIzaSyCB5WxDZV3N4SanfMg3opjJGa3Gs-9RpEQ`) 
  
    if (books.data.items && books.data.items.length > 0) {
      res.json({ books: books.data.items, status: true });
    } else {
      res.json({ message: "Books not found", status: false });
    }
  });

  router.post('/getBooklist', async (req, res) => {
    const { _id } = req.body;
    const user = await User.findById(_id);
  
    if (user) {
      const booklist = user.booklist;
      let toggle = booklist.length;
      let i = 0;
  
      const newDaTa = await Promise.all(booklist.map(async e => {
        try {
          const newArr = await getData(e.volumeId);
          return newArr;
        } catch (error) {
          console.error(error);
          return null;
        }
      }));
  
      console.log("booklist", newDaTa);
  
      if (newDaTa.some(e => e)) {
        res.json({ booklist: newDaTa, status: true });
      } else {
        res.json({ message: "No books found in the user's booklist", status: false });
      }
    } else {
      res.json({ message: "User not found", status: false });
    }
  });

router.get('/getGenre',async (req,res)=>{
    const {_id,movieId}  = req.body
    const user = await User.findById(_id)
    let genre = [] 
    user.watchlist.map(e=>{
        if(e.movieId == movieId){
            genre = e.genre
        }
    })
    res.json({genre:genre,status:true})
})

router.post('/addToBooklist', async (req, res) => {
    const { _id, volumeId } = req.body;
  
    try {
    //   const book = await getData(volumeId).catch(error => {
    //     console.error(error);
    //     throw new Error('Failed to get book data');
    //   });
  
      const user = await User.findById(_id).catch(error => {
        console.error(error);
        throw new Error('Failed to find user');
      });
  
      const existingBook = user.booklist.find((e) => e.volumeId === volumeId);
  
      if (existingBook) {
        return res.json({
          message: 'Book is already in the user\'s booklist',
          status: false,
        });
      }
  
      const newBook = {
        volumeId,
        // genre: [],
        // date: new Date().toLocaleString(),
      };
  
      user.booklist.push(newBook);
  
      const updatedUser = await User.findByIdAndUpdate(_id, user, { new: true }).catch(error => {
        console.error(error);
        throw new Error('Failed to update user');
      });
  
      res.json({
        message: 'Book added to booklist',
        status: true,
        book: updatedUser.booklist,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        status: false,
      });
    }
  });
  
  router.post('/deleteFromBooklist', async (req, res) => {
    const { _id, volumeId } = req.body;
  
    try {
      const user = await User.findById(_id).catch(error => {
        console.error(error);
        throw new Error('Failed to find user');
      });
  
      user.booklist = user.booklist.filter((e) => e.volumeId !== JSON.stringify(volumeId));
      console.log(user.booklist)
      const updatedUser = await User.findByIdAndUpdate(_id, user, { new: true }).catch(error => {
        console.error(error);
        throw new Error('Failed to update user');
      });
  
      res.json({
        message: 'Book removed from booklist',
        status: true,
        book: updatedUser.booklist,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        status: false,
      });
    }
  });
  
  router.post('/deleteBooklist', async (req, res) => {
    const { _id } = req.body;
  
    try {
      const user = await User.findById(_id).catch(error => {
        console.error(error);
        throw new Error('Failed to find user');
      });
  
      user.booklist.splice(0, user.booklist.length);
  
      await User.findByIdAndUpdate(_id, user);
  
      res.json({
        message: 'Booklist deleted',
        status: true,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        status: false,
      });
    }
  });
  
  router.get('/getBooklist', async (req, res) => {
    const { _id } = req.body;
  
    try {
      const user = await User.findById(_id).catch(error => {
        console.error(error);
        throw new Error('Failed to find user');
      });
  
      const watchedBooks = user.booklist.filter((e) => e.isWatched);
  
      res.json({
        Books: watchedBooks,
        status: true,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        status: false,
      });
    }
  });
// router.post('/addToWatchedlist',async (req,res)=>{
//     const {_id,movieId} = req.body
//     let user = await User.findById(_id)
//     user.watchlist.map(e=>{
//         if(e.movieId == movieId){
//             e.isWatched = true
//             e.isWatching = false
//         }
//     })  
//     await User.findByIdAndUpdate(_id,user)
//     return res.json({message:"Successfully added to watched list",status:true})
// })

// router.get('/getWatchingList',async (req,res)=>{
//     const {_id}  = req.body
//     const user = await User.findById(_id)
//     let data = []
//     user.watchlist.map(e=>{
//         if(e.isWatching == true){
//             data.push(e)
//         }
//     })

//     return res.json({WatchingMovie:data,status:true})
// })

// router.post('/addToWatchinglist',async (req,res)=>{
//     const {_id,movieId} = req.body
//     let user = await User.findById(_id)
//     user.watchlist.map(e=>{
//         if(e.movieId == movieId){
//             e.isWatching = true
//             e.isWatched = false
//         }
//     })
//     await User.findByIdAndUpdate(_id, user);
//     return res.json({message:"Successfully added to Watching list",status:true})
    
// })



module.exports = router;
