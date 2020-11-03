const BookSchema= require('../models/BookSchema');
const mongoose = require('mongoose');
//var ObjectId = require('mongoose').Types.ObjectId; 

const allBooks= [{
    "title":"The Talisman",
    "publication":"Viking Press",
    "authors": ["Stephen King","Peter Straub"],
    "category":["Horror fiction","Dark fantasy"],
    "publishedAt": "1955",
    "cost":689,
    "isBestSeller":true
},
{
    "title":"Lord of the ring:The Fellowship of the Ring",
    "publication":"Viking Press",
    "authors": ["JRR Tolkien"],
    "category":["Horror fiction","Dark fantasy"],
    "publishedAt": "1954",
    "cost":3453,
    "isBestSeller":true
},
{
    "title":"Lord of the ring:The Two Towers",
    "publication":"Viking Press",
    "authors": ["JRR Tolkien"],
    "category":["Fiction","Adventure"],
    "publishedAt": "1954",
    "cost":345,
    "isBestSeller":true
},
{
    "title":"The Talisman",
    "publication":"Viking Press",
    "authors": ["JRR Tolkien"],
    "category":["Fiction","Adventure"],
    "publishedAt": "1955",
    "cost":3884,
    "isBestSeller":true
},
{
    "title":"Lord of the ring:The Return of the King",
    "publication":"Viking Press",
    "authors": ["JRR Tolkien"],
    "category":["Fiction","Adventure"],
    "publishedAt": "1955",
    "cost":7633,
    "isBestSeller":true
},

{
    "title":"Harry Potter and the Philosopher's Stone",
    "publication":"Viking Press",
    "authors": ["JK Rowling"],
    "category":["Fantasy"],
    "publishedAt": "1997",
    "cost":3453,
    "isBestSeller":true
},
{
    "title":"Harry Potter and the Chamber of Secrets",
    "publication":"Viking Press",
    "authors": ["JK Rowling"],
    "category":["Fantasy"],
    "publishedAt": "1998",
    "cost":1312,
    "isBestSeller":true
},
{
    "title":"Harry Potter and the Prisoner of Azkaban",
    "publication":"Viking Press",
    "authors": ["JK Rowling"],
    "category":["Fantasy"],
    "publishedAt": "1999",
    "cost":553,
    "isBestSeller":true
},
{
    "title":"Harry Potter and the Goblet of Fire",
    "publication":"Viking Press",
    "authors": ["JK Rowling"],
    "category":["Fantasy"],
    "publishedAt": "2000",
    "cost":435,
    "isBestSeller":true
}
    
]


module.exports.insertAllBooks= async()=>{
    try{
        const books= await BookSchema.insertMany(allBooks);
        return{
            err:false,
            books:books
        }
    }catch(err){
        console.log(err);
        return{
            err:true,
            msg:'Failed to insert all books in library'
        }
    }

}


module.exports.addBook = async ({title, publication, authors, category, publishedAt,cost, isBestSeller})=>{  
    try{
        var book= BookSchema.create({
            _id: new mongoose.Types.ObjectId(),
            title:title,
            publication:publication,
            authors: authors,
            category:category,
            publishedAt: new Date(publishedAt),
            cost:cost,
            isBestSeller:isBestSeller
        });
    
       

        return{
            err:false,
            msg:`${title} added to Library`
        }
    }catch(err){
        console.log(err);
        return {
            err:true,
            msg:`${title} failed to added in Library`
        }
    }
    


}

module.exports.getBooksByAuthors= async ({authorList})=>{
    try{
        const books = await BookSchema.find({authors:{$in:authorList}});
        return {
            err:false,
            books:books
        }
    }catch(err){
        return {
            err:true,
            msg:err
        }
    }
   
}

module.exports.getBooksByMultipleAuthors= async()=>{
    try{
        const books = await BookSchema.find({authors : {$exists:true}, $where:"this.authors.length>1"});
        return {
            err:false,
            books:books
        }
    }catch(err){
        console.log(err);
        return{
            err:true,
            msg:'Failed to get book by multiple authors'
        }
    }

}


module.exports.getAllBooksByPublishedYear =async ({date})=>{
    try{
        const pubDate= new Date(date).getFullYear;
        
        const currDate= new Date(Date.now());
        const books = await BookSchema.find({"publishedAt":{"$":pubDate}, "publishedAt":{"$lt":{"$year":currDate}}});
        console.log(books)
    }catch(err){
        console.log(err);
        return null;
    }
}


module.exports.getBooksByCost =async ({max,min})=>{
    try{
        const books= await BookSchema.find({"cost":{"$lte":max, "$gte":min}});
        return {
            err:false,
            books:books
        }
    }catch(err){
        return{
            err:true,
            msg:err
        }
    }
    
    
}


module.exports.updateBookCostByCategory= async({categoies})=>{
   try{
    var allBooks= await BookSchema.find({category:{"$in":categoies}});
    allBooks.forEach(book=>{
        console.log(book.get('_id') + " "+book.get('cost'))

        BookSchema.findOneAndUpdate(
            {_id:book.get('_id')},
            {cost:book.get('cost')+100},
            {useFindAndModify: false}
        ).exec();

    })

    return {
        err:false,
        msg:'All prices updated!!'
    }
   }catch(err){
       console.log(err);
    return {

        err:true,
        msg:'Price updation failed'
    }
   }
   
}

module.exports.getBooksCost= async ()=>{
   try{
    const books= await BookSchema.find({});
   
    const total= books.reduce((cost, totalCost)=>{ return cost.get('cost')+ totalCost.get('cost') });
     
     return {
         err:false,
         "avgPrice":total/(books.length)
     }
   }catch(err){ 
        return{
            err:true,
            msg:err
        }
   }


}


module.exports.deleteBooks= async ({bookTitle})=>{
    //Lord of the ring
    
    try{
        const books= await BookSchema.deleteMany({"title":{$regex:new RegExp("^"+bookTitle,'gi')}}).exec();
        return{
            err:false,
            msg:`All books with title ${bookTitle} removed!!`
        }
    }catch(err){
        console.log(err);
        return{
            err:true,
            msg:err
        }
    }
}













