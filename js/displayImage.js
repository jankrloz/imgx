function displayImage(image, imageDisplay)
{
	// Validamos el tipo de archivo
	var imageType = /image.*/;

	if (image.type.match(imageType)) 
	{
		var reader = new FileReader();

		reader.onload = function(e)
		{
			imageDisplay.src = reader.result;
			localStorage.setItem("imgData", imageDisplay.src);

			//Call from workspace.js
			$('#home').fadeOut();
			$('#workspace').fadeIn(2000);
			$('body').css('backgroundColor', '#121A21');
			loadImage();
		}

		reader.readAsDataURL(image);	
	} 

	else 
	{
		imageDisplay.innerHTML = "File not supported!"
	}
}

function getBase64Image(img) 
{
    // Create an empty canvas element
    var canvas = document.getElementById("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to guess the
    // original format, but be aware the using "image/jpg" will re-encode the image.
    return canvas.toDataURL("image/*", 1);

    //return dataURL.replace(/^data:image\/*;base64,/, "");
}