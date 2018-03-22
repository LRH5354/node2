$(document).ready(function () {
   $.ajax({
        url:'/more?start=1',
        type:'GET',
        success:function (result) {
            console.log(result)
        },
        err:function () {
            console.log("fail")
        }
    })
})
