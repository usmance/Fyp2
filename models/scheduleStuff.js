var mongoose= require('mongoose');
//creating schema 
var scdSchema=mongoose.Schema({
    Job:{
        type:Number,
        required:true
    },
    Operation:
    {
        type:Number,
        required:true
    },
    Machine:

    {
        type:Number,
        required:true
    },
    Opcode:
    {
        type:Number,
        required:true
    },

    ST:
    {
        type:Number,
        required:true
    },
    ET:
    {
        type:Number,
        required:true
    },
    st_Min:
    {
        type:Number,
        required:true
    },
    et_Min:
    {
        type:Number,
        required:true
    },
    progress:
    {
        type:Number,
        required:true
    }
   
} ,{ collection : 'scheduleData' })

var scheduleData=module.exports=mongoose.model('scheduleData',scdSchema);

module.exports.getScdStuff=function(callback,limit){
    scheduleData.find(callback).lean().limit(limit);
}