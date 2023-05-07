alert("\n\n\nI have no idea why I made this\n\nYou can click the words to see its definition\n\n\n\n- Created by ToolDroid");


function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

function darkenColor(hexColor, percentage) {
	// Get the alpha, red, green, and blue values from the hex color
	var alpha = parseInt(hexColor.slice(1, 3), 16);
	var red = parseInt(hexColor.slice(3, 5), 16);
	var green = parseInt(hexColor.slice(5, 7), 16);
	var blue = parseInt(hexColor.slice(7), 16);

	// Convert the percentage to a decimal value
	var percentDecimal = percentage / 100;

	// Calculate the new red, green, and blue values by multiplying them by the percentage
	var newRed = Math.round(red * (1 - percentDecimal));
	var newGreen = Math.round(green * (1 - percentDecimal));
	var newBlue = Math.round(blue * (1 - percentDecimal));

	// Convert the new red, green, and blue values back to hex
	var hexRed = newRed.toString(16).padStart(2, '0');
	var hexGreen = newGreen.toString(16).padStart(2, '0');
	var hexBlue = newBlue.toString(16).padStart(2, '0');

	// Return the new hex color value
	return '#' + alpha.toString(16).padStart(2, '0') + hexRed + hexGreen + hexBlue;
}

function lightenColor(hexColor, percentage) {
	// Get the alpha, red, green, and blue values from the hex color
	var alpha = parseInt(hexColor.slice(1, 3), 16);
	var red = parseInt(hexColor.slice(3, 5), 16);
	var green = parseInt(hexColor.slice(5, 7), 16);
	var blue = parseInt(hexColor.slice(7), 16);

	// Convert the percentage to a decimal value
	var percentDecimal = percentage / 100;

	// Calculate the new red, green, and blue values by adding the percentage to them
	var newRed = Math.min(Math.round(red + (255 - red) * percentDecimal), 255);
	var newGreen = Math.min(Math.round(green + (255 - green) * percentDecimal), 255);
	var newBlue = Math.min(Math.round(blue + (255 - blue) * percentDecimal), 255);

	// Convert the new red, green, and blue values back to hex
	var hexRed = newRed.toString(16).padStart(2, '0');
	var hexGreen = newGreen.toString(16).padStart(2, '0');
	var hexBlue = newBlue.toString(16).padStart(2, '0');

	// Return the new hex color value
	return '#' + alpha.toString(16).padStart(2, '0') + hexRed + hexGreen + hexBlue;
}

function invertColor(hexColor) {
	// Get the alpha, red, green, and blue values from the hex color
	var alpha = parseInt(hexColor.slice(1, 3), 16);
	var red = parseInt(hexColor.slice(3, 5), 16);
	var green = parseInt(hexColor.slice(5, 7), 16);
	var blue = parseInt(hexColor.slice(7), 16);

	// Calculate the new red, green, and blue values by subtracting them from 255
	var newRed = (255 - red);
	var newGreen = (255 - green);
	var newBlue = (255 - blue);

	// Convert the new red, green, and blue values back to hex
	var hexRed = newRed.toString(16).padStart(2, '0');
	var hexGreen = newGreen.toString(16).padStart(2, '0');
	var hexBlue = newBlue.toString(16).padStart(2, '0');

	// Return the new hex color value
	return '#' + alpha.toString(16).padStart(2, '0') + hexRed + hexGreen + hexBlue;
}

function rgbToHex(rgbColor) {
	// Convert the string "rgb(R, G, B)" to an array of integers [R, G, B]
	var rgbArray = rgbColor.slice(4, -1).split(',').map(Number);

	// Convert the array of integers to a hex string and return it
	var hexString = '#' + rgbArray.map(function(color) {
		var hexValue = color.toString(16);
		return hexValue.length === 1 ? '0' + hexValue : hexValue; // Pad single digit hex values with a leading zero
	}).join('');
	return hexString;
}

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randonBGColor() {
	document.body.style.backgroundColor = darkenColor(getRandomColor(), 65).replace("NaN", "");
}

setInterval(function() {
	randonBGColor();
}, 2800);
randonBGColor();


function getRandomSize() {
	return getRandomNumber(1, 5) + 1; // Math.floor(Math.random() * 5.5) + 1;
}

