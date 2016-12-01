$(document).ready(function () {
  $("#working").hide();
  $("#alert").hide();
   $("#busca").on("click", function(ev){
    $("#results").empty();
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

var MEDIA_RESULTS = [];
var EXPECTED_MEDIA = 0;
var CURRENT_SEARCH = "";
var TOKEN = "";
buscar = function(token){
  CURRENT_SEARCH = $("#query").val();
  TOKEN = token;
  $("#working").show();
  $("#alert").hide();
  $.ajax({url: "https://api.instagram.com/v1/tags/"+CURRENT_SEARCH +"/media/recent?access_token="+TOKEN, type:'GET', dataType:'jsonp',  jsonp:'callback', jsonpCallback:onMessageReceived, success:function(data){
    console.log(data);
    onMessageReceived(data);
  }});
  console.info("done ajax");
}

didYouMean = function(){
  $.ajax("https://api.instagram.com/v1/tags/search?q="+CURRENT_SEARCH +"&access_token="+TOKEN, {success:function(data){
    console.log(data);
    onSuggestionReceived(data);
  }});
}

onSuggestionReceived = function(response){
  var data = response.data;
  if(!data || data.length === 0){
    return;
  }
  var results = $("#results").append("<div id='didYouMean' class='well'> <h3> Did you mean... </h3></div>");
  for(var i = 0; i < data.length; i++){
    $("#didYouMean").append(FORMAT.getTagSuggestion(data[i])+"&nbsp;\n");
  }
  $("#working").hide();
}

noDataBanner = function(){
  $("#alert").show();
  $("#working").hide();
}

var TAGS = {};
onMessageReceived = function(response){
  if(!response){
    return;
  }

  var data = response.data;
  if(!data || data.length === 0){
    noDataBanner();
    didYouMean();
    return;
  }
  EXPECTED_MEDIA = data.length;
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
            MEDIA_RESULTS.push(media);
            display(media);
            if(MEDIA_RESULTS.length === EXPECTED_MEDIA){
               $("#working").hide();
            }
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


var SORT_DIRECTION = true;
reverse = function(){
  $("#results").empty();
  $("#working").show();
 
  if(SORT_DIRECTION){
    $("#sortOrder").html("Descending");
     for(var i = MEDIA_RESULTS.length-1; i > -1 ; i--){
    display(MEDIA_RESULTS[i]);
  }
  }else{
    $("#sortOrder").html("Ascending");
     for(var i = 0; i< MEDIA_RESULTS.length; i++){
    display(MEDIA_RESULTS[i]);
  }
  }
  SORT_DIRECTION = !SORT_DIRECTION;
  $("#working").hide();
}

sort = function(by, field){
  if(by === 'reverse'){
    reverse();
    return;
  }
  $("#results").empty();
  $("#working").show();
  var parentLabel = "";
  var fieldLabel = "";
  var sorter;

  switch(by){
      case "people":
      sorter = SORT.byPeople;
      parentLabel = "People";
          switch(field){
            case "number":
              fieldLabel = "Number of people";
            break;
            case "avg":
              fieldLabel = "Age average";
            break;
            case "gender":
              fieldLabel = "Gender"; 
            break;
          }
      break;
      case "social":
      sorter = SORT.bySocial;
      parentLabel = "Social";
        switch(field){
            case "tags":
            fieldLabel = "Number of tags";
            break;
            case "comments":
            fieldLabel = "Number of comments";
            break;
            case "likes":
            fieldLabel = "Number of likes";
        }
            
      break;
      case "meta":
      sorter = SORT.byMeta;
        parentLabel ="Metadata";
        switch(field){
            case "date":
            fieldLabel = "Date of creation";
            break;
            case "color":
            fieldLabel = "Accent color";
            break;
        }
      break;
      case "confidence":
      parentLabel = "Confidence";
      sorter = SORT.byConfidence;
        switch(field){
            case "analysis":
            fieldLabel = "Analysis";
            break;
            case "classification":
            fieldLabel = "Classification";
            break;
        }
      break;

      
  }  
  
  MEDIA_RESULTS =sorter.apply(null, [MEDIA_RESULTS, field]);
  for(var i = 0; i < MEDIA_RESULTS.length; i++){
    display(MEDIA_RESULTS[i]);
  }

  $("#sortParent").html(parentLabel);
  $("#sortField").html(fieldLabel);
  $("#sortOrder").html("Ascending");
  SORT_DIRECTION = true;

  $("#working").hide();
}
