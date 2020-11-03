const { TooManyRequests } = require("http-errors");

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema= new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:{type:String,required:true},
    publication: {type:String, required:true},
    authors: {type:[String], required:true},
    category:{type:[String],required:true},
    publishedAt: {type:Date, required:true},
    createdAt: {type:Date, required:true, default:Date.now},
    updatedAt: {type:Date, required:true,default:Date.now},
    cost:{type:Number, required:true},
    isBestSeller:{type:Boolean, required:true, default:false}

});

module.exports= mongoose.model('book',bookSchema,'library');


//Title, Publication, Author, category, publishedAt, createdAt, updatedAt, cost, isBestSeller