$(document).ready(function () {
    if(window.location.hash){
       document.cookie = "access_token="+window.location.hash;
       document.location="index.html";     
    }else{
       checkCookie();
    }
  
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

checkCookie = function() {
    var token=getCookie("access_token");
    if (token!= "") {
        alert("Welcome again " + token);
    } 
}
