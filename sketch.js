function setup() {
  createCanvas(640, 480);
}

// hour()     0-23
// minute()   0-59

function draw() {
  var change;

  background('#15534C');
  noStroke();

  // small circle grows according to seconds
  fill('#297159');
  change = map(second(), 0, 59, 30, 100);
  // text(change, 300, 50);
  ellipse(530, 100, change, change);

  // largest circle grows according to hour
  fill('#73AC61');
  change = map(hour(), 0, 23, 240, 400)
  ellipse(240, 240, change, change);

  // a constant circle to frame the face
  fill('#498F60');
  ellipse(240, 240, 240, 240);

  fill('#E2E062');
  textAlign(CENTER);
  textSize(24);
  text('Have a good day!', 520, 380);

  // face rotates according to minute
  translate(240, 240);   // move center of rotation
  change = map(minute(), 0, 59, -1.5*PI, 0.5*PI);
  rotate(change);
  textSize(128);
  text(':-)', 0, 32);

}
