const videoButton = document.getElementById('startVideo');



videoButton.addEventListener('click', () => {

  navigator.mediaDevices.getUserMedia({ video: true })

    .then(stream => {

      // Start video recording using the stream

    })

    .catch(error => {

      // Handle error, maybe display a message to the user

    });

});