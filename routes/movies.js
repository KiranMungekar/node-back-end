var express= require('express');
var router = express.Router();

var moviesService= require('../services/moviesService');

/* GET users listing. */
router.get('/', async function(req, res, next) {
   try{
    const movies= await moviesService.getMovies();
    res.send({data: {moviesList:movies, err: false}});
   }catch(err){
        console.log(err);
        res.send({data:{err:true}}).status(500);
   }
    
});


module.exports= router;