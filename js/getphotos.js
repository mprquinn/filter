$(document).ready(function(){
	$('.search').click(function(){
		$('.feed').empty();
		var searchString = $('#search').val();
		searchPhotos(searchString);
		$('.feed').fadeIn();
		setTimeout(gridShit, 2000);
		// gridShit();
	});
	;
});


function gridShit(){
	var step = 3;
	var divs = $('.feed .span4');
	var bar;
	var width;
	divs.each(function(i){
		bar = $(this).find('.progress .bar');
		width = $(this).find('.progress .bar').data('width');
		if( i % step == 0 ){
			divs.slice(i, i+step).wrapAll('<div class="row">');
		}
		if(width < 30){
			bar.removeClass('bar-success').addClass('bar-danger');
		}
		else if(width > 30 && width < 60){
			bar.removeClass('bar-success').addClass('bar-warning');
		}
		$(this).fadeIn(500);
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
				<div class="bar bar-success" style="width:' + imgRatio + '%;" data-width="'+ imgRatio + '">\
				</div></div></div>');
      		}     
                            
        }

    });
}
 