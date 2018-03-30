$(document).ready(function () {
//    $.ajax({
//         url:'/query?where=select count(id) as counts from doubanmovie_info ',
//         type:'GET',
//         success:function (result) {
//         console.log(result)
//     },
//     err:function () {
//         console.log("fail")
//     }
// })

    $('.pagination .page-item').on('click',function (param) {
        console.log(this)
    })

    $('.more button').on('click',function () {
        //修改此处的where参数能该查询的结果
       var type=$(this).attr('tp');
       var start=$(this).attr('start');
       var end=parseInt(start)+10;
       var url;
       switch (type){
           case '首页' : url='/query?where=SELECT  * FROM doubanmovie_info  LIMIT ' +end+','+ 10;
           break;
           case  '电影': url='/query?where=SELECT  * FROM doubanmovie_info where tags= \'电影\' LIMIT '+end +','+ 10;
           break;
           case '电视剧':url='/query?where=SELECT  * FROM doubanmovie_info where tags=\'电视剧\' LIMIT '+end+','+10;
           break;
           case '动画' :url='/query?where=SELECT  * FROM doubanmovie_info where tags= \'动漫\' LIMIT '+end+','+10;
           break;
       }

        $.ajax({
                url:url,
            type:'GET',
            success:function (result) {
                var data=JSON.parse(result)
                for(var i=0;i<data.length;i++){
                    var innerhtml= "<li class='list-group-item list-group-item-light'> " +
                        "<div class='text-center row'> " +
                        "<div class='col'><a target='_blank'  href=./click-m?title="+data[i]._title + "><h5>"+ data[i]._title+ "</h5></a></div> " +
                        "<div class='col'><h5>" + data[i]._director+"</h5></div> " +
                        "<div class='col'><h5>"+ data[i]._casts+"</h5></div> " +
                        "<div class='col'><h5>"+ data[i]._rate+"</h5></div> " +
                        "<div class='col'><h5>"+ data[i].tags+"</h5></div> " +
                        "</div> </li>";
                    $('.list-group').append(innerhtml);
                }
                $('.more button').attr('start',end);
            },
            err:function () {
                console.log("fail")
            }
        })
    })

})
