var express=require('express');
var app=express();
var bodyParser=require('body-parser')
var mongoose=require('mongoose')
var moment=require('moment')

mongoose.connect('mongodb://localhost/fypz')
var db=mongoose.connection;
app.use(express.static(__dirname + "/"));
Genre =require('./models/genre.js');
ScheduleData =require('./models/scheduleStuff.js');
Book=require('./models/book.js');
app.use(bodyParser.urlencoded({ extended: false }))
const deepcopy = require('deepcopy');


app.use(bodyParser.json())
app.get('/',function(req,res){
    res.send('Hello World!');
})
app.get('/api/genres',function(req,res)
{
    Genre.getGenres(function(err,genres){
        if(err){
            throw(err);
        }
        else
        {
            res.json(genres);
        }
    })
})
dataForProcessing=[];p=[]
Test2={ 
    "data":[
       {
        "Job": 7,
        "Operation": 0,
        "Machine": 0,
        "OpCode": 0,
        "ST": 0,
        "ET": 36,
        "Duration": 36,
        "st_Min": 0,
        "et_Min": 3.6,
        "progress": 0,
        "start_date": "02-03-2018 09:00:00",
        "end_date": "02-03-2018 09:36:00",
        "text": "J-7 Op-0 M-0",
        "id": 10,
        "type":1

       },
    //    {
    //        "id":"2",
    //        "start_date":"2018-03-02 10:00",
    //        "end_date":"2018-03-02 12:00",
    //        "text":"and me!",
    //        "type":"2"
    //    },
    //    {
    //        "id":"3",
    //        "start_date":"2018-03-02 09:00",
    //        "end_date":"2018-03-02 17:00",
    //        "text":"and me too!",
    //        "type":"3"
    //    },
    //    { 
    //        "id":"4",
    //        "start_date":"2018-03-02 08:00",
    //        "end_date":"2018-03-02 14:10",
    //        "text":"Type 2 event",
    //        "type":"2"
    //    }
    ], 
    "collections": {
       "sections":[
          {"value":"1","label":"M1"},
          {"value":"2","label":"M2"},
          {"value":"3","label":"M3"}
       ]
    }
 }
app.get('/api/scd',function(req,res)
{var dataToSendAPI=[];
    var Delay=[];
    
        ScheduleData.getScdStuff(function(err,scheduleDatas){
            if(err){
                throw(err);
            }
            else
            {
                dothis('completed',scheduleDatas,function()
                {
                    dataForProcessing=scheduleDatas;
                   
                    for(var i=0; i<dataForProcessing.length;i++)
                    {
                        //Setting the time stuff.
                        // dataForProcessing[i].ST=dataForProcessing[i].ST*15;
                        dataForProcessing[i].start_date="01-01-2020 09:00:00"
                        dataForProcessing[i].end_date="01-01-2020 09:00:00"
                        var temp=moment(dataForProcessing[i].start_date,"DD-MM-YYYY HH:mm:ss");
                        dataForProcessing[i].start_date=temp.add(dataForProcessing[i].ST,'minutes')
                        dataForProcessing[i].start_date=moment(temp).format("DD-MM-YYYY HH:mm:ss")
                        // console.log('Start -Date:  ',dataForProcessing[i].start_date);

                        //Setting End Date;

                        var temp2=moment(dataForProcessing[i].start_date,"DD-MM-YYYY HH:mm:ss");
                        temp2=temp2.add(dataForProcessing[i].Duration,"minutes");
                        dataForProcessing[i].end_date=moment(temp2).format("DD-MM-YYYY HH:mm:ss")
                        // console.log('End -Date:  ',dataForProcessing[i].end_date);
                        
                       //Shukar Alhamdullilah

                       dataForProcessing[i].text="J-"+dataForProcessing[i].Job+" Op-"+dataForProcessing[i].Operation+" M-"+dataForProcessing[i].Machine
                       dataForProcessing[i]["id"]=i+10;
                      
                       delete dataForProcessing[i]["_id"];
                       
                       //Setting the type variable.
                       dataForProcessing[i]["type"]=dataForProcessing[i].Machine+1;


                       //Time Stuff set complete.
                    //    if (dataForProcessing[i].Machine==0)
                    //    {
                        dataToSendAPI.push(dataForProcessing[i])
                    //    }
                       
                       
                    }
                    
                    doThat(dataToSendAPI,function()
                    {   
                        // dataToSendAPI=dataForProcessing;
                        var collections= 
                        {
                             "sections":[
                                {"value":"1","label":"Machine-0"},
                                {"value":"11","label":"Machine-0 -- Realtime"},
                                {"value":"2","label":"Machine-1"},
                                {"value":"12","label":"Machine-1 -- Realtime"},
                                {"value":"3","label":"Machine-2"},
                                {"value":"13","label":"Machine-2 -- Realtime"},
                                {"value":"4","label":"Machine-3"},
                                {"value":"14","label":"Machine-3 -- Realtime"},
                                {"value":"5","label":"Machine-4"},
                                {"value":"15","label":"Machine-4 -- Realtime"},
                                {"value":"6","label":"Machine-5"},
                                {"value":"16","label":"Machine-5 -- Realtime"},
                                {"value":"7","label":"Machine-6"},
                                {"value":"17","label":"Machine-6 -- Realtime"},
                                {"value":"8","label":"Machine-7"},
                                {"value":"18","label":"Machine-7 -- Realtime"},
                                {"value":"9","label":"Machine-8"},
                                {"value":"19","label":"Machine-8 -- Realtime"},
                                {"value":"10","label":"Machine-9"},
                                {"value":"20","label":"Machine-9 -- Realtime"}


                               
                               
                                
                             
                                
                               
                                
                                
                                
                             ]
                         }
                        var dataApi={"data":dataToSendAPI,collections};
                        // res.send(dataApi)

                      
                        res.send(dataApi)
                    })

                })
               
            }
        })

        
})

app.get('/api/test',(req,res)=>
{
    res.send(Test2);
})
function dothis(text,scd,callback)
{
    console.log(text);
    callback();
}
function doThat(scd,callback)
{
    callback();
}
function LoadDelayedSchedule(scd, callback)
{
    callback();
}
function printTime(start_dateInput,startOfProcess,duration)
{
    var start_date= start_dateInput;
    var end_date;
    var duration =duration;   
    //Setting the start time according to the schedule
    var temp=moment(start_date,"DD-MM-YYYY HH:mm:ss");
    temp=temp.add(startOfProcess,'minutes')
    start_date=moment(temp).format("DD-MM-YYYY HH:mm:ss");

    //Setting the endtime according to the schedule
    console.log(start_date);

    //Main issue exist here
    
    var temp2=moment(start_date,"DD-MM-YYYY HH:mm:ss");
    temp2=temp2.add(duration,'minutes');
    console.log(temp2);
    
    end_date=moment(temp2).format("DD-MM-YYYY HH:mm:ss");
    // return [start_date,end_date];
    console.log('StartTime --> ',start_date);
    console.log('EndTime --> ',end_date);
}










app.get('/api/book',function(req,res)
{
    Book.getBooks(function(err,books){
        if(err){
            throw(err);
        }
        else
        {
            res.json(books);
        }
    })
})
app.listen(3000)
console.log('App running on Port 3000');
