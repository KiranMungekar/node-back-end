const MovieScema= require('../models/movieSchema');
const mongoose = require('mongoose');

module.exports.getMovies = async ()=>{
    var query= MovieScema.find({});
    const allMovies= await query.exec();
    console.log(allMovies);
    return allMovies;
}