const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const UserSchema= new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true},
    createdOn:{type:Date,default:Date.now()}
})

const user= mongoose.model('User',UserSchema,'users')
module.exports= user;

