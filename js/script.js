

//Mustache Init code

	var templateCode = document.getElementById('template-code').innerHTML;
  var dataCode =
  {
    "code": {
      "title": "Michael",
      "image" : "#",
      "description": '<p>Lorem ipsum.</p> <img src="http://via.placeholder.com/400x200" alt="Photo placeholder"> <p>Dolor sit.</p>"'
    },
    "code1": {
      "title": "Michael",
      "image" : "#",
      "description": '<p>Lorem ipsum.</p> <img src="http://via.placeholder.com/400x200" alt="Photo placeholder"> <p>Dolor sit.</p>"'
    },
    "code2": {
      "title": "Michael",
      "image" : "#",
      "description": '<p>Lorem ipsum.</p> <img src="http://via.placeholder.com/400x200" alt="Photo placeholder"> <p>Dolor sit.</p>"'
    },
    "code3": {
      "title": "Michael",
      "image" : "#",
      "description": '<p>Lorem ipsum.</p> <img src="http://via.placeholder.com/400x200" alt="Photo placeholder"> <p>Dolor sit.</p>"'
    },
  };
  var results = document.getElementById('results');


  results.insertAdjacentHTML('beforeend', Mustache.render(templateCode, dataCode));



  var elem = document.querySelector('.carousel');

// Flickity init
  var flkty = new Flickity( elem, {
    // options
    cellAlign: 'left',
    contain: true,
    hash: true,
    pageDots: false
  });

  // reset button
  var buttonGroup = document.querySelector('.button-group');
  var buttons = buttonGroup.querySelectorAll('.button');
  buttons = fizzyUIUtils.makeArray( buttons );

  buttonGroup.addEventListener( 'click', function( event ) {
    // filter for button clicks
    if ( !matchesSelector( event.target, '.button' ) ) {
      return;
    }
    var index = buttons.indexOf( event.target );
    flkty.select( index );
  });

  //progress bar
  var progressBar = document.querySelector('.progress-bar')

  flkty.on( 'scroll', function( progress ) {
    progress = Math.max( 0, Math.min( 1, progress ) );
    progressBar.style.width = progress * 100 + '%';
  });
