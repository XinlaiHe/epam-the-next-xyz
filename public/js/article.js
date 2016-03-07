$(function(){

  var path = window.location.href;
  var arr = path.split("/");
  var id = arr[arr.length-1];
  $.ajax({
    method : "GET",
    url : "/api/articles/"+ id,
    success : function(data){
        $('#individual').append(
            "<div class='panel-heading'>"
              +"<h3 class='panel-title'>"+data.title+"</h3>"
            +"</div>"
            +"<img width='100%' src='"+data.image+"'/>"
            +"<p>"+data.summary+"</p>"
            +"<button class='btn btn-primary' onclick='showUpdateBox("+JSON.stringify(data)+")'>Update</button>"
            +"<button class='btn btn-warning' onclick='deleteArticle("+data.id+")'>Delete</button>"
          );
    }
  })
});
function showUpdateBox(data){

  $(".updatebox").css("display" , "block");
  $('.updatebox form').attr('action', '/api/articles/' + data.id);
  $("#title").val(data.title);
  $("#summary").val(data.summary);
  $("#date").val(data.date);
  $("#author").val(data.author);
  $("#image").val(data.image);

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