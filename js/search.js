$(document).ready(function () {
   $("#busca").on("click", function(ev){
    var token = getCookie("access_token");
    if(token){
      buscar(token);  
    }else{
      document.location ="index.html";
    }
      
    });
});


getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}


buscar = function(token){
  var value = $("#query").val();
  $.ajax("https://api.instagram.com/v1/tags/"+value+"/media/recent?access_token="+token, {success:function(data){
    onMessageReceived(data);
  }});
}

var TAGS = {};

onMessageReceived = function(response){
  var data = response.data;
  for(var i = 0; i < data.length; i++){

    if(data[i].type === "image"){
      var media = MEDIA.decorate_ig({}, data[i]);
      analyze(media);
    }

  }


}


analyze = function(media){

        var key = $("#key").val();

      
        $.ajax({
            url: "https://api.projectoxford.ai/vision/v1.0/analyze?visualFeatures=" + "Categories,Description,Tags,Faces,ImageType,Color",
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",key);
            },
            type: "POST",
            // Request body
            data: JSON.stringify({"url": media.standard_resolution.url}),
        })
        .done(function(data) {
            media = MEDIA.decorate_ms(media, data);
            display(media);
        })
        .fail(function() {
            alert("error");
        });
}

display = function(media){
  $("#results").append(FORMAT.newMedia(media));
  $("#tag_pool_"+media.id).append(FORMAT.getTags(media));
  $("#people_section_"+media.id).append(FORMAT.getPeople(media));
  $("#media_clazz_"+media.id).append(FORMAT.getClassification(media));
}
