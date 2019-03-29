const input1_field = document.getElementById("firstinput");
const input2_field = document.getElementById("secondinput");
const out_field = document.getElementById("output");
const sum_button = document.getElementById("sum");
const mult_button = document.getElementById("mult");
const div_button = document.getElementById("div");
const mod_button = document.getElementById("mod");
const swap_button = document.getElementById("swap");
const clear_button = document.getElementById("clear");
const clearHistory_button = document.getElementById("clear-history");
const history_div = document.getElementById("history");

let iter = 0;
let sign;


input1_field.focus();

function calc(choice){
	first = getArray(input1_field);
	second = getArray(input2_field);
	let inputError = 0;
	for(var i = 0; i < first.length; i++){
		if (first[i] > 1 || first[i] < 0){
			inputError = 1;
		}
	}
	for(var i = 0; i < second.length; i++){
		if (second[i] > 1 || second[i] < 0){
			inputError = 1;
		}
	}
	if (inputError){
		alert('Ошибка ввода! Убедитесь, что вы ввели только коэффициенты 0 и 1');
	}
	if ((first.length) && (second.length) && inputError == 0){
		result = [];

		switch (choice){
		case 1:
			result = binArraySum(first, second); 
			sign = "+";
			break;
		case 2:
			result = binArrayMult(first, second); 
			sign = "*";
			break;
		case 3:
			result = binArrayDiv(first, second,1);
			sign = "/";
			break;
		case 4:
			result = binArrayDiv(first, second,2);
			sign = "%";
			break;
	}
	out_field.value = result.join("");
	
	iter = makeHistory (first, second, result, sign, iter);
	document.getElementById(("history" + (iter -1))).scrollIntoView({behavior: "smooth"});
	}	
}

function getArray(field){
	string = field.value;

	array = JSON.parse("[" + string.split("") + "]");
	array = cutArray(array);
	return array;
}

function binArrayMult(arr1, arr2){
	(mult = []).length = arr1.length + arr2.length - 1;
	mult.fill(0);
	
	for (var i = 0; i < arr1.length; i++){
		for (var j = 0; j < arr2.length; j++){
			if (arr1[i] == 1 && arr2[j]== 1){
				mult[i+j] = (mult[i+j] + 1) % 2;
				
			}
		}
	}

	return mult;
}

function showPolynom(array, field){
	field.innerHTML = "";
	array = cutArray(array);
	if ((array.length == 1) && (array[0] == 0)){
		field.innerHTML += "0";
	}
	for (var i = array.length-1; i > 1; i--){
		if (array[i] == 1){
			if (i != array.length-1)
				field.innerHTML += " + ";
			field.innerHTML += "x<sup>" + i + "</sup>";
		}
	}
	if (array[1] == 1){
		if (array.length > 2){
			field.innerHTML += " + ";
		}
		field.innerHTML += "x";
	}
	if (array[0] == 1){
		if (array.length > 1){
			field.innerHTML += " + ";
		}
		field.innerHTML += "1";
	}
	
}

function binArraySum(arr1, arr2){
	sum = [];
	while (arr1.length < arr2.length){
		arr1.push(0);
	}
	while (arr2.length < arr1.length){
		arr2.push(0);
	}
	for (let i = 0; i < arr1.length; i++){
		sum[i] = (arr1[i] + arr2[i]) % 2;
	}
	sum = cutArray(sum);

	return sum;
}

function binArrayDiv(arr1, arr2, param){
	result = [0];

	curPoly = [];
	curRem = [];
	curRem = arr1;

	var i = 0;
	if (arr2.length == 1){
		return arr1;
	}
	while (curRem.length >= arr2.length){
		curMult = createSinglePolynom((curRem.length - 1) - (arr2.length - 1));
		result = binArraySum(result, curMult);
		curPoly = binArrayMult(curMult, arr2);
		curRem = binArraySum(curRem, curPoly);
	}
	if (param == 1){
		return result;
	}
	else{
		return curRem;
	}
}


function createSinglePolynom(degree){
	(newPolynom = []).length = degree + 1;
	newPolynom.fill(0);
	newPolynom[degree] = 1;
	return newPolynom; 
}

function cutArray(arr){
	while (arr[arr.length-1] == 0 && (arr.length > 1)){
		arr.pop();
	}
		
	return arr;
}

function clear(){
	input1_field.value = "";
	input2_field.value = "";
	out_field.value = "";

}

function swapInputs(){
	var temp = input1_field.value;
	input1_field.value = input2_field.value;
	input2_field.value = temp;
}

function makeHistory(arr1, arr2, arrResult, sign, iter){
	var div;

	div = document.createElement("div");
	div.id = "history" + iter + "-" + arr1.join("");
	
	history_div.appendChild(div);
	showPolynom(arr1, div);
	div.addEventListener('click', function(){input1_field.value = arr1.join("");
											input1_field.style.background = '#7ccdff';
											setTimeout(function(){input1_field.style.background = 'white';}, 500)
											});
	div.style.cursor = 'pointer';
	iter++;

	div = document.createElement("div");
	div.id = "history" + iter;
	history_div.appendChild(div);
	div.innerHTML = sign;
	iter++;

	div = document.createElement("div");
	div.id = "history" + iter + "-" + arr2.join("");

	history_div.appendChild(div);
	showPolynom(arr2, div);
	div.addEventListener('click', function(){input1_field.value = arr2.join("");
											input1_field.style.background = '#7ccdff';
											setTimeout(function(){input1_field.style.background = 'white';}, 500)
											});
	div.style.cursor = 'pointer';
	iter++;

	div = document.createElement("div");
	div.id = "history" + iter;
	history_div.appendChild(div);
	div.innerHTML = "=";
	iter++;

	div = document.createElement("div");
	div.id = "history" + iter + "-" + arrResult.join("");

	history_div.appendChild(div);
	showPolynom(arrResult, div);
	div.addEventListener('click', function(){input1_field.value = arrResult.join("");
											input1_field.style.background = '#7ccdff';
											setTimeout(function(){input1_field.style.background = 'white';}, 500)
											});
	div.style.cursor = 'pointer';
	iter++;
	
	div = document.createElement("div");
	div.id = "history" + iter;
	history_div.appendChild(div);
	div.innerHTML = "<hr>" ;
	iter++;
	
	return iter;
}

function clearHistory(){
	var element = history_div;
	while(element.firstChild){
		element.removeChild(element.firstChild);
	}
}

sum_button.addEventListener('click', function(){calc(1);});
mult_button.addEventListener('click', function(){calc(2);});
div_button.addEventListener('click', function(){calc(3);});
mod_button.addEventListener('click', function(){calc(4);});
swap_button.addEventListener('click', swapInputs);
clear_button.addEventListener('click', clear);
clearHistory_button.addEventListener('click', clearHistory);