var socket = require('socket.io');
var mg = require('mongoose');
const Queue = require('../models/Queue.js');

function init(server){
    io = socket(server);

    io.on('connection', (socket)=>{
        console.log('User Connected.');
        console.log(socket.id);
        
        socket.on('queue-up', (data)=>{
     
            var newQueuer = new Queue({
                _id: new mg.Types.ObjectId(),
                user_id: data.user_id
            });
    
            newQueuer.save()
                .then(result =>{
                    console.log(result);
                })
                .catch(err =>{
                    if(err.code == 11000){
                        console.log('User is already in Queue...');
                    }
                });
        });
    });
}

module.exports = {
    init
}