//html event처리와 실시간 통신을 하는 함수부
function send(){
    alert("메시지 전송을 시작하였습니다.");
    sendMessage();
}
var sendMessage = function(){
    var socket = io.connect("http://localhost:3010");

    socket.emit('hompageMessage', 'Occur');
}