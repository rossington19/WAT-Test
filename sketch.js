var runningTimer = 0;
var restingTimer = 5;
var counter = -1;
var resting = false;
var runTimes = [];

var times

let polySynth;

function setup() {
	createCanvas(600,900);
	setInterval(time_Running, 100);
	polySynth = new p5.PolySynth();
	userStartAudio();	
}

function draw() {
	fill(250);
	textAlign(CENTER, CENTER)
	textSize(150);

	if (counter >= 10 || counter === -1){
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
	textSize(30);
	text("Runs complete: " + counter, width/2, 250);
	
	for(var i = 0; i < 10; i++){
		var timeVal = "---";
		if (i < counter){
			timeVal = runTimes[i];
		}
		text("Run " + (i+1) + " time: " + timeVal, width/2, 300+(i*40));
	}

	textSize(40);
	var totalTime = runTimes.reduce((a, b) => a + b, 0);
	text("Average Time: " + (totalTime/runTimes.length).toFixed(1), width/2, 725);
	text("Total Time: " + totalTime.toFixed(1), width/2, 800);


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
		restingTimer = 1;
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
	if(!resting && counter < 10 ){
		runTimes.push(runningTimer);
		endRun();
	}
}



