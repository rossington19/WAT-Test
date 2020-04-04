var runningTimer = 0;
var restingTimer = 5;
var counter = 0;
var resting = false;
var runTimes = [];
var started = false;

var times

let polySynth;

function setup() {
	createCanvas(600,1100);
	setInterval(time_Running, 100);
	polySynth = new p5.PolySynth();
	userStartAudio();	
}

function draw() {
	fill(250);
	textAlign(CENTER, CENTER)
	textSize(150);

	if (counter >= 10 || !started){
		background(20, 143, 219);
		textSize(100);
		text("WAT TEST", width/2, 150);
	} else {
		if(resting){
			background(224, 52, 52);
			text(restingTimer.toFixed(0), width/2, 150);
		} else {
			background(75, 224, 52);
			text(runningTimer.toFixed(1), width/2, 150);
		}
	}

	// textAlign(LEFT)
	textSize(35);
	text("Runs complete: " + counter, width/2, 250);
	
	for(var i = 0; i < 10; i++){
		var timeVal = "---";
		if (i < counter){
			timeVal = runTimes[i];
		}
		text("Run " + (i+1) + " time: " + timeVal, width/2, 350+(i*50));
	}

	textSize(50);
	var totalTime = runTimes.reduce((a, b) => a + b, 0);
	text("Average Time: " + (totalTime/runTimes.length).toFixed(1), width/2, 900);
	textSize(60);
	textStyle(BOLD);
	text("Total Time: " + totalTime.toFixed(1), width/2, 1000);
	textStyle(NORMAL);


	if(restingTimer <= 0){
		startRun();
	}
}


function time_Running() {
	if(resting){
		restingTimer = restingTimer - 0.1;
		restingTimer = Math.round(restingTimer*100)/100;
	} else {
		runningTimer = runningTimer + 0.1;
		runningTimer = Math.round(runningTimer*100)/100;
	}
}

function startRun(){
	if (counter < 10) {
		polySynth.play('C4', 1, 0, 0.4);
		polySynth.play('E4', 1, 0, 0.2);
		polySynth.play('G7', 1, 0.2, 0.2);
		resting = false;
		restingTimer = 40;
	}
}

function endRun(){
	polySynth.play('C4', 1, 0, 0.4);
	polySynth.play('E5', 1, 0, 0.2);	
	polySynth.play('G5', 1, 0, 0.2);	
	resting = true;
	runningTimer = 0;
	counter++;
}

function mouseClicked() {
	if(!resting && counter < 10 && started){
		started = true;
		runTimes.push(runningTimer);
		endRun();
	}
	if (!started){
		started = true;
		counter = -1;
		endRun();
	}
}



