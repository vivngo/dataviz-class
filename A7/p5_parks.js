

function setup() {
  createCanvas(640, 480);
}

function draw() {
  background('#9b8645');
  noStroke();

  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 6; j++) {
      fill('#516021');
      ellipse(40+i*60, 40+j*60, 10);
    }
  }

  fill('#8e3619');
  textAlign(CENTER);
  textSize(24);
  text('U.S. National Parks', 480, 420);
}
