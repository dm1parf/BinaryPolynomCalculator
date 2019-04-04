const input1_field = document.getElementById("firstinput");
const input2_field = document.getElementById("secondinput");
const out_field = document.getElementById("output");
const history_div = document.getElementById("history");

$("#sum").click(function(){calc('sum');});
$("#mult").click(function(){calc('mult');});
$("#div").click(function(){calc('div');});
$("#mod").click(function(){calc('mod');});
$("#swap").click(swapInputs);
$("#clear-history").click(function(){$('#history').children().remove()});
$("#clear").click(clear);

let sign;
let iter = 0;

input1_field.focus();

function calc(choice){
	first = getArray(input1_field);
	second = getArray(input2_field);
	let inputError = 0;
	for(let i = 0; i < first.length; i++){
		if (first[i] > 1 || first[i] < 0){
			inputError = 1;
		}
	}
	for(let i = 0; i < second.length; i++){
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
		case 'sum':
			result = binArraySum(first, second);
			sign = "+";
			break;
		case 'mult':
			result = binArrayMult(first, second);
			sign = "*";
			break;
		case 'div':
			result = binArrayDiv(first, second,1);
			sign = "/";
			break;
		case 'mod':
			result = binArrayDiv(first, second,2);
			sign = "%";
			break;
	}
	out_field.style.background = '#7ccdff';
	setTimeout(function(){out_field.style.background = 'white';}, 500)
	out_field.value = result.join("");

	makeHistory (first, second, result, sign, iter);

	document.getElementById("history" + iter).scrollIntoView({behavior: "smooth"});
	iter++;
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

	for (let i = 0; i < arr1.length; i++){
		for (let j = 0; j < arr2.length; j++){
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
	for (let i = array.length-1; i > 1; i--){
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

	let i = 0;
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
	$('.clear').val('');
}

function swapInputs(){
	let temp = $('#firstinput').val();
	$('#firstinput').val($('#secondinput').val());
	$('#secondinput').val(temp);
}

function makeHistory(arr1, arr2, arrResult, sign, iter){
	let div;
	putPolynomDiv(arr1);
	putCosmetics(sign);
	putPolynomDiv(arr2);
	putCosmetics('=');

	putPolynomDiv(arrResult);
	div = putCosmetics('<hr>');
	div.id = 'history' + iter;
}

function putCosmetics(thing){
	div = document.createElement("div");
	history_div.appendChild(div);
	div.innerHTML = thing;
	if (thing == '<hr>')

	return div;
}

function putPolynomDiv(array){
	let div;
	div = document.createElement("div");
	history_div.appendChild(div);
	showPolynom(array, div);
	$(div).click(function(){moveToInput(array)});
	div.style.cursor = 'pointer';

	return div;
}

function moveToInput(array){
	input1_field.value = array.join("");
	input1_field.style.background = '#7ccdff';
	setTimeout(function(){input1_field.style.background = 'white';}, 500)
}


function test(){
	$('#firstinput').val("10011");
	input2_field.value = "101"
	calc('sum');
	if (out_field.value == "00111")
	console.log("Sum works!");

	calc('mult');
	if (out_field.value == "1011111")
	console.log("Mult works!");

	calc('div');
	if (out_field.value == "111")
	console.log("Div works!");

	calc('mod');
	if ($("#output").val() == "01")
	console.log("Mod works!");

	//clearHistory();
	//clear();
}
