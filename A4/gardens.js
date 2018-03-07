var table;
var gardenCounts = {};
var keysABC = [];
var keys123 = [];
var maxGardens = 0, maxGardensCBs = [];

// drawing constants
var dotW = 5;
var labelTextSize = 10;
// var margin = 50;
// Colors for each borough
var colors = {  M: '#308890',     // Manhattan
                B: '#E87182',     // Brooklyn
                Q: '#D8AF39',     // Queens
                X: '#58A449',     // Bronx
                N: '#7772AF',     // N/A
                R: '#E48C2A'};    // Staten Island?

// state variables
var state = 0; // 0:= alphabetical; 1:= by number of gardens

// Display 'Loading...' on the screen so we see something's happening
function preload() {
  table = loadTable('NYC_Greenthumb_Community_Gardens_short.csv', 'csv', 'header');
}

function setup() {
  button = createButton('toggle');
  button.mousePressed(toggleState);

  // createCanvas(windowWidth, windowHeight);
  createCanvas(1440, 620);
  loadData();

  textAlign(CENTER);
  textSize(labelTextSize);
}

function draw() {
  background('#403B38');
  stroke(153);
  // line(20, 20, 20, 580);    // y-axis
  line(20, 580, 1430, 580); // x-axis

  noStroke();
  var x = 40;
  var keys = (state == 0) ? keysABC : keys123;
  for (var i = 0; i < keys.length; i++) {
    for (var j = 0; j < gardenCounts[keys[i]]; j++) {
      drawFlowerBud(x, 570-j*10, keys[i].charAt(0));
    }
    fill(153);
    text(keys[i], x, 600);
    x += 25;
  }

}

function loadData() {
  var communityBoards = table.getColumn('Community Board');

  // iterate through all community boards and
  // count how many community gardens are in each
  communityBoards.forEach(function(cb) {
    if (cb in gardenCounts) {
      gardenCounts[cb]++;
    } else {
      gardenCounts[cb] = 1;
    }
  });

  // order by community board name
  for (var k in gardenCounts) {
    if (gardenCounts.hasOwnProperty(k)) {
      keysABC.push(k);
      keys123.push(k);
    }
  }
  keysABC.sort();
  keys123.sort(function(a,b){return gardenCounts[b]-gardenCounts[a]});
  console.log(gardenCounts);

}

function toggleState() {
  state = (state == 0) ? 1 : 0;
}

function drawFlowerBud(x, y, colorKey) {
  fill('rgba(255,100,230,0.6)');
  fill(colors[colorKey]);
  ellipse(x, y, dotW);
}
