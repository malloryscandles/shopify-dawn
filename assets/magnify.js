const images = document.querySelectorAll('.product__media-image');

const magnify = (image, scale) => {
  let glass, w, h, bw;

  glass = document.createElement("div");
  glass.setAttribute("class", "img-magnifier-glass");
  image.parentElement.insertBefore(glass, image);

  glass.addEventListener('click', () => {
    glass.remove();
  });

  /* Set background properties for the magnifier glass: */
  glass.style.backgroundImage = "url('" + image.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = (image.width * scale) + "px " + (image.height * scale) + "px";
  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;

  /* Execute a function when someone moves the magnifier glass over the image: */
  glass.addEventListener("mousemove", moveMagnifier);
  image.addEventListener("mousemove", moveMagnifier);

  function moveMagnifier(e) {
    var pos, x, y;
    /* Prevent any other actions that may occur when moving over the image */
    e.preventDefault();
    /* Get the cursor's x and y positions: */
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;
    /* Prevent the magnifier glass from being positioned outside the image: */
    if (x > image.width - (w / scale)) {x = image.width - (w / scale);}
    if (x < w / scale) {x = w / scale;}
    if (y > image.height - (h / scale)) {y = image.height - (h / scale);}
    if (y < h / scale) {y = h / scale;}
    /* Set the position of the magnifier glass: */
    glass.style.left = (x - w) + "px";
    glass.style.top = (y - h) + "px";
    /* Display what the magnifier glass "sees": */
    glass.style.backgroundPosition = "-" + ((x * scale) - w + bw) + "px -" + ((y * scale) - h + bw) + "px";
  }

  function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /* Get the x and y positions of the image: */
    a = image.getBoundingClientRect();
    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}

images.forEach(image => {
  image.addEventListener('click', () => {
    magnify(image, 2);
  });
});
