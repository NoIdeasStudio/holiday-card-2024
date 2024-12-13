const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');

function onResults(results) {
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height);
  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                     {color: '#00FF00', lineWidth: 5});
      drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
    }
  }
  canvasCtx.restore();
}

const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});
hands.setOptions({
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});
hands.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
  },
  width: 1280,
  height: 720
});
camera.start();







// let video;
// var h, w;
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
//   video.size(1200, windowHeight);
//   video.position(0 ,  )
//   handPose.detectStart(video, gotHands);
//   frameRate(20);
// }

// function draw() {
//   image(video, 0, 0);
//   image(fingers, 0, 0);
//   fingers.background(255,0,0);

//   beginShape();
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
//     let d1 = dist(middle3.x, middle3.y, thumb1.x, thumb1.y);
//     let d2 = dist(ring4.x, ring4.y, thumb1.x, thumb1.y);
//     let d3 = dist(pinky5.x, pinky5.y, thumb1.x, thumb1.y);
//     let d4 = dist(index2.x, index2.y, thumb1.x, thumb1.y);

//     if ( d < 60) {
//       fingers.textSize(32);
//       fingers.strokeWeight(0);
//       fingers.background(212,255,0);
//       fingers.text('1', thumb1.x, thumb1.y);
//       fingers.text('2', index2.x, index2.y);
//     } else if (d > 60 && d1 < 60 ){
//       fingers.textSize(32);
//       fingers.strokeWeight(0);
//       fingers.background(212,255,0);
//       fingers.text('1', thumb1.x, thumb1.y);
//       fingers.text('3', middle3.x, middle3.y);
//     } else if (d > 60 && d1 > 60 &&  d2 < 60){
//       fingers.textSize(32);
//       fingers.strokeWeight(0);
//       fingers.background(212,255,0);
//       fingers.text('1', thumb1.x, thumb1.y);
//       fingers.text('4', ring4.x, ring4.y);
//     } else if (d > 60 && d1 > 60 &&  d2 > 60 && d3 < 60){
//       fingers.textSize(32);
//       fingers.strokeWeight(0);
//       fingers.background(212,255,0);
//       fingers.text('job', thumb1.x, thumb1.y);
//       fingers.text('good', pinky5.x, pinky5.y);
//     }
    

//     endShape();
    
//   }
  
// }

// function windowResized() { 
//   if(windowWidth < 2000) {
//       fingers.textSize(80);
//   } else {
//       size = 100;
//   }
// }

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
//   fingers(windowWidth, windowHeight);
// }
