var SORT = SORT|| {};

SORT.byPeople = function(mediaArray, field){
	if(field ==='number'){
		return mediaArray.sort(function(mediaA, mediaB){
			return mediaA.people.length - mediaB.people.length;
		});
	}
	if(field === 'avg'){
		return mediaArray.sort(function(mediaA, mediaB){
			return mediaA.people.avg - mediaB.people.avg;
		});
	}
	if(field === 'gender'){
		return mediaArray.sort(function(mediaA, mediaB){
			var a, b;
			if(mediaA.people.male > mediaA.people.female){
				a = 1;
			}else{
				a = 0;
			}
			if(mediaA.people.male > mediaA.people.female){
				b = 1;
			}else{
				b = 0;
			}
			return a - b;
		});
	}
}
SORT.byMeta = function(mediaArray, field){
	if(field === 'date'){
		return mediaArray.sort(function(mediaA, mediaB){
			return mediaA.created.getTime() - mediaB.created.getTime();
		});
	}

	if(field === 'color'){

	}
}
SORT.bySocial = function(mediaArray, field){
	if(field === 'tags'){
		return mediaArray.sort(function(mediaA, mediaB){
			return mediaA.tags.length - mediaB.tags.length;
		});
	}

	if(field === 'likes'){
		return mediaArray.sort(function(mediaA, mediaB){
			return mediaA.likes.count - mediaB.likes.count;
		});
	}

	if(field === 'comments'){
		return mediaArray.sort(function(mediaA, mediaB){
			return mediaA.comments.count - mediaB.comments.count;
		});
	}
}
SORT.byConfidence = function(mediaArray, field){
	if(field === 'analysis'){
		return mediaArray.sort(function(mediaA, mediaB){
			return mediaA.captions.analysis.confidence - mediaB.captions.analysis.confidence;
		});
	}
	if(field === 'classification'){
		return mediaArray.sort(function(mediaA, mediaB){
			return media.clazz[0].confidence - mediaB.clazz[0].confidence;
		});
	}
	
}
