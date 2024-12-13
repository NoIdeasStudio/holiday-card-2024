
$(window).bind('resize', function(e)
{
  if (window.RT) clearTimeout(window.RT);
  window.RT = setTimeout(function()
  {
    this.location.reload(false); /* false to get page from cache */
  }, 100);
});

const video = document.getElementById('webcam-video');



function requestCameraAccess() {

    if (navigator.mediaDevices.getUserMedia) { 

        navigator.mediaDevices.getUserMedia({ video: true })

            .then(stream => {

                video.srcObject = stream;

            })

            .catch(error => {

                console.error('Error accessing camera:', error);

                // Handle error, maybe display a message to the user

            });

    } else {

        console.error('getUserMedia is not supported by your browser.');

    }

}



// When the user clicks the "Allow Camera Access" button:

document.getElementById('grant-camera-access').addEventListener('click', requestCameraAccess);

