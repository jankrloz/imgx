function calculateHistogram (imgData, ctx)
{
	//Limpiamos el localStorage antes de cualquier otra cosa
	localStorage.clear();

	var data = [];

	//Default value of array = 0
	for (i = 0; i < 256; i++) {
        data.push(0);
    }

	for (var i = 0; i < imgData.data.length; i += 4)
	{
	    var max = Math.max(imgData.data[i], imgData.data[i+1], imgData.data[i+2]);
	    data[max]++;
	}

	localStorage["histogram_data"] = JSON.stringify(data);
	histogram_window = window.open("chart.html","Histograma","width = 1040, height = 420");
}

function drawHistogram () {
	var hist_data = JSON.parse(localStorage["histogram_data"]);
    hist_data.shift();
    hist_data.pop();

    var hist_labels = [];

    for (i = 0; i < 256; i++) { 
        hist_labels.push("");
    }

    // line chart data
    var buyerData = {
        labels : hist_labels,
        datasets : [
        {
            fillColor : "#e0e0e0",
            strokeColor : "#e0e0e0",
            pointColor : "#e0e0e0",
            pointStrokeColor : "#e0e0e0",
            data : hist_data
        }
    ]
    }
    // get line chart canvas
    var histogram_canvas = document.getElementById('histogram_canvas').getContext('2d');
    // draw line chart
    new Chart(histogram_canvas).Bar(buyerData, {
    	showScale: false,
        scaleGridLineWidth : 1,
        barShowStroke : true,
        barStrokeWidth : 1,
        barValueSpacing : 3,
    });
}