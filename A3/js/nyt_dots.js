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
}

function setup() {
  createCanvas(1080, 500);
  background(50);

  console.log(nytResponse);

  extractHeadlines();
}

function draw() {
  background(50);
  noStroke();

  var margin = 30;
  translate(margin, margin);

  for (var i = 0; i < headlines.length; i++) {
    // split into words, sorted by length, greatest to least
    var words = headlines[i].split(" ");

    // draw rectangles for each word
    var offset = 0;
    var max = 0, min = 100;

    fill('rgba(150,150,230,0.6)');
    for (var j = 0; j < words.length; j++) {
      var wordWidth = textWidth(words[j]);
      if (wordWidth > max) {
        max = wordWidth;
      } else if (wordWidth < min) {
        min = wordWidth;
      }

      ellipse(i*20, map(wordWidth, 0, 100, 0, 480), 8);

      // four pixels between words
      offset += wordWidth + 5;
    }
    stroke('rgba(180,150,180,0.2)');
    line(i*20, map(max, 0, 100, 0, 480), i*20, map(min, 0, 100, 0, 480));

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
