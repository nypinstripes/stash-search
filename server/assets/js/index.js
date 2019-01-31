// detectViewportOffset
//
// Detect & set the offset (scrollbar width) between the window width and
// the viewport width, for later use, if vertical scroll bars are present.
// This value can be variable from one OS to another.

const detectViewportOffset = () => {
  document.body.style.height = 'calc(100vh + 2px)';
  document.body.style.width = '100%';
  let offset = window.innerWidth - document.body.clientWidth;

  document.body.setAttribute('data-offset', offset);
  document.body.removeAttribute('style');
  let viewPortEl = document.getElementById('viewport');
  let viewPortHeight = `height=${window.innerHeight}, initial-scale=1`;
  viewPortEl.setAttribute('content', `width=device-width, ${viewPortHeight}`);
};

document.addEventListener('DOMContentLoaded', detectViewportOffset);
