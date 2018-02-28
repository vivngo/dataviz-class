var table;
var gardenCounts = {};
var maxGardens = 0, maxGardensCBs = [];

// Display "Loading..." on the screen so we see something's happening
function preload() {
  table = loadTable('NYC_Greenthumb_Community_Gardens_short.csv', 'csv', 'header');
  console.log(table);
}

// In this sketch everything happens in setup
function setup() {
  // createCanvas(windowWidth, windowHeight);
  createCanvas(1440, 620);
  background(50);
  loadData();
  noLoop();
}

function loadData() {
  var communityBoards = table.getColumn("Community Board");

  // iterate through all community boards and
  // count how many community gardens are in each
  communityBoards.forEach(function(cb) {
    if (cb in gardenCounts) {
      gardenCounts[cb]++;
    } else {
      gardenCounts[cb] = 1;
    }
  });
  console.log(gardenCounts);

  // find which community boards have the most gardens
  for (var cb in gardenCounts) {
    if (gardenCounts[cb] > maxGardens) {
      maxGardens = gardenCounts[cb];
      maxGardensCBs.push(cb);
    }
  }

  console.log("Max # gardens: " + maxGardens);
  console.log("Found in CB's: " + maxGardensCBs);

}

function draw() {
  // draw axes
  stroke(153);
  line(20, 20, 20, 580);    // y
  line(20, 580, 1430, 580); // x

  noStroke();
  textSize(10);
  textAlign(CENTER);
  var x = 40;
  for (var cb in gardenCounts) {
    for (var i = 0; i < gardenCounts[cb]; i++) {
      fill('rgba(255,100,230,0.6)');
      ellipse(x, 570-i*10, 5);
    }
    fill(153);
    text(cb, x, 600);
    x += 25;
  }

}
