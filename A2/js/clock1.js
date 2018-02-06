var sec_xs=[], sec_ys=[], sec_angles=[];
var min_xs=[], min_ys=[], min_angles=[];
var leaf_colors = ['rgba(81,149,72,1)', 'rgba(136,196,37,1)', 'rgba(190,242,2,1)'];
var flower_colors = ['rgba(204,97,71,1)', 'rgba(240,159,39,1)', '#CC724C'];
var bkgrd_color = 'rgba(27,103,107,1)';

function setup() {
  createCanvas(640, 640);
  background(bkgrd_color);
  frameRate(1);            // 1 FPS
  stroke(bkgrd_color);
  angleMode(DEGREES);

  //populate arrays for flower, leaf coordinates
  for (var i = 0; i < 60; i++) {
    sec_xs[i] = random(width);
    sec_ys[i] = random(height);
    sec_angles[i] = random(360);
    min_xs[i] = random(width);
    min_ys[i] = random(height);
    min_angles[i] = random(360);
  }
}

function draw() {
  background(bkgrd_color);

  for (var i = 0; i <= second(); i++) {
    drawLeaf(sec_xs[i], sec_ys[i], sec_angles[i], i%leaf_colors.length);
  }

  for (var i = 0; i <= minute(); i++) {
    drawFlower(min_xs[i], min_ys[i], min_angles[i], hour(), i%flower_colors.length);
  }

  showTime();
}

function drawLeaf(x, y, angle, color) {
  push();
  translate(x, y);
  rotate(angle);
  stroke(bkgrd_color);
  fill(leaf_colors[color]);
  ellipse(0, 0, 13, 26);
  line(0,-4,0,13);
  stroke(leaf_colors[color]);
  line(0,12,0,18);
  pop();
}

function drawFlower(x, y, angle, petals, color) {
  push();
  fill(flower_colors[color]);
  translate(x, y);
  rotate(angle);
  for (var i = 0; i < petals; i++) {
    push();
    rotate(360*i/petals);
    ellipse(0, 13, 26*pow(0.92, petals), 26);
    pop();
  }
  fill('#E9D558');
  ellipse(0,0,10,10);
  pop();
}

function testFlowers() {
  for (var i = 0; i < 24; i++) {
    drawFlower(50+100*(i%6), 50+100*(i/6), i+1, i%flower_colors.length);
  }
}

function twoDigits(number) {
  return ("0" + number).slice(-2);
}

function showTime() {
  rectMode(CORNER);
  fill('rgba(27,103,107,0.5)');
  // fill('red');
  rect(20, 570, 70, 50);

  var time = '';
  time += twoDigits(hour()) + (hour() == 1 ? ' petal\n' : ' petals\n');
  time += twoDigits(minute()) + (minute() == 1 ? ' flower\n' : ' flowers\n');
  time += twoDigits(second()) + (second() == 1 ? ' leaf\n' : ' leaves');

  textSize(12);
  fill('rgba(190,242,2,0.75)');
  text(time, 25, 585);
}
