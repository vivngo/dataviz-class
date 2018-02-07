function setup() {
  createCanvas(640, 640);
  background('black');
  textSize(16);
  textAlign(CENTER);
  fill('teal');
  text("loading...", 320, 320);

  frameRate(1);            // 1 FPS
  angleMode(DEGREES);
  textAlign(LEFT);
}

function draw() {
  background('black');
  translate(320, 320);

  var minuteAngle = map(minute() + norm(second(), 0, 60), 0, 60, 0, 360) - 90;
  var planet_x = 200*cos(minuteAngle);
  var planet_y = 200*sin(minuteAngle);
  var secondAngle = map(second(), 0, 60, 0, 360) - 90;
  var moon_x = 50*cos(secondAngle);
  var moon_y = 50*sin(secondAngle);

  drawOrbitAroundSun();
  drawOrbitAroundPlanet(planet_x, planet_y);
  drawSun();
  drawPlanet(planet_x, planet_y);
  drawMoon(planet_x, planet_y, moon_x, moon_y);

  showTime();
}

function drawSun() {
  fill('orange');
  var diameter = map(hour() + norm(minute(), 0, 60), 0, 24, 80, 140);
  ellipse(0, 0, diameter, diameter);
}

function drawPlanet(x, y) {
  fill('indigo');
  ellipse(x, y, 30, 30);
}

function drawMoon(px, py, mx, my) {
  fill('teal');
  ellipse(px+mx, py+my, 15, 15);
}

function drawOrbitAroundSun() {
  fill('rgba(0, 0, 0, 0)');
  for (var i = 0; i < 360; i++) {
    if (i % 2) {
      stroke('black');
    } else {
      stroke('white');
    }
    arc(0, 0, 400, 400, i, i+1);
  }
}

function drawOrbitAroundPlanet(x, y) {
  push();
  fill('rgba(0, 0, 0, 0)');
  for (var i = 0; i < 120; i++) {
    if (i % 2) {
      stroke('black');
    } else {
      stroke('white');
    }
    arc(x, y, 100, 100, 3*i, 3*i+3);
  }
  pop();
}

function twoDigits(number) {
  return ("0" + number).slice(-2);
}

function showTime() {
  rectMode(CORNER);
  fill('black');
  rect(-300, 220, 70, 50);

  var time = '';
  time += twoDigits(hour()) + ':';
  time += twoDigits(minute()) + ':';
  time += twoDigits(second());

  textSize(12);
  fill('teal');
  text(time, -295, 265);
}
