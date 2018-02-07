var red       = '#FF003A';
var teal      = '#00BD8D';
var yellow    = '#FFAC00';
var orange    = '#FF6900';
var eggshell  = '#FFECC8';

function setup() {
  createCanvas(640, 480);
  background('black');
  noStroke();
  frameRate(1);
  rectMode(CORNER);
  textAlign(CENTER);
  textSize(32);
}

function draw() {
  background('black');

  drawLantern1();
  drawLantern2();
  drawLantern3();
}

function twoDigits(number) {
  return ("0" + number).slice(-2);
}

function drawLantern1() {
  var length = map(hour(), 0, 23, 10, 340);
  push();
  stroke('#333');
  line(140, 0, 140, length);
  translate(100, length);
  fill('#222');
  rect(20, -10, 40, 120);
  fill('#FF003A');
  noStroke();
  rect(0, 0, 80, 100, 30);
  fill('black');
  text(twoDigits(hour()), 40, 60);
  pop();
}

function drawLantern2() {
  var length = map(minute(), 0, 59, 10, 340);
  push();
  stroke('#333');
  line(320, 0, 320, length);
  translate(280, length);
  fill('#222');
  rect(20, -10, 40, 120);
  fill(teal);
  noStroke();
  rect(0, 0, 80, 100, 30);
  fill('black');
  text(twoDigits(minute()), 40, 60);
  pop();
}

function drawLantern3() {
  var length = map(second(), 0, 59, 10, 340);
  push();
  stroke('#333');
  line(500, 0, 500, length);
  translate(460, length);
  fill('#222');
  rect(20, -10, 40, 120);
  fill(yellow);
  noStroke();
  rect(0, 0, 80, 100, 30);
  fill('black');
  text(twoDigits(second()), 40, 60);
  pop();
}
