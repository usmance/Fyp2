var mongoose= require('mongoose');
//creating schema 
var bookSchema=mongoose.Schema({
    xyz:{
        type:Number,
        required:true
    },
})

var Book=module.exports=mongoose.model('Book',bookSchema);

module.exports.getBooks=function(callback,limit){
    Book.find(callback).limit(limit)
}