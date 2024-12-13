// const videoElement = document.querySelector('.input_video');
// const canvasElement = document.querySelector('.output_canvas');
// const canvasCtx = canvasElement.getContext('2d');

// const handsModel = new Hands({
//   locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
// });

// handsModel.setOptions({
//   maxNumHands: 2,
//   modelComplexity: 1,
//   minDetectionConfidence: 0.5,
//   minTrackingConfidence: 0.5
// });

// // Function to clear existing landmarks (if any)
// function clearLandmarks() {
//   const existingLandmarks = document.querySelectorAll('.landmark');
//   existingLandmarks.forEach(landmark => landmark.remove());
// }

// // Function to position a div at a given landmark position with unique class
// function positionLandmarkDiv(landmark, id, className, text) {
//   const landmarkDiv = document.getElementById(id) || document.createElement('div');
//   landmarkDiv.id = id;

//   // Assign a unique class based on the type of landmark (wrist, mcp, tip)
//   landmarkDiv.classList.add('landmark-div', className); // Add both the shared and unique class
//   document.body.appendChild(landmarkDiv);

//   const x = landmark.x * canvasElement.width;
//   const y = landmark.y * canvasElement.height;

//   // Adjust for the mirrored canvas (flip effect)
//   const adjustedX = canvasElement.width - x; // Mirror the x-coordinate

//   // Use transform: translate() for smoother movement
//   landmarkDiv.style.transform = `translate(${adjustedX}px, ${y}px)`;

//   // Set the text content of the div
//   landmarkDiv.textContent = text;
// }

// // Function to handle the results from the model
// function onResults(results) {
//   // Resize canvas to match the window dimensions
//   clearLandmarks();
  
//   canvasElement.width = window.innerWidth;  // Set internal width based on window size
//   canvasElement.height = window.innerHeight;  // Set internal height based on window size

//   // Flip the canvas horizontally
//   canvasCtx.scale(-1, 1);  // Horizontal flip for mirror effect
//   canvasCtx.translate(-canvasElement.width, 0); // Correct translation

//   canvasCtx.fillStyle = '#FF0000';  // Solid gray color
//   canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

//   if (results.multiHandLandmarks) {
//     // Loop through each detected hand
//     results.multiHandLandmarks.forEach((landmarks, handIndex) => {
//       // Extract wrist landmark (index 0)
//       const wrist = landmarks[0]; // Wrist is at index 0 in the landmarks array
//       const wristDivId = `wrist-div-${handIndex}`;
//       positionLandmarkDiv(wrist, wristDivId, `wrist-${handIndex}`, "f");
      

// // Handle MCP points (indices 1, 5, 9, 13, 17) individually
// const mcp1 = landmarks[1];
// const mcpDivId1 = `mcp-div-${handIndex}-1`;
// positionLandmarkDiv(mcp1, mcpDivId1, `mcp-${handIndex}-1`, "a");

// const mcp2 = landmarks[5];
// const mcpDivId2 = `mcp-div-${handIndex}-2`;
// positionLandmarkDiv(mcp2, mcpDivId2, `mcp-${handIndex}-2`, "b");

// const mcp3 = landmarks[9];
// const mcpDivId3 = `mcp-div-${handIndex}-3`;
// positionLandmarkDiv(mcp3, mcpDivId3, `mcp-${handIndex}-3`, "c");

// const mcp4 = landmarks[13];
// const mcpDivId4 = `mcp-div-${handIndex}-4`;
// positionLandmarkDiv(mcp4, mcpDivId4, `mcp-${handIndex}-4`, "d");

// const mcp5 = landmarks[17];
// const mcpDivId5 = `mcp-div-${handIndex}-5`;
// positionLandmarkDiv(mcp5, mcpDivId5, `mcp-${handIndex}-5`, "e");

// // Handle finger tip points (indices 4, 8, 12, 16, 20) individually
// const tip1 = landmarks[4];
// const tipDivId1 = `tip-div-${handIndex}-1`;
// positionLandmarkDiv(tip1, tipDivId1, `tip-${handIndex}-1`, "1");

// const tip2 = landmarks[8];
// const tipDivId2 = `tip-div-${handIndex}-2`;
// positionLandmarkDiv(tip2, tipDivId2, `tip-${handIndex}-2`, "2");

// const tip3 = landmarks[12];
// const tipDivId3 = `tip-div-${handIndex}-3`;
// positionLandmarkDiv(tip3, tipDivId3, `tip-${handIndex}-3`, "3");

// const tip4 = landmarks[16];
// const tipDivId4 = `tip-div-${handIndex}-4`;
// positionLandmarkDiv(tip4, tipDivId4, `tip-${handIndex}-4`, "4");

// const tip5 = landmarks[20];
// const tipDivId5 = `tip-div-${handIndex}-5`;
// positionLandmarkDiv(tip5, tipDivId5, `tip-${handIndex}-5`, "5");


      
//     });
//   }

//   // Request the next animation frame for smoother updates
//   requestAnimationFrame(() => onResults(results));
// }

