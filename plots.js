// Create a dropdown menu.
function sampleNames(data) {

	var sampleNameList = [];

	//Loop through sampleNameList to get the data for the dropdown menu.
	for (var i = 0; i < sampleNames.length; i++){
		if (sampleNameList.indexOf(sampleNames[i] === -1){
			sampleNameList.push(sampleNames[i]);
		});

	var innerContainer = document.querySelector(".plots"),
		namesMenu = innerContainer = documents.querySelector(".dropdownmenu"),
		nameSelector = innerContainer.querySelector("#seldataset");

	function assignOptions(textArray, selector) {
		for (var i =0; i < textArray.length; i++) {
			var currentOption = document.createElement("option");
			currentOption.text = textArray[i];
			selector.appendChild(currentOption);
		}
	}
	assignOptions(sampleNameaList, nameSelector);
	};

// Sort the sample name data.

data.sort() {
	return parseFloat(data);
};

// Slice the first 10 results for the pie chart.
sampleData = data.slice(0, 10);

//Build the pie chart.

function buildPieChart(data){
	var data = [{
		values: [sampleData],
		labels: [data],
		type: "pie"
	}];

	var layout {
		height:500
		width:500
	};

	Plotly.plot("pie",data, layout);

	}

function updatePieChart(newData) {
	pieChart = document.getElementByID("#pie");
	Plotly.restyle(pieChart, "values",[newData]);
}
updatePieChart(data);
	
};

// Create a bubble chart to plot the sample value versus the OTU id.
function buildBubbleChart(data) {
	var bubbleChartLayout = {
		title: "Sample Value Versus OTU ID",
		xaxis: {
			title: "OTU IDs",
			range: [0,3500]
		};
		yaxis: {
			title: "Sample Values",
			range: [0,200]
		},
		mode: "markers"
		//text
		marker:{
			size: sample_value
		};
		colors: OTU_ID
	};
}

}]

function optionsChanged() {

	nameSelector.addEventListen("change", updateSampleName, false);
};

}

//Create a function to pull the data from the API.
function getData(){
	Plotly.d3.json("/names", function(error, data){
		if (error) return console.warn(error);
	})

	Plotly.d3.json("/otu", function(error, data){
		if (error) return console.warn(error);

	})

	Plotly.d3.json("/metadata/<sample>", function(error, data){
		if (error) return console.warn(error);

	})

	Plotly.d3.json("/wfreq/<sample>", function(error, data){
		if (error) return console.warn(error);
	})

	Plotly.d3.json("/sample/<sample>", function(error, data){

	})
}

getData();
