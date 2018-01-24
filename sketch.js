function setup() {
  createCanvas(640, 480);
}

function draw() {
  background('#15534C');

  noStroke();

  fill('#297159');
  ellipse(320, 240, 380, 380);

  fill('#73AC61');
  ellipse(320, 240, 320, 320);

  fill('#498F60');
  ellipse(320, 240, 240, 240);

  fill('#E2E062');
  textSize(32);
  textAlign(CENTER);
  text('Hello World!', 320, 256);
}
