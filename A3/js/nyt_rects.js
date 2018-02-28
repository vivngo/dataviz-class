var headlines = [];
var nytFont;

function preload() {

  // Assemble url for API call
  var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
  var apikey = "5565931934c74ea4813794dbeabd282e"; // see: https://developer.nytimes.com
  url += "?api-key=" + apikey;

  nytResponse = loadJSON(url);
  // loadJSON() is asynchronous, but calling it inside preload() guarantees
  // we'll have a response before setup() and draw() is run.

  // Load NYT font
  nytFont = loadFont('assets/cheltenham-normal-300.ttf');
}

function setup() {
  createCanvas(640, 1500);
  background(50);
  textFont(nytFont);

  console.log(nytResponse);

  extractHeadlines();
}

function draw() {
  background(50);
  textSize(16);
  noStroke();
  textAlign(LEFT, TOP);

  var margin = 40;
  translate(margin, margin);

  for (var i = 0; i < headlines.length; i++) {
    // split into words, sorted by length, greatest to least
    var words = headlines[i].split(" ");
    words.sort(function(a, b) {
      return textWidth(b) - textWidth(a);
    });

    // draw rectangles for each word
    var offset = 0;
    for (var j = 0; j < words.length; j++) {
      var wordWidth = textWidth(words[j]);
      fill(map(wordWidth, 0, 110, 200, 55));  // darker if longer
      rect(offset, i*25, wordWidth+1, 20);
      if (mouseIsPressed) {
        console.log("click!");
        fill(0);
        text(words[j], offset+0.3, i*25);
      }
      // four pixels between words
      offset += wordWidth + 5;
    }

    // draw headline
    // fill(150);
    // text(headlines[i], 0, i*lineheight);
  }
}

function extractHeadlines() {
  for (var i = 0; i < nytResponse.results.length; i++) {
    var h = nytResponse.results[i].title;
    // besides .title, other text data available to you include:
    // .abstract, .byline, .section, etc. etc.
    append(headlines, h);
  }

  // console.log(headlines); // make sure counted data looks as expected
}
