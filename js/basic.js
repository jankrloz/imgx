function getImgData (imgData, ctx)
{

	var copy = [];
	copy.length = imgData.data.length;

	for (var i = 0; i < imgData.data.length; i+=4)
	{
	    copy.push(imgData.data[i]);
	    copy.push(imgData.data[i+1]);
	    copy.push(imgData.data[i+2]);
	}

	return copy;
}

function setImgData(imgData, ctx, newImgData){
	imgData = newImgData;
	ctx.putImageData(imgData, 0, 0);
}

function invertImage (imgData, ctx)
{
	for (var i = 0; i < imgData.data.length; i+=4)
	{
	    imgData.data[i] = 255 - imgData.data[i];
	    imgData.data[i+1] = 255 - imgData.data[i+1];
	    imgData.data[i+2] = 255 - imgData.data[i+2];
	}

	ctx.putImageData(imgData, 0, 0);
}

function grayLevel (imgData, ctx)
{
	for (var i = 0; i < imgData.data.length; i+=4)
	{
	    var max = Math.max(imgData.data[i], imgData.data[i+1], imgData.data[i+2]);
	    imgData.data[i] = max;
	    imgData.data[i+1] = max;
	    imgData.data[i+2] = max;
	}

	ctx.putImageData(imgData, 0, 0);
}

function brightnessAdjust (imgData, ctx, currentImgData, value)
{

	//var brightness = parseInt(prompt ("Input brightness level (-100 to 100)"));
	var brightness = parseInt(value);

	if (brightness >= -100 && brightness <= 100)
	{
		for (var i = 0; i < imgData.data.length; i+=4)
		{
		    imgData.data[i] = currentImgData.data[i] + brightness;
		    imgData.data[i+1] = currentImgData.data[i+1] + brightness;
		    imgData.data[i+2] = currentImgData.data[i+2] + brightness;
		}
	}

	ctx.putImageData(imgData, 0, 0);
}

function thresholdImage (imgData, ctx, currentImgData, umbralvalue)
{

	if (umbralvalue >= 0 && umbralvalue <= 255)
	{
		for (var i = 0; i < imgData.data.length; i+=4)
		{
		    imgData.data[i] = currentImgData.data[i] < umbralvalue ? 0 : 255;
		    imgData.data[i+1] = currentImgData.data[i+1] < umbralvalue ? 0 : 255;
		    imgData.data[i+2] = currentImgData.data[i+2] < umbralvalue ? 0 : 255;
		}
	}
	
	else
	{
		alert("Wrong umbral value");
	}

	ctx.putImageData(imgData, 0, 0);
}