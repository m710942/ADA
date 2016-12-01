var MEDIA = MEDIA || {};


MEDIA.decorate_ig = function(media, json){
	media.captions = {};
	media.captions.user = json.caption || {text: "---"};
	media.tags = json.tags || [];
	media.comments = json.comments || {count: 0};
	media.likes = json.likes || {count: 0};
	media.standard_resolution = json.images.standard_resolution;
	media.thumbnail = json.images.thumbnail;
	media.id = json.id;
	media.type	= json.type;
	var timestamp = parseInt(json.created_time);
	if(isNaN(timestamp)){
		media.created = new Date(timestamp);	
	}else{
		media.created = new Date();
	}
	

	return media;
};

MEDIA.decorate_ms = function(media, json){
	media.captions.analysis = json.description.captions;
	media.color = json.color;
	media.people = json.faces;
	if(media.people.length === 1){
		media.type = "Selfie";
	} 
	media.clazz = json.tags;
	media.tags = media.tags.concat(json.description.tags);
	var rgb = hexToRgb("#"+json.color.accentColor);
	media.color.r = rgb.r;
	media.color.g = rgb.g;
	media.color.b = rgb.b;
	var hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
	media.color.h = hsl[0];
	media.color.s = hsl[1];
	media.color.l = hsl[2];
	return media;
};

function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}