const mg = require('mongoose');
var Schema = mg.Schema;
const connection = 'mongodb://admin:5rdxdr5#1@ds137812.mlab.com:37812/matchmaking';

var queueSchema = new Schema({
    user_id: Number,
    MMR: Number,
    start_time: { type: Date, default: Date.now },
    socket: String
});

var Queue = connection.model('Queue', queueSchema);

