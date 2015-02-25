var imgData;
var ctx;
var img;
var currentImgData;

function loadImage()
{
  	var dataImage = localStorage.getItem('imgData');

	img = document.getElementById('imgDisplay');
	img.src = dataImage;

	var canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	var n = 1.0;

	
	while (true)
	{

		if((img.height / n) < 580 && (img.width / n) < $(document).width() - 300)
		{
			break;
		}
		else
		{
			n+=0.1;
		}
	}
	
	canvas.width = img.width / n;
	canvas.height = img.height / n;

	ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0 , canvas.width, canvas.height);

	imgData = ctx.getImageData(0, 0, img.width, img.height);

	canvas.addEventListener('mousemove', function(evt) 
	{
		var mousePos = getMousePos(canvas, evt);
		var message = 'x: ' + mousePos.x + ', y: ' + mousePos.y;
		$('#coords').html(message);
	}, false);

	$('.inverse-tool').click(function()
	{
		invertImage (imgData, ctx);
	});

	$('.histogram-tool').click(function()
	{
		calculateHistogram (imgData, ctx);
		drawHistogram();
	});

	$('.graylevel-tool').click(function()
	{
		grayLevel (imgData, ctx);
	});

	$('.brightness-tool').click(function()
	{
		brightnessAdjust (imgData, ctx);
	});
};

$(document).ready(function() {
	brightnessSlider(-100, 100);
	thresholdSlider(0, 255);
});

function brightnessSlider(minvalue, maxvalue){
	var $slider = $(".bs");

	var brightnessvalue = 0;

  	$slider.slider({
	    min: minvalue,
	    max: maxvalue,
	    value: 0,
	    orientation: "horizontal",
	    range: "min",
	    slide: function(event, ui) {
	        $(".popover-title").html('Brightness: '+ui.value);
	        brightnessvalue = ui.value;
	        brightnessAdjust (imgData, ctx, currentImgData, brightnessvalue);
	    }
  	});

	$('.brightness-tool').popover({trigger: 'manual'}).click(function() {
        var $this = $(this);

        currentImgData = ctx.getImageData(0, 0, img.width, img.height);
        
        if ($this.toggleClass('active').hasClass('active')) {
            $this.popover('show');
            $('.bs').show();
            $slider.width(250);

            $('.popover-content')
                .empty()
                .append($slider)
                .width(400)
                .append('<button id="applyBrightness" class="btn btn-inverse btn-sm">Apply</button>')
                .append('<button id="cancelBrightness" class="btn btn-inverse btn-sm">Cancel</button>');

            $('#applyBrightness').click(function(){
            	$slider.detach();
            	$this.popover('hide');
            	$slider.slider({value: 0});
		    });

		    $('#cancelBrightness').click(function(){
		    	setImgData(imgData, ctx, currentImgData);
		    	$slider.detach();
		    	$this.popover('hide');
		    	$slider.slider({value: 0});
		    });

        } else {
            $slider.detach();
            $this.popover('hide');
        }
    });
}

function thresholdSlider(minvalue, maxvalue){
	var $slider = $(".us");

	var umbralvalue = 0;

  	$slider.slider({
	    min: minvalue,
	    max: maxvalue,
	    value: 100,
	    orientation: "horizontal",
	    range: "min",
	    slide: function(event, ui) {
	        $(".popover-title").html('Umbral: '+ui.value);
	        umbralvalue = ui.value;
	        thresholdImage (imgData, ctx, currentImgData, umbralvalue);
	    }
  	});

	$('.threshold-tool').popover({trigger: 'manual'}).click(function() {
        var $this = $(this);

        currentImgData = ctx.getImageData(0, 0, img.width, img.height);
        
        if ($this.toggleClass('active').hasClass('active')) {
            $this.popover('show');
            $('.us').show();
            $slider.width(250);

            $('.popover-content')
                .empty()
                .append($slider)
                .width(400)
                .append('<button id="applyThreshold" class="btn btn-inverse btn-sm">Apply</button>')
                .append('<button id="cancelThreshold" class="btn btn-inverse btn-sm">Cancel</button>');

            $('#applyThreshold').click(function(){
            	$slider.detach();
            	$this.popover('hide');
            	$slider.slider({value: 100});
		    });

		    $('#cancelThreshold').click(function(){
		    	setImgData(imgData, ctx, currentImgData);
		    	$slider.detach();
		    	$this.popover('hide');
		    	$slider.slider({value: 100});
		    });

        } else {
            $slider.detach();
            $this.popover('hide');
        }
    });
}

function getMousePos(canvas, evt) 
{
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

window.onbeforeunload = function()
{
	localStorage.clear();
}