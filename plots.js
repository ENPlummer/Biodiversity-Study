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
	assignOptions(sampleNameaList, nameSelector)
	}
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
