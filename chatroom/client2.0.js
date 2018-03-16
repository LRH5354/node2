var net=require('net');
var client=net.createConnection({
    port:3000
});
var username;

client.on('connect',function(){
    console.log('连接成功，请输入您的名字：')
    process.stdin.on('data',function (data) {
        //判断username是否存在  不存在进行注册 该客户端存在用户名 则跳该步骤直接进行 广播消息发送 或者p2p信息发送
        if(!username){
            var send={
                type:'signup',
                username:data.toString().trim()
            }
            client.write(JSON.stringify(send));
            return ;
        }

        var message=data.toString().trim();
        var tempmess=message.split(':');
        //信息中不含':' 所以判定为群发消息
        if(tempmess.length===1){
            var send={
                type:'broadcast',
                from:username,
                message:tempmess[0]
            }
            client.write(JSON.stringify(send))
        }else{
            //此时为p2p消息发送
            var send={
                type:'p2p',
                from:username,
                to:tempmess[0],
                message:tempmess[1]
            }
            client.write(JSON.stringify(send));
        }
    })
})

client.on('data',function(data){

    var backdata=JSON.parse(data);

    if(backdata.code==='0001'){
        username=backdata.username;
        console.log(backdata.username+'用户名注册成功！！')
    }else if(backdata.code==='0002'){
        console.log(backdata.username+' 用户名已存在！！！')
    }else if(backdata.type==='broadcast'){
        console.log(backdata.from+'：'+backdata.message);
    }else if(backdata.type==='p2p'){
        console.log(backdata.from+'对你说：'+backdata.message)
    }else{
        console.log('公告信息：'+backdata.message)
    }
})