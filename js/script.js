var elem = document.querySelector('.carousel');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'left',
  contain: true,
  hash: true,
  pageDots: false
});
var stopButton = document.querySelector('.stop-button');
stopButton.addEventListener( 'click', function() {
  flkty.stopPlayer();
});
