$(function(){

    $.ajax({
        method : "GET",
        url : "api/articles",
        success : function(data){

            $.each(data,function(index,value){
                  $("#content").append("<div class='col-md-4'>"
                                          +"<p class='text-center img'>"+ value.title +"</p>"
                                          +"<img class='media-object' width='100%' height='100%' src='"+ value.image + "'/>"
                                          +"<p class='text-center'>"+value.summary+"</p>"
                                      +"</div>");
            })
        }

    });
  })