var mongoose= require('mongoose');
//creating schema 
var genreSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    createdDate:

    {
        type:Date,
        default:Date.now
    }
})

var Genre=module.exports=mongoose.model('Genre',genreSchema);

module.exports.getGenres=function(callback,limit){
    Genre.find(callback).limit(limit)
}