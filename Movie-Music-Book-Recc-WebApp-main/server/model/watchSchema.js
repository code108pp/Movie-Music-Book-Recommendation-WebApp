const mongoose = require('mongoose')

const watchSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    stats: [
        {
            genreId: Number,
            count: Number
        }
    ]

})

const  WatchCount = mongoose.model('WatchCount', watchSchema)

module.exports = WatchCount;


// 19: {
//     type: Number,
//     default: 0
// },
// 12: {
//     type: Number,
//     default: 0
// },
// 16: {
//     type: Number,
//     default: 0
// },
// 35: {
//     type: Number,
//     default: 0
// },
// 80: {
//     type: Number,
//     default: 0
// },
// 99: {
//     type: Number,
//     default: 0
// },
// 18: {
//     type: Number,
//     default: 0
// },
// 10751: {
//     type: Number,
//     default: 0
// },
// 14: {
//     type: Number,
//     default: 0
// },
// 36: {
//     type: Number,
//     default: 0
// },
// 27: {
//     type: Number,
//     default: 0
// },
// 10402: {
//     type: Number,
//     default: 0
// },
// 9648: {
//     type: Number,
//     default: 0
// },
// 10749: {
//     type: Number,
//     default: 0
// },
// 878: {
//     type: Number,
//     default: 0
// },
// 10770: {
//     type: Number,
//     default: 0
// },
// 53: {
//     type: Number,
//     default: 0
// },
// 10752: {
//     type: Number,
//     default: 0
// },
// 37: {
//     type: Number,
//     default: 0
// },