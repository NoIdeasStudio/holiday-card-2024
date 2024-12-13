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
let canvas;
let ctx;
let fingersCanvas;
let fingersCtx;
let videoWidth, videoHeight;

function preload() {
  // Initialize handPose from ml5
  handPose = ml5.handPose(video, { flipped: true }, modelLoaded);
}

function modelLoaded() {
  console.log('HandPose model loaded!');
  handPose.on('hand', gotHands);  // Listen for hand pose data
}

function gotHands(results) {
  hands = results;

  // Log the landmarks for each hand detected
  hands.forEach(hand => {
    console.log("Landmarks for the detected hand: ");
    hand.landmarks.forEach((landmark, index) => {
      console.log(`Landmark ${index}: x = ${landmark[0]}, y = ${landmark[1]}, z = ${landmark[2]}`);
    });
  });
}

function setup() {
  // Set up canvas and video elements
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  // Create an off-screen canvas for drawing finger data
  fingersCanvas = document.createElement('canvas');
  fingersCtx = fingersCanvas.getContext('2d');

  // Get the video element and set up stream
  video = document.getElementById('video');
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream;
      videoWidth = video.videoWidth;  // Get the actual video dimensions
      videoHeight = video.videoHeight;
      console.log(`Video dimensions: ${videoWidth}x${videoHeight}`);
      
      // Set the canvas size to match the window size (full-screen)
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      fingersCanvas.width = window.innerWidth;
      fingersCanvas.height = window.innerHeight;
      
      // Start detecting hands
      requestAnimationFrame(draw);
    })
    .catch((err) => {
      console.error("Error accessing webcam: ", err);
    });
}

function draw() {
  // Draw the video on the canvas, resizing the video to fit the canvas
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Clear the off-screen canvas (fingers drawing)
  fingersCtx.clearRect(0, 0, fingersCanvas.width, fingersCanvas.height);
  fingersCtx.fillStyle = 'rgba(255, 0, 0, 0.5)';
  fingersCtx.fillRect(0, 0, fingersCanvas.width, fingersCanvas.height);

  // Check for hands and draw finger positions
  if (hands.length > 0) {
    let hand = hands[0];

    // Calculate scaling factors for mapping video landmarks to canvas coordinates
    let scaleX = canvas.width / videoWidth;
    let scaleY = canvas.height / videoHeight;

    // Draw landmarks on the off-screen canvas
    drawLandmarks(hand, scaleX, scaleY);
  }

  // Draw the off-screen canvas (fingers data) onto the main canvas
  ctx.drawImage(fingersCanvas, 0, 0);

  // Continue drawing
  requestAnimationFrame(draw);
}

function drawLandmarks(hand, scaleX, scaleY) {
  let thumb1 = hand.landmarks[4];
  let thumba = hand.landmarks[2];

  let index2 = hand.landmarks[8];
  let indexb = hand.landmarks[6];

  let middle3 = hand.landmarks[12];
  let middlec = hand.landmarks[10];

  let ring4 = hand.landmarks[16];
  let ringd = hand.landmarks[14];

  let pinky5 = hand.landmarks[20];
  let pinkye = hand.landmarks[18];

  let wristf = hand.landmarks[0];

  // Set text style for landmarks
  fingersCtx.font = '32px Arial';
  fingersCtx.fillStyle = 'rgba(141, 0, 0, 1)';
  fingersCtx.strokeStyle = 'black';
  fingersCtx.lineWidth = 1;

  // Draw text at each finger position (scaled to canvas)
  fingersCtx.fillText('1', thumb1[0] * scaleX, thumb1[1] * scaleY);
  fingersCtx.fillText('2', index2[0] * scaleX, index2[1] * scaleY);
  fingersCtx.fillText('3', middle3[0] * scaleX, middle3[1] * scaleY);
  fingersCtx.fillText('4', ring4[0] * scaleX, ring4[1] * scaleY);
  fingersCtx.fillText('5', pinky5[0] * scaleX, pinky5[1] * scaleY);

  fingersCtx.fillText('a', thumba[0] * scaleX, thumba[1] * scaleY);
  fingersCtx.fillText('b', indexb[0] * scaleX, indexb[1] * scaleY);
  fingersCtx.fillText('c', middlec[0] * scaleX, middlec[1] * scaleY);
  fingersCtx.fillText('d', ringd[0] * scaleX, ringd[1] * scaleY);
  fingersCtx.fillText('e', pinkye[0] * scaleX, pinkye[1] * scaleY);

  fingersCtx.fillText('f', wristf[0] * scaleX, wristf[1] * scaleY);

  // Check for distance between thumb and index finger (scaled coordinates)
  let d = dist(index2[0] * scaleX, index2[1] * scaleY, thumb1[0] * scaleX, thumb1[1] * scaleY);
  if (d < 40) {
    fingersCtx.fillStyle = 'rgb(134,134,134)';
    fingersCtx.strokeStyle = 'rgb(134,134,134)';
    fingersCtx.clearRect(0, 0, fingersCanvas.width, fingersCanvas.height); // Reset background
    fingersCtx.fillStyle = 'rgb(212,255,0)';
    fingersCtx.fillRect(0, 0, fingersCanvas.width, fingersCanvas.height);
    
    fingersCtx.fillText('1', thumb1[0] * scaleX, thumb1[1] * scaleY);
    fingersCtx.fillText('2', index2[0] * scaleX, index2[1] * scaleY);
  }
}

function dist(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

setup();