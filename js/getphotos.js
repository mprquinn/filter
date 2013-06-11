$(document).ready(function(){
	$('.search').click(function(){
		var searchString = $('#search').val();
		searchPhotos(searchString);
		setTimeout(gridShit, 1000);
		// gridShit();
	});
	;
});


function gridShit(){
	console.log('HELLO');
	var step = 3;
	var divs = $('.feed .span4');

	divs.each(function(i){
		console.log('inside grid');
		if( i % step == 0 ){
			divs.slice(i, i+step).wrapAll('<div class="row">');
		}
	});


}

function searchPhotos(searchString){
	var imgSrc;
	var imgTitle;
	var imgRatio;

   $.ajax({
    	type: "GET",
        dataType: "jsonp",
        cache: false,
        url: "https://api.instagram.com/v1/tags/" + searchString + "/media/recent/?access_token=3344808.5b9e1e6.20d57cfeee9343fd8412d2355a6aa1c0",
        success: function(data) {
            for (var i = 0; i < 9; i++) {
        		// $(".feed").append();
        		imgSrc = data.data[i].images.standard_resolution.url;
        		console.log(data.data[i].likes.count);
        		imgLikes = data.data[i].likes.count;
        		imgTags = data.data[i].tags.length;
        		imgRatio = Math.round((imgLikes / imgTags) * 100);
        		console.log(imgRatio);
        		$('.feed').append('<div class="span4 photo"><img src="' + imgSrc + '"/><p><div class="progress">\
				<div class="bar bar-success" style="width:' + imgRatio + '%;">\
				</div></div></div>');
      		}     
                            
        }

    });
}
 