// // Set up the camera
// const camera = new Camera(videoElement, {
//   onFrame: async () => {
//     await handsModel.send({ image: videoElement });
//   },
//   width: window.innerWidth,
//   height: window.innerHeight
// });

// camera.start();

// // Set the hands model to use the onResults function
// handsModel.onResults(onResults);

                                    // const videoElement = document.querySelector('.input_video');
                                    // const canvasElement = document.querySelector('.output_canvas');
                                    // const canvasCtx = canvasElement.getContext('2d');

                                    // const handsModel = new Hands({
                                    //   locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
                                    // });

                                    // handsModel.setOptions({
                                    //   maxNumHands: 2,                   // Track up to 2 hands
                                    //   modelComplexity: 1,               // Full model (more accuracy, slower)
                                    //   minDetectionConfidence: 0.7,     // Require at least 70% confidence for detection
                                    //   minTrackingConfidence: 0.7       // Require at least 70% confidence for tracking
                                    // });

                                    // // Function to clear existing landmarks (if any)
                                    // function clearLandmarks() {
                                    //   const existingLandmarks = document.querySelectorAll('.landmark');
                                    //   existingLandmarks.forEach(landmark => landmark.remove());
                                    // }

                                    // // Function to position a div at a given landmark position with unique class
                                    // function positionLandmarkDiv(landmark, id, className, text) {
                                    //   let landmarkDiv = document.getElementById(id);
                                    //   if (!landmarkDiv) {
                                    //     landmarkDiv = document.createElement('div');
                                    //     landmarkDiv.id = id;
                                    //     landmarkDiv.classList.add('landmark-div', className); // Add both the shared and unique class
                                    //     document.body.appendChild(landmarkDiv);
                                    //   }

                                    //   const x = landmark.x * canvasElement.width;
                                    //   const y = landmark.y * canvasElement.height;

                                    //   // Adjust for the mirrored canvas (flip effect)
                                    //   const adjustedX = canvasElement.width - x; // Mirror the x-coordinate

                                    //   // Use transform: translate() for smoother movement
                                    //   landmarkDiv.style.transform = `translate(${adjustedX}px, ${y}px)`;

                                    //   // Set the text content of the div
                                    //   landmarkDiv.textContent = text;
                                    // }

                                    // // Function to handle the results from the model
                                    // function onResults(results) {
                                    //   // Resize canvas to match the window dimensions
                                    //   clearLandmarks();

                                    //   canvasElement.width = window.innerWidth;  // Set internal width based on window size
                                    //   canvasElement.height = window.innerHeight;  // Set internal height based on window size

                                    //   // Flip the canvas horizontally
                                    //   canvasCtx.scale(-1, 1);  // Horizontal flip for mirror effect
                                    //   canvasCtx.translate(-canvasElement.width, 0); // Correct translation

                                    //   canvasCtx.fillStyle = '#FF0000';  // Solid red color
                                    //   canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

                                    //   if (results.multiHandLandmarks) {
                                    //     // Loop through each detected hand
                                    //     results.multiHandLandmarks.forEach((landmarks, handIndex) => {
                                    //       // Extract wrist landmark (index 0)
                                    //       const wrist = landmarks[0]; // Wrist is at index 0 in the landmarks array
                                    //       const wristDivId = `wrist-div-${handIndex}`;
                                    //       positionLandmarkDiv(wrist, wristDivId, `wrist-${handIndex}`, "f");

                                    //       // Handle MCP points (indices 1, 5, 9, 13, 17) individually
                                    //       const mcpPoints = [1, 5, 9, 13, 17];
                                    //       mcpPoints.forEach((index, i) => {
                                    //         const mcp = landmarks[index];
                                    //         const mcpDivId = `mcp-div-${handIndex}-${i}`;
                                    //         positionLandmarkDiv(mcp, mcpDivId, `mcp-${handIndex}-${i}`, String.fromCharCode(97 + i));  // a, b, c, d, e
                                    //       });

                                    //       // Handle finger tip points (indices 4, 8, 12, 16, 20) individually
                                    //       const tipPoints = [4, 8, 12, 16, 20];
                                    //       tipPoints.forEach((index, i) => {
                                    //         const tip = landmarks[index];
                                    //         const tipDivId = `tip-div-${handIndex}-${i}`;
                                    //         positionLandmarkDiv(tip, tipDivId, `tip-${handIndex}-${i}`, String(i + 1));  // 1, 2, 3, 4, 5
                                    //       });
                                    //     });
                                    //   }

                                    //   // Request the next animation frame for smoother updates
                                    //   requestAnimationFrame(() => onResults(results));
                                    // }

                                    // // Set up the camera
                                    // const camera = new Camera(videoElement, {
                                    //   onFrame: async () => {
                                    //     await handsModel.send({ image: videoElement });
                                    //   },
                                    //   width: window.innerWidth,
                                    //   height: window.innerHeight
                                    // });

                                    // camera.start();

                                    // // Set the hands model to use the onResults function
                                    // handsModel.onResults(onResults);

