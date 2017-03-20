/**
 * Created by Dani on 16.03.2017.
 */

$(document).ready(function () {
    const socket = io.connect();

    socket.on('answerUpdate', function (data){
        location.reload();
    });
});