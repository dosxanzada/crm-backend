var User = require('../models/Users')
var mongoose = require('mongoose')
mongoose.connect('localhost:27017/diplom')

var users = [
    new User({
        fullname: 'F User',
        email: 'custom@gmail.com',
        login: 'custom'
    }),
    new User({
        fullname: 'F User2',
        email: 'custom2@gmail.com',
        login: 'custom2'
    })
];


users.forEach((item, index) => item.save((err, user) => {
    if (err) {
        console.log(err)
        return exit()
    }
    console.log(`saved: ${user.fullname}`)    
    if (index + 1 === users.length) exit()
}))

function exit(){
    mongoose.disconnect();
}

