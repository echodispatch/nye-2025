var capture;
var fillEllipse = true;
var bg = 50;
var img; // Variable to hold the uploaded image
var message =
  "If you can see this message you've been cordially invited to join us in celebration of Dani's birthday and the upcoming new year. Time: 12/31, 10 P.M. Address: 1535 N Ashland Ave.";
var typedText =
  "You're cordially invited to join us in celebration of Dani's 26th birthday and the upcoming new year!                  12/31/2024, 10 P.M. @ 1535 N Ashland Ave.";

var charIndex = 0;
var imgOpacity = 255; // Variable for image opacity
var sound; // Variable to hold the sound

function preload() {
  // Load the image from the assets folder
  img = loadImage("bday.jpg");
  sound = loadSound("frog.mp3");
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  var constraints = {
    audio: false,
    video: {
      facingMode: {
        exact: "user",
      },
    },
  };
  capture = createCapture(constraints);

  capture.hide();
  rectMode(CENTER);
  textSize(12);
  textAlign(LEFT, TOP); // Align text to start at the top-left corner
  fill(25);
  sound.setVolume(0.5); // Set initial volume to 50%
}

function draw() {
  background(bg);

  // Display the video capture feed
  image(capture, 0, 0, width, height);

  // Draw the image inside the first square
  if (fillEllipse) {
    image(img, width / 2 - 50, height / 2 - 100, 200, 200); // Display the image in the square
  } else {
    noFill();
    imgOpacity = max(0, imgOpacity - 5); // Gradually reduce opacity
    tint(255, imgOpacity);
    image(img, width / 2 - 50, height / 2 - 100, 200, 200); // Display the image in the square
  }

  // Draw the second square above and slightly to the right
  fill(255, 255, 0, width / 2 - 50, height / 2 - 400, 100, 100); // Yellow fill
  rect(width / 2 + 75, height / 2 - 290, 165, 125);

  // Display the scrolling text inside the second square
  fill(0); // Black text
  let displayText = typedText.substring(0, charIndex);

  // Text wrapping logic
  let xOffset = width / 2 + 43 - 40;
  let yOffset = height / 2 - 335;
  let maxWidth = 150; // Width of the square minus padding
  let lines = wrapText(displayText, maxWidth);

  for (let i = 0; i < lines.length; i++) {
    text(lines[i], xOffset, yOffset + i * 15); // Adjust line spacing
  }

  // Simulate typing effect
  if (charIndex < message.length) {
    charIndex += 1;
  }
}

function wrapText(txt, maxWidth) {
  let words = txt.split(" ");
  let lines = [];
  let currentLine = "";

  for (let word of words) {
    let testLine = currentLine + word + " ";
    if (textWidth(testLine) > maxWidth) {
      lines.push(currentLine.trim());
      currentLine = word + " ";
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine.trim());
  return lines;
}

function touchStarted() {
  {
    sound.play(); // Play the sound
  }
}

function touchEnded() {
  {
    sound.play(); // Stop the sound...?
  }
}

function touchMoved() {
  // Prevent default touch behavior
  return false;
}
