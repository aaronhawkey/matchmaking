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
        
        // Querying user_id to see if already in Queue
        result = Queue.findOne({user_id: data.user_id}, (err, queue)=>{
            if(err){
                console.log(err);
            }
        });
        
        // Checks to see if query came back.
        if(!result){
            var newQueuer = new Queue({
                _id: new mg.Types.ObjectId(),
                user_id: data.user_id
            });
    
            newQueuer.save()
                .then(result =>{
                    console.log(result);
                })
                .catch(err =>{
                    console.log(err);
                })
        }else{
            // User already exists.
            console.log('User already exists');
        }
    });
});
