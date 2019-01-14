// detectViewportOffset
//
// Detect & set the offset (scrollbar width) between the window width and
// the viewport width, for later use, if vertical scroll bars are present.
// This value can be variable from one OS to another.

const detectViewportOffset = () => {
  let offsetWidth = window.innerWidth - document.body.clientWidth;
  let viewPortEl = document.getElementById('viewport');
  let viewPortHeight = `height=${window.innerHeight}, initial-scale=1`;

  document.body.setAttribute('data-offset', offsetWidth);
  viewPortEl.setAttribute('content', `width=device-width, ${viewPortHeight}`);
};

detectViewportOffset();
