var numOfSquares = 6;
var pickedColor;
var colors=[];

var colorDisplay = document.querySelector("#colorDisplay");
var squares = document.querySelectorAll(".square");
var message = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButton = document.querySelectorAll(".mode");


init();

function init(){

	// set up mode buttons
	for(var i=0; i<modeButton.length; i++){
		modeButton[i].addEventListener("click",function(){
			modeButton[0].classList.remove("selected");
			modeButton[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "easy" ? numOfSquares = 3: numOfSquares = 6;
			resetGame(numOfSquares);
		});
	}

	//set up reset button
	resetButton.addEventListener("click",function(){
		resetGame(numOfSquares);
	});

	// set all squares colors and listeners
	for(var i=0; i<squares.length; i++){
		// set initial color to squares
		squares[i].style.backgroundColor = colors[i];

		// add click listeners to squares
		squares[i].addEventListener("click",function(){
			// grab color of clicked square and compare to picked color
			var clickedColor = this.style.backgroundColor;
			if(clickedColor === pickedColor){
				message.textContent = "Correct!";
				changeColors(clickedColor);
				h1.style.backgroundColor = pickedColor;
				resetButton.textContent = "Play Again?"
			}else{
				this.style.backgroundColor = document.body.style.backgroundColor;
				message.textContent = "Try Again";
			}
		});
	}

	resetGame(numOfSquares);
}

function resetGame(squareNum){
	h1.style.backgroundColor = "steelblue";
	colors = generateRandomColors(squareNum);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for(var i=0; i<squares.length; i++){
		if(colors[i]){
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = "block";
		}else{
			squares[i].style.display = "none";
		}
	}
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	message.textContent="";
	resetButton.textContent = "new colors";
}

function generateRandomColors(num){
	var randomColors = [];
	for(var i=0; i<num; i++){
		randomColors.push(getRandomColor());
	}
	return randomColors;
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function changeColors(color){
	for(var i=0; i<squares.length;i++){
		squares[i].style.backgroundColor = color;
	}
}

function getRandomColor(){
	var red = Math.floor(Math.random() * 256);
	var green = Math.floor(Math.random() * 256);
	var blue = Math.floor(Math.random() * 256);
	return "rgb("+red+", "+green+", "+blue+")";
}