function getRandomPosition() {
	return Math.floor(Math.random() * 8) + 1;
}

function getRandomRadius() {
	return Math.floor(Math.random() * 40) + 1;
}

function getRandomTime() {
	return Math.floor(Math.random() * 3000) + 1;
}

function setRandomSizesAndPositions() {
	var boxes = document.querySelectorAll('.box');
	boxes.forEach(function(box) {
		var size = getRandomSize();
		box.style.gridColumn = "span " + size;
		box.style.gridRow = "span " + size;
		box.style.fontSize = size * 6 + "px";
	});
}

function setRandomPositions() {
	var boxes = document.querySelectorAll('.box');
	boxes.forEach(function(box) {
		var position = getRandomPosition();
		box.style.order = position;
	});
}

function setRandomBGColors() {
	var boxes = document.querySelectorAll('.box');
	boxes.forEach(function(box) {
		var color = getRandomColor();
		color = lightenColor(color, 45).replace("NaN", "");
		setTimeout(() => {
			box.style.backgroundColor = color;
		}, getRandomTime());
	});
}

function setRandomTextColors() {
	var boxes = document.querySelectorAll('.box');
	boxes.forEach(function(box) {
		var color = box.style.backgroundColor;
		color = rgbToHex(color);
		color = invertColor(color).replace("NaN", "");
		color = darkenColor(color, 35).replace("NaN", "");
		setTimeout(() => {
			box.style.color = color;
		}, getRandomTime());
	});
}

function setRandomRadius() {
	var boxes = document.querySelectorAll('.box');
	boxes.forEach(function(box) {
		var radii = getRandomRadius();
		box.style.borderRadius = radii + "px";
	});
}

const inspirationalWords = [
  "Believe",
  "Dream",
  "Hope",
  "Inspire",
  "Motivate",
  "Create",
  "Focus",
  "Grow",
  "Learn",
  "Achieve",
  "Persevere",
  "Overcome",
  "Succeed",
  "Empower",
  "Envision",
  "Innovate",
  "Lead",
  "Passion",
  "Purpose",
  "Wisdom",
  "Courage",
  "Gratitude",
  "Integrity",
  "Kindness",
  "Respect",
  "Happiness",
  "Joy",
  "Love",
  "Compassion",
  "Forgiveness",
  "Generosity",
  "Humility",
  "Patience",
  "Perfection",
  "Positivity",
  "Productivity",
  "Self-control",
  "Self-improvement",
  "Self-reflection",
  "Self-worth",
  "Strength",
  "Trust",
  "Vision",
  "Confidence",
  "Determination",
  "Discipline",
  "Focus",
  "Growth",
  "Inspiration",
  "Leadership",
  "Motivation",
  "Opportunity",
  "Perseverance",
  "Positive attitude",
  "Possibility",
  "Progress",
  "Purpose",
  "Self-awareness",
  "Self-confidence",
  "Self-discipline",
  "Self-motivation",
  "Success",
  "Transformation",
  "Vitality",
  "Ambition",
  "Aspiration",
  "Balance",
  "Clarity",
  "Commitment",
  "Composure",
  "Consistency",
  "Cooperation",
  "Empathy",
  "Endurance",
  "Flexibility",
  "Graciousness",
  "Harmony",
  "Imagination",
  "Innovation",
  "Optimism",
  "Organization",
  "Passion",
  "Resilience",
  "Responsibility",
  "Simplicity",
  "Stability",
  "Tenacity",
  "Transformation",
  "Understanding",
  "Wellness",
  "Wonder",
  //
  "Rejection",
  "Criticism",
  "Doubt",
  "Insecurity",
  "Disappointment",
  "Frustration",
  "Setback",
  "Obstacle",
  "Challenge",
  "Stress",
  "Anxiety",
  "Pressure",
  "Overwhelm",
  "Uncertainty",
  "Confusion",
  "Mistake",
  "Error",
  "Flaw",
  "Defeat",
  "Sacrifice",
  "Struggle",
  "Suffering",
  "Pain",
  "Anguish",
  "Heartbreak",
  "Betrayal",
  "Loss",
  "Grief",
  "Sadness",
  "Despair",
  "Depression",
  "Hopelessness",
  "Regret",
  "Shame",
  "Guilt",
  "Remorse",
  "Loneliness",
  "Isolation",
  "Abandonment",
  "Repression",
  "Suppression",
  "Oppression",
  "Stagnation",
  "Procrastination",
  "Indecision",
  "Inaction",
  "Complacency",
  "Apathy",
  "Boredom",
  "Monotony",
  "Tedium",
  "Mediocrity"
];

