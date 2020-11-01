var express= require('express');
var router = express.Router();

var moviesService= require('../services/moviesService');

/* GET users listing. */
router.get('/', async (req, res, next) => {
   try{
       console.log(req.query)
    const movies= await moviesService.getMovies();
    res.send({data: {moviesList:movies, err: false}});
   }catch(err){
        console.log(err);
        res.status(500).send({data:{err:true}});
   }
});


router.post('/browse', async (req,res,next)=>{
    try{
        console.log(req.query);
        const moviesList= await moviesService.filterMovies(req.body);
        res.send({data:{moviesList: moviesList}});
    }catch(err){
        res.send({data:{err:true}});
    }
});

module.exports= router;