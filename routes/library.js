var express= require('express');
var router = express.Router();

var libraryService= require('../services/libraryService');


router.post('/addBook', async (req, res, next)=>{

    const booksData= await libraryService.addBook(req.body);

    res.status(200).send({
        data:booksData
    });

});

router.get('/insertAllBooks', async (req,res,next)=>{
    const booksData= await libraryService.insertAllBooks();

    res.status(200).send({
        data:booksData
    });
})

router.post('/bookByYear', async (req, res, next)=>{

    const booksData= await libraryService.getAllBooksByPublishedYear(req.body);

    res.status(200).send({
        data:booksData
    });

}) 

router.post('/bookByAuthors', async (req, res, next)=>{

    const booksData= await libraryService.getBooksByAuthors(req.body);

    res.status(200).send({
        data:booksData
    });
}) 

router.post('/bookByCost', async (req, res, next)=>{

    const booksData= await libraryService.getBooksByCost(req.body);

    res.status(200).send({
        data:booksData
    });

}) 

router.post('/updateCost', async (req, res, next)=>{

    const booksData= await libraryService.updateBookCostByCategory(req.body);

    res.status(200).send({
        data:booksData
    });

})

router.get('/getAllBooksCost', async (req, res, next)=>{

    const booksData= await libraryService.getBooksCost();

    res.status(200).send({
        data:booksData
    });

});

router.post('/deleteBooks', async (req, res, next)=>{

    const booksData= await libraryService.deleteBooks(req.body);

    res.status(200).send({
        data:booksData
    });

});

router.get('/getCoAuthorBooks', async (req, res, next)=>{

    const booksData= await libraryService.getBooksByMultipleAuthors();

    res.status(200).send({
        data:booksData
    });

});




module.exports= router;