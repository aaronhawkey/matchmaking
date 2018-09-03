const express = require('express');
const socket = require('socket.io');
const mg = require('mongoose');
const Queue = require('./models/Queue.js');
const Secrets = require('./secrets.json');

mg.connect('mongodb://'+ Secrets.database.username +':'+ Secrets.database.password +'@ds137812.mlab.com:37812/matchmaking', {
    useNewUrlParser: true
});

const app = express();

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
