$(document).ready(function () {
   $("#busca").on("click", function(ev){
   	var token = getCookie("access_token");
   	if(!token){
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
	var value = $("#query").text();
	$.ajax("https://api.instagram.com/v1/tags/"+value+"/media/recent?access_token="+token, {jsonp: "callback", jsonpCallback: "onMessageReceived"});
}

onMessageReceived = function(response){
	var data = response.data;
	var results = $("#results");
	results.clear();
	for(var i = 0; i < data.length; i++){
		if(data[i].type === "image"){
      results.append("<div class='thumbnail'><img src='"+data[i].images.thumbnail.url+"' height='"+data[i].images.thumbnail.height+"' width='"+data[i].images.thumbnail.width+"'><div class='caption' id='img_"+data[i].images.thumbnail.url+"'>"+ analyze(data[i].images.thumbnail.url)+"</div>");
		}

	}


}


analyze = function(url){

        var key = $("#key").text();
        var params = {
            // Request parameters
            "visualFeatures": "Categories, Description"
        };
      
        $.ajax({
            url: "https://api.projectoxford.ai/vision/v1.0/analyze?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","{subscription key}");
            },
            type: "POST",
            // Request body
            data: {"url": url},
        })
        .done(function(data) {
            $("img_"+url).append(data);
        })
        .fail(function() {
            alert("error");
        });
}
