var FORMAT = FORMAT || {};

FORMAT.newMedia = function(media){
	var template = ["<div class='col-md-6'>",
					"<ul class='media-list'>",
					"<div class='well'>", 
					"<li class='media'>",
					"<div class='row'>",
					"<div class='col-sm-4'>",
					"<div class='media-left media-middle'>",
					"<a href='"+media.standard_resolution.url+"' donwload=''>",
					"<img class='media-object img-rounded' style='padding-left:1px;' src='"+ media.thumbnail.url+ "alt='...' height='"+media.thumbnail.height+"px' width='"+media.thumbnail.width+"px'>",
					"</a>",
					"</div>",
					"<div class='btn-group' role='group'>",
					"<button type='button' class='btn btn-default'><span class='glyphicon glyphicon-tags' aria-hidden='true'></span><span id='tag_count_"+media.id+"'> "+media.tags.length+" </span></button>",
					"<button type='button' class='btn btn-default'><span class='glyphicon glyphicon-thumbs-up' aria-hidden='true'></span><span id='like_count_"+media.id+"'> "+media.likes.count+" </span></button>",
					"<button type='button' class='btn btn-default'><span class='glyphicon glyphicon-comment' aria-hidden='true'></span><span id='media_count_"+media.id+"'> "+media.comments.count+" </span></button>",
					"</div>",
					"<div id='tag_pool_"+media.id+"'>",
					"</div>",
					"</div>",
					"<div class='col-sm-8'>",
					"<div class='media-body'>",
					"<div class='list-group'>",
					"<a  class='list-group-item'>",
					"<strong>User comments</strong>",
					"<p class='list-group-item-text'>"+media.captions.user.text+"</p>",
					"</a>",
					"<a  class='list-group-item'>",
					"<strong>Image analysis</strong>",
					"<p class='list-group-item-text'>"+media.captions.analysis[0].text+"</p>",
					"</a>",
					"<a  class='list-group-item'>",
					"<strong>Media type</strong>",
                    "<p class='list-group-item-text'>"+media.type+"</p>",
                    "</a>",
                    "<a  class='list-group-item'>",
                    "<strong>Accent / Predominant color</strong>",
                    "<p class='list-group-item-text'>",
                    "<span style='background-color: #"+media.color.accentColor+";' class='dominant-color'> </span>",
                    "</p>",
                    "</a>",
                    "<a data-toggle='collapse' href='#people_section_"+media.id+"' class='list-group-item'>",
                    "<strong>People <span class='caret'></span></strong>",
                    "<p id='people_section_"+media.id+"' class='collapse list-group-item-text'>",
                    "</p>",
                    "</a>",
                    "<a data-toggle='collapse' href='#media_clazz_"+media.id+"' class='list-group-item'>",
                    "<strong> Classification <span class='caret'></span></strong>",
                    "<p class='list-group-item-text'>",
                    "<div id='media_clazz_"+media.id+"' class='collapse'></div>",
                    "</p>",
                    "</a>",
                    "</div>",
                    "</div>",
                    "</div>",
                    "</div>",
                    "</li>",
                    "</div>",
                    "</ul>",
                    "</div>"
					];

                 return template.join("");                        
};

FORMAT.getTags = function(media){
	var template = [];
	for(var i = 0; i < media.tags.length; i++){
		template.push("<a >#"+media.tags[i]+"</a>");
	}
	return template.join("\n");
};

FORMAT.getPeople = function(media){
	var male = 0;
	var female = 0;
	var min = 10000;
	var max = -1;
	var avg = 0;

	for(var i = 0; i < media.people.length; i++){
		if(media.people[i].gender === "Male"){
			male++;
		}else if(media.people[i].gender === "Female"){
			female++;
		} 

		if(media.people[i].age > max){
			max = media.people[i].age;
		}

		if(media.people[i].age < min){
			min = media.people[i].age;
		}
		avg+= media.people[i].age;
	}

		media.people.min = min;
		media.people.max = max;
		media.people.avg = avg/media.people.length;
		media.people.count = media.people.length;
		media.people.male = male;
		media.people.female = male;

	if(male === 0 && female === 0){
		media.people.min = 0;
		media.people.max = 0;
		media.people.avg = 0;
		return "No people detected";
	}

	var template = ["<span class='label label-default'>Male <span class='badge'>"+male+"</span></span>",
	"<span class='label label-default'>Female <span class='badge'>"+female+"</span></span>",
	"<span class='label label-default'>Min age <span class='badge'>"+min+"</span></span>",
	"<span class='label label-default'>Max age <span class='badge'>"+max+"</span></span>",
	"<span class='label label-default'>Age avg. <span class='badge'>"+(avg/media.people.length).toFixed(2)+"</span></span>"];

	return template.join("\n");
                                                    
                                                    
                                                    
                                                    
};
FORMAT.getClassification = function(media){

var template = [];
	for(var i = 0; i < media.clazz.length; i++){
		template.push("<div class='progress'>");
		template.push("<div class='progress-bar' role='progressbar' aria-valuemin='0' aria-valuemax='100' style='width:"+media.clazz[i].confidence*100+"%;'>"+media.clazz[i].name);
		if(media.clazz[i].hint){
			template.push("("+media.clazz[i].hint+")")
		}
		template.push("</div>");
		template.push("</div>");
	}
	return template.join("");
};

FORMAT.getTagSuggestion = function(media){
	var template = ["<button onclick=\"$('#query').val('"+media.name+"')\" class='btn btn-default'>",
					"#"+media.name,
					"&nbsp; <span class='badge'>",
					media.media_count,
					"</span>",
					"</button>"];
	return template.join("");
}