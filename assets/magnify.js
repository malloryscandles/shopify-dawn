// create a container and set the full-size image as its background
const createOverlay = (image) => {
  overlay = document.createElement('div');
  overlay.setAttribute('class', 'image--full-size');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.style.backgroundImage = `url('${image.src}')`;
  return overlay;
};

const moveWithHover = (image, event, zoomRatio) => {
  // calculate mouse position
  const ratio = image.height / image.width;
  const container = event.target.getBoundingClientRect();
  const xPosition = event.clientX - container.left;
  const yPosition = event.clientY - container.top;
  const xPercent = `${xPosition / (overlay.clientWidth / 100)}%`;
  const yPercent = `${yPosition / ((overlay.clientWidth * ratio) / 100)}%`;

  // determine what to show in the frame
  overlay.style.backgroundPosition = `${xPercent} ${yPercent}`;
  overlay.style.backgroundSize = `${image.width * zoomRatio}px`;
};

const magnify = (image, zoomRatio) => {
  // add full-size image on top of original
  const overlay = createOverlay(image);
  image.parentElement.insertBefore(overlay, image);

  overlay.onclick = () => overlay.remove();
  overlay.onmousemove = (event) => moveWithHover(image, event, zoomRatio);
}

const images = document.querySelectorAll('.image--original');

images.forEach(image => {
  image.onclick = () => magnify(image, 3);
});
