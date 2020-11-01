const MovieSchema= require('../models/movieSchema');
const mongoose = require('mongoose');

module.exports.getMovies = async ()=>{
   try{
    var query= MovieSchema.find({});
    const allMovies= await query.exec();
    //console.log(allMovies);
    return allMovies;
   }catch(err){
        return null;
   }
}


module.exports.filterMovies = async (params)=>{
    try{
        const queryCondition= manageFilters(params);
        var query= MovieSchema.find(queryCondition);
       // console.log(query);
        var moviesList= await query.exec();
        return moviesList;
    }catch(err){
        console.log(err);
        //return err;
    }
    
}




manageFilters=({name,rating,direactor,genre})=>{
    let query={}
    query['$and']=[];
   

    if(name != undefined && name != ''){
        query['$and'].push({"name":{$regex:new RegExp(name)}})
    }
    if(rating != undefined){
        query['$and'].push({'imdb_score':{$gt:rating}})
    }else{
        query['$and'].push({'imdb_score':{$gt:0}})
    }
    if(direactor != undefined && director != ''){
        query['$and'].push({"direactor":{$regex:new RegExp(direactor)}})
    }

    if(genre != undefined && genre.length > 0){
        query['$and'].push({"genre":{$in:genre}})
    }
    
    return query;

}