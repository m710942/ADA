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
			
			if(mediaA.people.male > mediaB.people.female){
				a = 1;
			}else{
				a = 0;
			}
			if(mediaA.people.male > mediaB.people.female){
				b = 1;
			}else{
				b = 0;
			}

			if(mediaA.people.male === mediaA.people.male && mediaA.people.male === 0){
				a == 2;
			}else if(mediaA.people.female === mediaA.people.female && mediaA.people.female === 0){
				a == 3;
			}
			if(mediaB.people.male === mediaB.people.male && mediaB.people.male === 0){
				a == 2;
			}else if(mediaB.people.female === mediaB.people.female && mediaB.people.female === 0){
				b == 3;
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
		return mediaArray.sort(function(mediaA, mediaB){
			if(mediaA.color.h === mediaB.color.h){
				if(mediaA.color.s === mediaB.color.s){
					return mediaA.color.l - mediaB.color.l;
				}else{
					return mediaA.color.s - mediaB.color.s;
				}
			}else{
				return mediaA.color.h - mediaB.color.h;
			}
		});
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
			if((mediaA.captions.analysis[0].confidence*100) > (mediaB.captions.analysis[0].confidence*100)){
				return 1;
			}else if((mediaA.captions.analysis[0].confidence*100) < (mediaB.captions.analysis[0].confidence*100)){
				return -1;
			}else{
				return 0;
			}
		});
	}
	if(field === 'classification'){
		return mediaArray.sort(function(mediaA, mediaB){
			return mediaA.clazz[0].confidence - mediaB.clazz[0].confidence;
		});
	}
	
}
