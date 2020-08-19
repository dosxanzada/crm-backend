var Tasks = require('../models/Tasks')
var Users = require('../models/Users')

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/diplom');

var tasksCollection = [
   {
        title: 'Title',
        body: 'Body',
        deadline: new Date(),
        state: 0
    }
];

Users.findOne({login: 'admin'}, (err, user)=>{
    console.log('User : '+ user)
    if(err){
        console.log(err);
    }
    tasksCollection.forEach((item, index) => {
        const newTask = new Tasks(item);
        newTask.fromUserId = user._id;
        newTask.toUserId = user._id;
        newTask.save((err, task) => {
            if(err){
                console.log(err);
            }
        });
    })})

function exit(){
    mongoose.disconnect();
}

