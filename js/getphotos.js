$(document).ready(function(){
	searchPhotos();
});




function searchPhotos(){
	var imgSrc;
	var imgTitle;
	var imgRatio;

   $.ajax({
    	type: "GET",
        dataType: "jsonp",
        cache: false,
        url: "https://api.instagram.com/v1/tags/yolo/media/recent/?access_token=3344808.5b9e1e6.20d57cfeee9343fd8412d2355a6aa1c0",
        success: function(data) {
            for (var i = 0; i < 12; i++) {
        		// $(".feed").append();
        		$('.feed').append('<div class="span4 photo"><img src="' + imgSrc + '"/><p><div class="progress">\
				<div class="bar bar-success" style="width:' + imgRatio + ';">\
				</div></div></div>');
        		imgSrc = data.data[i].images.standard_resolution.url;
        		console.log(data.data[i].likes.count);
        		imgLikes = data.data[i].likes.count;
        		imgTags = data.data[i].tags.length;
        		imgRatio = Math.round((imgLikes / imgTags) * 100);
        		console.log(imgRatio);
      		}     
                            
        }

    });
}
 