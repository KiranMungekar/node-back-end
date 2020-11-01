var express= require('express');
var router = express.Router();

var moviesService= require('../services/moviesService');



    /* GET Movies listing. */
    router.get('/all', async (req, res, next) => {
    try{
        console.log(req.query)
     const movies= await moviesService.getMovies();
     res.send({data: {moviesList:movies, err: false}});
    }catch(err){
         console.log(err);
         res.status(500).send({data:{err:true}});
    }
 });
 
 
 router.get('/', async (req, res, next) => {
     try{
         console.log(req.query)
         const movies= await moviesService.getMovie(req.query.id)
         res.json({data: movies}).status(200);
     }catch(err){
          console.log(err);
          res.status(500).send({data:{err:true}});
     }
 });
 
 
 router.post('/', async (req, res, next) => {
     try{
         console.log(req.query)
         const movies= await moviesService.addMovie(req.body);
         res.json({data: {movie:movies}}).status(200);
     }catch(err){
          console.log(err);
          res.status(500).send({data:{err:true}});
     }
  });
 
  
  router.put('/', async (req, res, next) => {
     try{
         console.log(req.query)
         const movies= await moviesService.updateMovie(req.body);
         res.json({data: {movie:movies}}).status(200);
     }catch(err){
          console.log(err);
          res.status(500).send({data:{err:true}});
     }
  });
 
 
  
  router.delete('/', async (req, res, next) => {
     try{
         console.log(req.query)
         const movies= await moviesService.removeMovie(req.query.id);
         res.json({data: {movie:movies}}).status(200);
     }catch(err){
          console.log(err);
          res.status(500).send({data:{err:true}});
     }
  });
 
 
 
  router.post('/', async (req,res,next)=>{
     try{
         console.log(req.query);
         const moviesList= await moviesService.filterMovies(req.body);
         res.send({data:{moviesList: moviesList}});
     }catch(err){
         res.send({data:{err:true}});
     }
 });    

 module.exports= router;


