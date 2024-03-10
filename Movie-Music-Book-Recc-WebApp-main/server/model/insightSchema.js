const mongoose = require('mongoose')

const insightSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    history:[
        {
            movieId:String,
            histDate:[
                {
                    date: String
                }
            ]
        }
    ]
})

const  Insight = mongoose.model('Insight',insightSchema)

module.exports = Insight;