var boxes = document.querySelectorAll('.box');
boxes.forEach(function(box) {
	box.addEventListener('click', () => {
		showDefinition(box.innerHTML);
	});
});

function setRandomText() {
	var boxes = document.querySelectorAll('.box');
	boxes.forEach(function(box) {
		setTimeout(() => {
			if (isPaused)
				return;

			var text = inspirationalWords[getRandomNumber(0, inspirationalWords.length) - 1];
			box.textContent = text;
		}, getRandomNumber(500, 2500));
	});
}

function showDefinition(word) {
	pauseIntervals();
	var div = document.querySelector(".definition");
	var frame = document.querySelector(".frame");
	div.style.display = "block";
	frame.src = "https://www.dictionary.com/browse/" + word;

	document.querySelector(".close_btn").addEventListener('click', () => {
		hideDefinition();
	});
}

function hideDefinition() {
	var div = document.querySelector(".definition");
	div.style.display = "none";
	var frame = document.querySelector(".frame");
	frame.src = "";
	start();
}


var isPaused = true;
var intervalSizeAndPosition;
var intervalText;
var intervalPosition;
var intervalBGColor;
var intervalTextColor;
var intervalRadius;

function start() {
	if (isPaused) {
		isPaused = false;
		intervalSizeAndPosition =
			setInterval(function() {
				setRandomSizesAndPositions();
			}, 4500);

		intervalText =
			setInterval(function() {
				setRandomText();
			}, 1300);

		intervalPosition =
			setInterval(function() {
				setRandomPositions();
			}, 3000);

		intervalBGColor =
			setInterval(function() {
				setRandomBGColors();
			}, 2500);

		intervalTextColor =
			setInterval(function() {
				setRandomTextColors();
			}, 1000);

		intervalRadius =
			setInterval(function() {
				setRandomRadius();
			}, 888);
	}
}

function pauseIntervals() {
	isPaused = true;
	var intervals = [
	 intervalSizeAndPosition,
 intervalText,
 intervalPosition,
 intervalBGColor,
 intervalTextColor,
 intervalRadius
	];

	for (let o = 0; o != intervals.length; o++)
		clearInterval(intervals[o]);
}

start();
setRandomSizesAndPositions();
setRandomBGColors();
setRandomRadius();
setRandomTextColors();
setRandomText();

// Get the canvas element from the HTML document
var canvas = document.getElementById("snowCanvas");
var ctx = canvas.getContext("2d");

// Set the canvas size to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set up the snowflake objects
var snowflakes = [];
for (var i = 0; i < getRandomNumber(30, 50); i++) {
	snowflakes.push({
		x: Math.random() * canvas.width,
		y: Math.random() * canvas.height,
		r: Math.random() * 3.5 + 2,
		d: Math.random() + 2.5
	});
}

// Draw the snowflakes on the canvas
function drawSnowflakes() {
	// Clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw each snowflake
	for (var i = 0; i < snowflakes.length; i++) {
		var snowflake = snowflakes[i];

		// Draw the snowflake circle
		ctx.beginPath();
		ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
		ctx.fillStyle = getRandomColor();
		ctx.fill();

		// Move the snowflake down by its speed
		snowflake.y += snowflake.d;
		snowflake.x += getRandomNumber(-3, 3);
		snowflake.r = getRandomNumber(1, 6);
		snowflake.d = Math.random() * getRandomNumber(2, 10);

		// If the snowflake has fallen off the bottom of the canvas, reset it at the top
		if (snowflake.y > canvas.height) {
			snowflake.y = -10;
			snowflake.x = Math.random() * canvas.width;
		}
	}

	// Call this function again on the next frame
	requestAnimationFrame(drawSnowflakes);
}

drawSnowflakes();