var net =require('net');
var server=net.createServer();

var users=[];
//server绑定connection事件
server.on('connection',function (socket) {
    console.log('有新连接出现');
    users.push(socket);
//告诉已经连接服务器的其他客户端有新的客户端连接上来

    users.forEach(function(client) {
        if(client!==socket)
        client.write(socket.remoteAddress + ':' + socket.remotePort + '已连接上服务器')
    });
    //监控每个socket的数据 并将其发布到每个客户端的socket
    socket.on('data',function (data) {
        console.log(socket.remotePort,':',data.toString().trim())
        users.forEach(function(client){
            if(client!==socket)
            client.write(socket.remotePort+':'+data)
        })
    });

    //监控每个客户端的错误推出事件 提供函数处理
    socket.on('error',function() {
        console.log('有客户端退出了！！！')
    })

    //这是一个服务端发布公告的输入接口
    process.stdin.on('data',function (data) {
        socket.write("公告："+data);
    });
})

//server绑定事件listening
server.on('listening',function(){
    console.log('正在监听3000端口》》')
});

server.listen(3000,'127.0.0.1');