$(document).ready(function () {
   $.ajax({
        url:'/query?where=select count(id) as counts from doubanmovie_info ',
        type:'GET',
        success:function (result) {
        console.log(result)
    },
    err:function () {
        console.log("fail")
    }
})

    $('.pagination .page-item').on('click',function (param) {
        console.log(this)
    })
})
