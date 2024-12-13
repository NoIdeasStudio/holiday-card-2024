// let video;
// let handPose;
// let hands = [];
// let painting;

// function preload() {
//   handPose = ml5.handPose({ flipped: true });
// }

// function mousePressed() {
//   console.log(hands);  
// }

// function gotHands(results) {
//   hands = results;
// }

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   fingers = createGraphics(windowWidth, windowHeight);
  
//   video = createCapture(VIDEO, { flipped: true });
//   video.hide();
//   video.size(windowWidth, windowHeight);
//   handPose.detectStart(video, gotHands);
//   frameRate(20);
// }

// function draw() {
//   image(video, 0, 0);
//   image(fingers, 0, 0);
//   fingers.background(255,0,0);
//   if (hands.length > 0) {
//     let hand = hands[0];

//     let thumb1 = hand.thumb_tip;
//     let thumba = hand.thumb_mcp;

//     let index2 = hand.index_finger_tip;
//     let indexb = hand.index_finger_mcp;

//     let middle3 = hand.middle_finger_tip;
//     let middlec = hand.middle_finger_mcp;

//     let ring4 = hand.ring_finger_tip;
//     let ringd = hand.ring_finger_mcp;

//     let pinky5 = hand.pinky_finger_tip;
//     let pinkye = hand.pinky_finger_mcp;

//     let wristf = hand.wrist;

//     fingers.textSize(32);
//     fingers.fill(141,0,0);
//     fingers.stroke(0);
//     fingers.strokeWeight(0);

//     fingers.text('1', thumb1.x, thumb1.y);
//     fingers.text('2', index2.x, index2.y);
//     fingers.text('3', middle3.x, middle3.y);
//     fingers.text('4', ring4.x, ring4.y);
//     fingers.text('5', pinky5.x, pinky5.y);

//     fingers.text('a', thumba.x, thumba.y);
//     fingers.text('b', indexb.x, indexb.y);
//     fingers.text('c', middlec.x, middlec.y);
//     fingers.text('d', ringd.x, ringd.y);
//     fingers.text('e', pinkye.x, pinkye.y);

//     fingers.text('f', wristf.x, wristf.y);

//     let d = dist(index2.x, index2.y, thumb1.x, thumb1.y);
//     if ( d < 40) {
//       fingers.textSize(32);
//       fingers.fill(134,134,134);
//       fingers.stroke(134,134,134);
//       fingers.strokeWeight(0);
//       fingers.background(212,255,0);
//       fingers.text('1', thumb1.x, thumb1.y);
//       fingers.text('2', index2.x, index2.y);
//     }
    
//   }
  
// }


let video;
let handPose;
let hands = [];
let fingers;
let scaleX, scaleY;

function preload() {
  // Initialize the ml5 hand pose model
  handPose = ml5.handPose({ flipped: true }, modelLoaded);
}

function modelLoaded() {
  console.log("HandPose model loaded!");
  handPose.on('hand', gotHands);  // Set up the 'hand' event listener
}

function gotHands(results) {
  hands = results;  // Update the hands array with the detected hand(s)
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fingers = createGraphics(windowWidth, windowHeight);  // Create the fingers graphics object

  // Set up the video capture
  video = createCapture(VIDEO, { flipped: true });
  video.hide();
  video.size(windowWidth, windowHeight);

  // Calculate scaling factors to map the video feed to the canvas
  scaleX = width / video.width;
  scaleY = height / video.height;

  // Start hand pose detection
  handPose.detectStart(video, gotHands);

  frameRate(20); // Set the frame rate for detection
}

function draw() {
  // Draw the video feed on the canvas
  image(video, 0, 0, width, height);
  
  // Draw the fingers on the off-screen graphics canvas
  image(fingers, 0, 0);
  
  fingers.clear();  // Clear the graphics canvas for each frame
  fingers.background(255, 0, 0, 100);  // Light red background for visibility

  if (hands.length > 0) {
    let hand = hands[0];  // Get the first hand in the array (if any)

    // Iterate over the hand landmarks and draw them
    for (let i = 0; i < hand.landmarks.length; i++) {
      let landmark = hand.landmarks[i];
      let x = landmark[0] * scaleX;
      let y = landmark[1] * scaleY;

      // Draw a small ellipse for each landmark
      fingers.fill(0);
      fingers.noStroke();
      fingers.ellipse(x, y, 10, 10);

      // Draw the landmark index for debugging (optional)
      fingers.fill(255);
      fingers.textSize(16);
      fingers.text(i, x + 10, y);
    }

    // Additional logic: Detect when thumb and index finger are close together
    let thumbTip = hand.landmarks[4];  // Thumb tip
    let indexTip = hand.landmarks[8];  // Index tip
    let d = dist(thumbTip[0] * scaleX, thumbTip[1] * scaleY, indexTip[0] * scaleX, indexTip[1] * scaleY);

    if (d < 40) {
      fingers.fill(0, 255, 0);  // Change color to green when the fingers are close
      fingers.ellipse(thumbTip[0] * scaleX, thumbTip[1] * scaleY, 20, 20);
      fingers.ellipse(indexTip[0] * scaleX, indexTip[1] * scaleY, 20, 20);
    }
  }
}

// Function to access the `fingers` graphics object from vanilla JS
function getFingersGraphics() {
  return fingers;
}
