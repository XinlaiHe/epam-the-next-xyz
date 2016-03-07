$(function(){

  var path = window.location.href;
  var arr = path.split("/");
  var id = arr[arr.length-1];
  $.ajax({
    method : "GET",
    url : "/api/articles/"+ id,
    success : function(data){
        $('.panel.panel-default').append(
            "<div class='panel-heading'>"
              +"<h3 class='panel-title'>"+data.title+"</h3>"
            +"</div>"
            +"<img width='100%' src='"+data.image+"'/>"
            +"<p>"+data.summary+"</p>"
            +"<button class='btn btn-primary' onclick='showUpdateBox("+data.id+")'>Update</button>"
            +"<button class='btn btn-warning' onclick='deleteArticle("+data.id+")'>Delete</button>"
          );
    }
  })
});
function showUpdateBox(d){
  console.log(d);
}
function deleteArticle(id){
   $.ajax({
      method : "DELETE",
      url : "/api/articles/"+ id,
      success : function(data){
          window.location.href="/";
      }
    })
}