{
  // f08
  const takePhotoButton = document.querySelector('.takePhoto');
  let video;
  // f09
  let mediaStream;
  let imageCapture;
  // f10
  const image = new Image();
  // f11 - New Variables
  let numCol = 3, numRow = 3;
  // f12
  // const puzzlePieces = numCol * numRow;
  // const imagePieces = new Array(puzzlePieces);
  // const puzzle = [...imagePieces.keys()].map(String);
  // let pieces = numCol * numRow - 1;
  // const markers = document.querySelectorAll('a-marker');
  // f14
  // const positionMarkers = [];
  // const check = new Array(6);

  // f08
  const init = () => {
    video = document.querySelector('video');
    navigator.mediaDevices.enumerateDevices()
      .then(getStream)
      .error((error) => console.log('enumerateDevices() error: ', error));
    takePhotoButton.addEventListener('click', getPicture);
  }
    
  // f09
  const getStream = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
    }
    
    const constraints = {
      video: {
        height: 720,
        width: 720,
      }
    };
    
    navigator.mediaDevices.getUserMedia(constraints)
    .then(gotStream)
    .error((error) => console.log('getUserMedia() error: ', error));
  };

  // f09
  const gotStream = (stream) => {
    mediaStream = stream;
    video.srcObject = stream;
    imageCapture = new ImageCapture(stream.getVideoTracks()[0]);
  };

  // f10
  const getPicture = () => {
    imageCapture.takePhoto()
      .catch((error) => console.log('takePhoto() error: ', error))
      .then((img) => {
        image.src = URL.createObjectURL(img);
        // f11 - New Code
        image.addEventListener('load', () => createImagePieces(img));
        // f12 - New Code
        setInterval(() => checkDistance(), 1000);
      });
  };

  // f11 - New Code
  const createImagePieces = (image) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const pieceWidth = image.width / numCol;
    const pieceHeight = image.height / numRow;

    for (let x = 0; x < numCol; x++) {
      for (let y = 0; y < numRow; y++) {
        ctx.drawImage(image, x * pieceWidth, y * pieceHeight, pieceWidth, pieceHeight, 0, 0, canvas.width, canvas.height);
      }
      
    }

  }

  // f08
  window.addEventListener('load', () => setTimeout(() => init(), 1000));
}
