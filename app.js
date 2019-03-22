let playerScore = 0;
let computerScore = 0;

const playerScore_span = document.getElementById("player-score");
const computerScore_span = document.getElementById("computer-score");
const rollButton = document.getElementById("roll-button");
const playerDices = document.getElementById("player-result");
const computerDices = document.getElementById("computer-result");
const resultMessage = document.getElementById("result-message");
const firstPlayerDice_img = document.getElementById("player-dice-img1");
const secondPlayerDice_img = document.getElementById("player-dice-img2");
const firstComputerDice_img = document.getElementById("computer-dice-img1");
const secondComputerDice_img = document.getElementById("computer-dice-img2");

function displayDice(diceValue, element){
	switch(diceValue){
		case 1:
			element.style.backgroundPosition = "top left";
			break;
		case 2:
			element.style.backgroundPosition = "top center";
			break;
		case 3:
			element.style.backgroundPosition = "top right";
			break;
		case 4:
			element.style.backgroundPosition = "bottom left";
			break;
		case 5:
			element.style.backgroundPosition = "bottom center";
			break;
		case 6:
			element.style.backgroundPosition = "bottom right";
			break;
		
	}
}

function getRandomDice(){
	let dice = Math.floor(Math.random() * 6 + 1);
	return dice;
}

function game(){
    let playerDicesArray = new Array();
	let computerDicesArray = new Array();
	playerDicesArray[0] = getRandomDice();
	playerDicesArray[1] = getRandomDice();
	computerDicesArray[0] = getRandomDice();
	computerDicesArray[1] = getRandomDice();
	let computerDices = computerDicesArray.reduce(function (a,b) {return a+b}, 0);
	let playerDices = playerDicesArray.reduce(function (a,b) {return a+b}, 0);;
	displayDice(playerDicesArray[0], firstPlayerDice_img);
	displayDice(playerDicesArray[1], secondPlayerDice_img);

	displayDice(computerDicesArray[0], firstComputerDice_img);
	displayDice(computerDicesArray[1], secondComputerDice_img);
	
	if (playerDices > computerDices){
		playerScore++;
		playerScore_span.innerHTML = playerScore;
		resultMessage.innerHTML = "You win!!!";
	} else if (playerDices < computerDices){
		computerScore++;
		computerScore_span.innerHTML = computerScore;
		resultMessage.innerHTML = "You lost((( T_T";
	} else 
		resultMessage.innerHTML = "Draw... Boring";
}

rollButton.addEventListener('click', game);