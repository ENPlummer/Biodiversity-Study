
// Create a dropdown menu for the name data.

function selectMenu() {
	var namesData = document.getElementById("seldataset");

};

function createOptions(selectMenu) {
	var options = document.createElement("option");
};

//Create a pie chart for the OTU ID data.

function buildOtuIdPieChart(data){
	var trace1 = {
		
	}
}

// Create a bubble chart for the Sample Value versus the OTU ID.

// Pull the data from the API.

function getData() {

	Plotly.d3.json("/names", function(error, data){
		if (error) console.warn(error);
	})

	Plotly.d3.json("/otu", function(error, data){
		if (error) console.warn(error);
	})

	Ploly.d3.json("/metadata/<sample>", function(error, data){
		if (error) console.warn(error);
	})

	Plotly.d3.json("/wfreq/<sample>", function(error, data){
		if (error) console.warn(error);
	})

	Plotly.d3.json("/sample/<sample>", function(error, data){
		if (error) console.warn(error);
	})
}

getData();