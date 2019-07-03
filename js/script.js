

//Mustache Init code

	var templateCode = document.getElementById('template-code').innerHTML;
  var dataCode =
  {
    "code": {
      "title": "Australia - Road",
      "image" : "https://i.content4travel.com/cms/img/u/desktop/prodsliderphoto//sydaunz_0.jpg?version=190524-13?version=190525-08",
      "description": '<p>Lorem ipsum. Dolor sit.</p>"'
    },
		"code1": {
			"title": "Poland - Lodz",
			"image" : "https://checkinprice.com/wp-content/uploads/2017/01/lodz-piotrkowska-poland.jpg",
			"description": '<p>Lorem ipsum.Dolor sit.</p>"'
		},

    "code2": {
      "title": "Poland - Warsaw",
      "image" : "https://www.roughguides.com/wp-content/uploads/2013/04/warsaw-old-town-royal-castle-poland-shutterstock_1171262353-1680x1050.jpg",
      "description": '<p>Lorem ipsum.Dolor sit.</p>"'
    },

    "code3": {
      "title": "France - Paris",
      "image" : "https://media.gettyimages.com/photos/sunrise-at-the-eiffel-tower-in-paris-along-the-seine-picture-id635758088?s=2048x2048",
      "description": '<p>Lorem ipsum Dolor sit.</p>"'
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

	var carousel = document.querySelector('.carousel');
	var container = carousel.querySelectorAll('.container');

  //progress bar
  var progressBar = document.querySelector('.progress-bar')

  flkty.on( 'scroll', function( progress ) {
    progress = Math.max( 0, Math.min( 1, progress ) );
    progressBar.style.width = progress * 100 + '%';
  });

//Pan & Zoom Map effect
	var smoothPanAndZoom = function(map, zoom, coords){
		// Trochę obliczeń, aby wyliczyć odpowiedni zoom do którego ma oddalić się mapa na początku animacji.
		var jumpZoom = zoom - Math.abs(map.getZoom() - zoom);
		jumpZoom = Math.min(jumpZoom, zoom -1);
		jumpZoom = Math.max(jumpZoom, 3);

		// Zaczynamy od oddalenia mapy do wyliczonego powiększenia.
		smoothZoom(map, jumpZoom, function(){
			// Następnie przesuwamy mapę do żądanych współrzędnych.
			smoothPan(map, coords, function(){
				// Na końcu powiększamy mapę do żądanego powiększenia.
				smoothZoom(map, zoom);
			});
		});
	};

	var smoothZoom = function(map, zoom, callback) {
		var startingZoom = map.getZoom();
		var steps = Math.abs(startingZoom - zoom);

		// Jeśli steps == 0, czyli startingZoom == zoom
		if(!steps) {
			// Jeśli podano trzeci argument
			if(callback) {
				// Wywołaj funkcję podaną jako trzeci argument.
				callback();
			}
			// Zakończ działanie funkcji
			return;
		}

		// Trochę matematyki, dzięki której otrzymamy -1 lub 1, w zależności od tego czy startingZoom jest mniejszy od zoom
		var stepChange = - (startingZoom - zoom) / steps;

		var i = 0;
		// Wywołujemy setInterval, który będzie wykonywał funkcję co X milisekund (X podany jako drugi argument, w naszym przypadku 80)
		var timer = window.setInterval(function(){
			// Jeśli wykonano odpowiednią liczbę kroków
			if(++i >= steps) {
				// Wyczyść timer, czyli przestań wykonywać funkcję podaną w powyższm setInterval
				window.clearInterval(timer);
				// Jeśli podano trzeci argument
				if(callback) {
					// Wykonaj funkcję podaną jako trzeci argument
					callback();
				}
			}
			// Skorzystaj z metody setZoom obiektu map, aby zmienić powiększenie na zaokrąglony wynik poniższego obliczenia
			map.setZoom(Math.round(startingZoom + stepChange * i));
		}, 80);
	};

	// Poniższa funkcja działa bardzo podobnie do smoothZoom. Spróbuj samodzielnie ją przeanalizować.
	var smoothPan = function(map, coords, callback) {
		var mapCenter = map.getCenter();
		coords = new google.maps.LatLng(coords);

		var steps = 12;
		var panStep = {lat: (coords.lat() - mapCenter.lat()) / steps, lng: (coords.lng() - mapCenter.lng()) / steps};

		var i = 0;
		var timer = window.setInterval(function(){
			if(++i >= steps) {
				window.clearInterval(timer);
				if(callback) callback();
			}
			map.panTo({lat: mapCenter.lat() + panStep.lat * i, lng: mapCenter.lng() + panStep.lng * i});
		}, 1000/30);
	};


// Select point
function selectPositionOnMap(map){
		var getCurrentSlide = document.querySelector('.container.is-selected');
		var cordy = JSON.parse(getCurrentSlide.getAttribute("coords"));
		smoothPanAndZoom(map, 7, cordy);
}

// Get flickity buttons
	var next = document.querySelector('.flickity-prev-next-button.next');
	var prev = document.querySelector('.flickity-prev-next-button.previous');

// Google map
	window.initMap = function() {
  // The location first slide
	var getCurrentSlide = document.querySelector('.container.is-selected');
	var cordy = JSON.parse(getCurrentSlide.getAttribute("coords"));
	var map = new google.maps.Map(
			document.getElementById('map'), {zoom: 4, center: cordy});


			// reset button
		  var button = document.querySelector('.button');

		  button.addEventListener( 'click', function( event ) {

		    flkty.select( 0 );
				selectPositionOnMap(map);
		  });

// Get position on next button
 next.addEventListener('click', function(event){
		 selectPositionOnMap(map);
			 });
 prev.addEventListener('click', function(event){
		 selectPositionOnMap(map);
 });
// For each photo click to select point on the map
 var cont = function(ele, index, container){
		 cordy = JSON.parse(ele.getAttribute("coords"));
		 marker = new google.maps.Marker({position: cordy, map: map});
		 smoothPanAndZoom(map, 7, cordy);
		 // do something after click coord button on map
		 marker.addListener('click', function(){
				 flkty.select( index );
	 });
 }
	container.forEach(cont);
	selectPositionOnMap(map);
}
