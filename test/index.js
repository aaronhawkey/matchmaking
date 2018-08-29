var queueUp = document.getElementById('queue-up');


queueUp.addEventListener('click', ()=>{
    var socket = openSocketConnection();
    socket.emit('queue-up', {
        user_id: 5,
        credentials: 'asdnwionanasdpjwf'
    });

    queueUp.style.visibility='hidden';
});



var openSocketConnection  = function(){
    var socket = io.connect("http://localhost:5000");
    return socket;
}