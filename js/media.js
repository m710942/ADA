var MEDIA = MEDIA || {};


MEDIA.decorate_ig = function(media, json){
	media.captions = {};
	media.captions.user = json.caption;
	media.tags = json.tags;
	media.standard_resolution = json.images.standard_resolution;
	media.thumbnail = json.images.thumbnail;
	media.id = json.id;
	media.type	= json.type;
	media.tags = json.tags;

	return media;
};

MEDIA.decorate_ms = function(media, json){
	media.captions.analysis = json.description.caption;
	media.color = json.color;
	media.people = json.faces;
	media.clazz = json.tags;
	media.tags.push(json.description.tags);

	return media;
};
