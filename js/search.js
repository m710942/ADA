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
	var value = $("#query").text();
	$.ajax("https://api.instagram.com/v1/tags/"+value+"/media/recent?access_token="+token, {jsonp: "callback", jsonpCallback: "onMessageReceived"});
}

onMessageReceived = function(response){
	var data = response.data;
	var results = $("#results");
	results.html = "";
	for(var i = 0; i < data.length; i++){
		if(data[i].type === "image"){
			results.append("<img src='"+data[i].images.thumbnail.url+"' height='"+data[i].images.thumbnail.height+"' width='"+data[i].images.thumbnail.width+"'>");
		}

	}
}
