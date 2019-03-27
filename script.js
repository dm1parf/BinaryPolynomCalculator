const input1_field = document.getElementById("firstinput");
const input2_field = document.getElementById("secondinput");
const out_field = document.getElementById("output");
const sum_button = document.getElementById("sum");
const mult_button = document.getElementById("mult");
const poly1_field = document.getElementById("firstPolynom");
const poly2_field = document.getElementById("secondPolynom");
const outPoly_field = document.getElementById("outputPolynom");

let iteration = 1;

function calc(choice){
	first = getArray(input1_field);
	second = getArray(input2_field);

	showPolynom(first, poly1_field);
	showPolynom(second, poly2_field);

	result = [];
	switch (choice){
		case 1:
			result = binArraySum(first, second); 
			//
			console.log('calculation: ' + iteration);
			console.log(first);
			console.log('+');
			console.log(second);
			console.log(result);
			//
			break;
		case 2:
			result = binArrayMult(first, second); 
			break;
	}

	showPolynom(result, outPoly_field);
	out_field.value = result.join("");
	iteration++;
}

function getArray(field){
	string = field.value;

	array = JSON.parse("[" + string.split("") + "]");
	array = cutArray(array);
	return array;
}

function binArrayMult(arr1, arr2){
	result = [];

	return result;
}

function showPolynom(array, field){
	field.innerHTML = "";
	for (var i = array.length-1; i >= 0; i--){
		
		if (array[i] == 1){
			if (i != array.length-1)
				field.innerHTML += " + ";
			field.innerHTML += "x^" + i;
		}
	}
	if (array.length == 0)
		field.innerHTML = "0";
}

function binArraySum(arr1, arr2){
	result = [];
	while (arr1.length < arr2.length){
		arr1.push(0);
	}
	while (arr2.length < arr1.length){
		arr2.push(0);
	}
	for (let i = 0; i < arr1.length; i++){
		result[i] = (arr1[i] + arr2[i]) % 2;
	}
	result = cutArray(result);
	
	return result;
}

function cutArray(arr){
	while (arr[arr.length-1] == 0)
		arr.pop();
	return arr;
}

sum_button.addEventListener('click', function(){calc(1);});
mult_button.addEventListener('click', function(){calc(2);});