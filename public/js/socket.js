$(document).ready(function () {
    const socket = io.connect();

    socket.on('answerUpdate', function (data){
        location.reload();
    });

    /*socket.on('realtime', function (data){
        $('#test').text('YES!!');
        $('#ul').append($('<li>').text(data));
        window.scrollTo(0, document.body.scrollHeight);
    });

    $('#senden').click(senden);

    function senden(){
        socket.emit('realtime', 'Jetzt?');
    }*/
});
