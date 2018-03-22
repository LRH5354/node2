var net =require('net');
var server=net.createServer();
var client=[]; //用户名为键  socket为值
var users=[];
var count=0;
//server绑定connection事件
server.on('connection',function (socket) {
    count++;
    console.log('有新连接出现,当前人数：',count);

    users[socket.remotePort]=socket;
    //告诉已经连接服务器的其他客户端有新的客户端连接上来
    var message={
        ip:socket.remoteAddress,
        port:socket.remotePort,
        message:socket.remoteAddress+':'+socket.remotePort+'用户已上线'
    }
    users.forEach(function(client) {
        if(client!==socket)
            client.write(JSON.stringify(message));
    });
    //监控每个socket的数据 并将其发布到每个客户端的socket
    socket.on('data',function (data) {

        console.log(JSON.parse(data)) //测试输出客户端输入

        var data=JSON.parse(data);
        if(data.type==='signup'){
            if(!client[data.username]){
                client[data.username]=socket;
                var back={
                    code:'0001',
                    username:data.username
                };
                socket.write(JSON.stringify(back));
            }else {
                var back={
                    code:'0002',
                    username:data.username
                }
                socket.write(JSON.stringify(back))
            }
        }else if(data.type==='broadcast'){

            users.forEach(function (client) {
                if(client!==socket){
                    client.write(JSON.stringify(data));
                }
            })
        }else  if(data.type==='p2p'){
            if(!client[data.to]){
                console.log('该用户不存在！')
            }
            client[data.to].write(JSON.stringify(data));
        }


    });

    //监控每个客户端的错误推出事件 提供函数处理
    socket.on('error',function(err) {
        count--;
        //删除已经关闭的socket连接 否则会重复出发err事件
        console.log(err)
        delete users[socket.remotePort];
        console.log('有客户端退出了！！当前人数：',count);
    })

})

//server绑定事件listening
server.on('listening',function(){
    console.log('正在监听3000端口》》')
});


//这是一个服务端发布公告的输入接口
process.stdin.on('data',function (data) {
    var send={
        type:'othor',
        message:data.toString().trim()
    }
    users.forEach(function (client) {
        client.write(JSON.stringify(send));
    })
});

server.listen(3000);