const button = document.getElementById('logoSwitch');
const image = document.getElementById('topLogo');

// Add a click event listener to the button
button.addEventListener('click', function() {
  // Check the current source of the image
  // if (image.src.endsWith('images/logo/white_favicon.ico')) {
  if (image.src.endsWith('images/logo/white_favicon_nonbg.png')) {
    // Switch to black favicon if the current image is a white favicon
    // image.src = 'images/logo/black_favicon.ico';
    image.src = 'images/logo/black_favicon_nonbg.png';

    image.alt = 'Top Logo';
  } else {
    // Switch back to white favicon if the current image is black favicon
    // image.src = 'images/logo/white_favicon.ico';

    image.src = 'images/logo/white_favicon_nonbg.png';
    image.alt = 'Top Logo';
  }
});