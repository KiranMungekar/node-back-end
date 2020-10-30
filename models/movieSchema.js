var mongoose = require('mongoose');

var movieSchema= mongoose.Schema({    
    popularity:{ type: Number, default:0.0 ,required: true, min: [0],max: 100.0},
    director:{type:String ,required: true,},
    genre:{type:[String], required:true},
    imdb_score:{type:Number, default:0.0 , required:true , max:10.0},
    name:{type:String, required:true}
});

const movie= mongoose.model('movie',movieSchema,'movies');

module.exports= movie;

// "director": String,
// "genre": [String],
// "imdb_score":Float32Array,
// "name": String
