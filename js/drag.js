window.onload = function()
{
	// Obtener el área de carga de imagenes
	var dropZone = document.getElementById('drop_zone');
	var inputImage = document.getElementById('input-image');

	// Establecer los listeners de drag&drop.
	inputImage.addEventListener('change', handleFileSelect, false);
	dropZone.addEventListener('dragover', handleDragOver, false);
	dropZone.addEventListener('drop', handleFileSelect, false);

	// Hacer que al dar click a esa área, muetre el dialogo de explorador de archivos
	$('#open-menu, #btn-begin').click(function (e) {
	  	if (inputImage) {
	    	inputImage.click();
	  	}
	});
} 

// In Drop
function handleFileSelect(evt) 
{
	evt.stopPropagation();
	evt.preventDefault();

	var imageDisplay = document.getElementById('imgDisplay');

	var files = evt.target.files || evt.dataTransfer.files; // FileList object.
	var image = files[0];

	// Call displayImage
	displayImage(image, imageDisplay);
}

// In DragOver
function handleDragOver(evt) 
{
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}