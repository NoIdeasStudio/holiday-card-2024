let video;
let handPose;
let hands = [];
let canvas;
let ctx;
let fingersCanvas;
let fingersCtx;

function preload() {
  // Initialize handPose from ml5
  handPose = ml5.handPose(video, { flipped: true }, modelLoaded);
}

function modelLoaded() {
  console.log('HandPose model loaded!');
  handPose.on('hand', gotHands);
}

function gotHands(results) {
  hands = results;
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
      video.width = window.innerWidth;
      video.height = window.innerHeight;
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
  // Draw the video on the canvas
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
  // Clear the off-screen canvas (fingers drawing)
  fingersCtx.clearRect(0, 0, fingersCanvas.width, fingersCanvas.height);
  fingersCtx.fillStyle = 'rgba(255, 0, 0, 0.5)';
  fingersCtx.fillRect(0, 0, fingersCanvas.width, fingersCanvas.height);
  
  // Check for hands and draw finger positions
  if (hands.length > 0) {
    let hand = hands[0];

    // Coordinates of the tips and MCP joints for each finger
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

    // Set text style
    fingersCtx.font = '32px Arial';
    fingersCtx.fillStyle = 'rgba(141, 0, 0, 1)';
    fingersCtx.strokeStyle = 'black';
    fingersCtx.lineWidth = 1;

    // Draw text at each finger position
    fingersCtx.fillText('1', thumb1[0], thumb1[1]);
    fingersCtx.fillText('2', index2[0], index2[1]);
    fingersCtx.fillText('3', middle3[0], middle3[1]);
    fingersCtx.fillText('4', ring4[0], ring4[1]);
    fingersCtx.fillText('5', pinky5[0], pinky5[1]);

    fingersCtx.fillText('a', thumba[0], thumba[1]);
    fingersCtx.fillText('b', indexb[0], indexb[1]);
    fingersCtx.fillText('c', middlec[0], middlec[1]);
    fingersCtx.fillText('d', ringd[0], ringd[1]);
    fingersCtx.fillText('e', pinkye[0], pinkye[1]);

    fingersCtx.fillText('f', wristf[0], wristf[1]);

    // Check for distance between thumb and index finger
    let d = dist(index2[0], index2[1], thumb1[0], thumb1[1]);
    if (d < 40) {
      fingersCtx.fillStyle = 'rgb(134,134,134)';
      fingersCtx.strokeStyle = 'rgb(134,134,134)';
      fingersCtx.clearRect(0, 0, fingersCanvas.width, fingersCanvas.height); // Reset background
      fingersCtx.fillStyle = 'rgb(212,255,0)';
      fingersCtx.fillRect(0, 0, fingersCanvas.width, fingersCanvas.height);
      
      fingersCtx.fillText('1', thumb1[0], thumb1[1]);
      fingersCtx.fillText('2', index2[0], index2[1]);
    }
  }

  // Draw the off-screen canvas (fingers data) onto the main canvas
  ctx.drawImage(fingersCanvas, 0, 0);

  // Continue drawing
  requestAnimationFrame(draw);
}

function dist(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

setup();
