const express = require('express');
const socket = require('socket.io');


const app = express()

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req,res) =>{
    res.render('index');
});

var server = app.listen(5000, ()=>{
    console.log('Live on port 5000');
});

var io = socket(server);

io.on('connection', (socket)=>{
    console.log('User Connected.');
    console.log(socket.id);
    
    socket.on('queue-up', (data)=>{
        console.log(data.user_id);
    });

});
