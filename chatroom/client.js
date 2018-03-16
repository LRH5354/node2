var net=require('net');
var client=net.createConnection({
    port:3000
});
client.on('connect',function(){
    console.log('连接成功')
    process.stdin.on('data',function (data) {
        client.write(data);
    })
})
client.on('data',function(data){
    console.log(data.toString().trim())
})