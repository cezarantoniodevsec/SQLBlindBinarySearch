var porta    = 3002;
var socket   = io("http://localhost:"+ porta);
var baseURL  = 'http://localhost:'+ porta +'/v1/';

function envia(msg)
{
    socket.emit('messageBroadcast',msg);
}

socket.on('messageBroadcast', function(msg)
{    
  if(msg==="FIM"){
    $("#result").text("Fim de execução.");
  }else {
    $("#result").text(msg);   
    enviaPing();
  }  
});

function enviaPing(){
  setTimeout(envia('ping'), 500000);
} 