const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  // _id:String,
  userName: {
    type: String,
    required: true,
  },
  
  name: {
    type: String,
    default: null,
  },

  DOB: {
    type: Date,
    default: null,
  },

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: Number,
    // required: false,
    default: null,
  },
  password: {
    type: String,
    // required: true,
  },
  
  watchlist: [
    {
      movieId: String,
      isWatching: Boolean,
      isWatched: Boolean,
      genre: [
        {
          genreId: String,
        },
      ],
      date: Date,
    },
  ],
  musiclist:[
    {
      musicId: String,
    }
  ],
  booklist:[
    {
      volumeId:String,
    }
  ],
  profilePhoto: {
    type: String,
    default: null,
  },
}); 

const  User = mongoose.model('User',userSchema)

module.exports = User;