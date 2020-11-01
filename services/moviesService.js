const MovieSchema= require('../models/movieSchema');
const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId; 

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


module.exports.addMovie = async ({name, rating, director, genre})=>{
    try{
       
        const savedMovie= await MovieSchema.create({
            _id: new mongoose.Types.ObjectId(),
            name:name,
            imdb_score:rating,
            popularity:rating*10,
            director:director,
            genre:genre
        });
        
        
        return{
            err:false,
            movie:savedMovie.get('name')
        }

    }catch(err){
        console.log(err);
        return{
            err:true,
            msg:err
        }
    }
}

module.exports.removeMovie = async (id)=>{
    try{
       const removedMovie= await MovieSchema.findByIdAndDelete(new ObjectId(id));
       return {
           err:false,
           movie:removedMovie.get('name')
       }
    }catch(err){
        return{
           err:true,
           msg:err
       }
    }
}

module.exports.updateMovie= async ({_id, name, director, rating, genre })=>{
    try{
       const updatedMovie= await MovieSchema.findOneAndUpdate(
            {_id:_id},
            {
                name:name,
                imdb_score:rating,
                popularity:rating*10,
                director:director,
                genre:genre
            },
            {useFindAndModify: false}
        );
        console.log(updatedMovie);
        return{
            err:false,
            msg:`${name} sucessfully updated`
        }

    }catch(err){
        console.log(err);
        return{
            err:true,
            msg:err
        }
    }
}   

module.exports.getMovie =async (id)=>{
   
    try{
        const movie= (await MovieSchema.findById(id)).toJSON();

        return{
            err:false,
            movie:movie
        }

    }catch(err){
        return{
            err:true,
            msg:err
        }
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