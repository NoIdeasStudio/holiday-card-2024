let video;
let handPose;
let hands = [];
let fingers;

function preload() {
  handPose = ml5.handpose(); // Pas besoin de paramètre flipped ici
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fingers = createGraphics(windowWidth, windowHeight);
  
  video = createCapture(VIDEO);
  video.hide();
  video.size(windowWidth, windowHeight);
  
  handPose.on('predict', gotHands); // Démarrage de la détection
  handPose.video = video; // Associe la vidéo
  
  frameRate(20);
}

function gotHands(results) {
  hands = results; // Stocke les résultats
}

function draw() {
  background(255);
  image(video, 0, 0, windowWidth, windowHeight);
  image(fingers, 0, 0);

  if (hands.length > 0) {
    let hand = hands[0].annotations;

    // Récupère les positions des doigts
    let thumb = hand.thumb[3];
    let index = hand.indexFinger[3];
    let middle = hand.middleFinger[3];
    let ring = hand.ringFinger[3];
    let pinky = hand.pinky[3];
    let wrist = hand.palmBase[0];

    // Dessine des annotations
    fingers.clear();
    fingers.fill(255, 0, 0);
    fingers.noStroke();
    fingers.ellipse(thumb[0], thumb[1], 20, 20);
    fingers.ellipse(index[0], index[1], 20, 20);
    fingers.ellipse(middle[0], middle[1], 20, 20);
    fingers.ellipse(ring[0], ring[1], 20, 20);
    fingers.ellipse(pinky[0], pinky[1], 20, 20);
    fingers.ellipse(wrist[0], wrist[1], 20, 20);
  }
}

