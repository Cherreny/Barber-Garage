function initMap() {
  var styleArray = [
    {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "saturation": 36
        },
        {
          "color": "#ffffff"
        },
        {
          "lightness": 40
        }
      ]
    },
    {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "color": "#000000"
        },
        {
          "lightness": 30
        }
      ]
    },
    {
      "featureType": "all",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 20
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#3D2B1F"
        },
        {
          "lightness": 17
        },
        {
          "weight": 1.2
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 20
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 21
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 17
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 29
        },
        {
          "weight": 0.2
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#73542F"
        },
        {
          "lightness": 25
        },
        {
          "weight": 1
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 17
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 19
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 17
        }
      ]
    }
  ];

  var map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(52.233850, 20.987273),
    scrollwheel: false,
    styles: styleArray,
    zoomControl: true
  });

  var markers = [
    {
      name: 'barber',
      imgSrc: '/img/marker_barber_small.png',
      latLng: new google.maps.LatLng(52.233850, 20.987273)
    },
    {
      name: 'garage',
      imgSrc: '/img/marker_garage_small.png',
      latLng: new google.maps.LatLng(52.232497, 20.977438)
    }
  ];

  var mapBounds = new google.maps.LatLngBounds();

  markers.forEach(function (marker) {
    new google.maps.Marker({
      position: marker.latLng,
      map: map,
      icon: marker.imgSrc
    });

    mapBounds.extend(marker.latLng);
  });

  // map.fitBounds(mapBounds);

  // `fitBounds` sets map zoom in highest value possible so we want to zoom out a little bit
  var listener = google.maps.event.addListener(map, "idle", function() {
    map.setZoom(16);
    google.maps.event.removeListener(listener);
  });
}
