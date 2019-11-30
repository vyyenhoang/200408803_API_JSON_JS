var objPeople = [
	{ 
		username: "vy",
		password: "12345"
	},
	{ 
		username: "linh",
		password: "6789"
	},
	{ 
		username: "jessica",
		password: "forever"
	}

]

function getInfo() {
	var username = document.getElementById('username').value
	var password = document.getElementById('password').value

	for(var i = 0; i < objPeople.length; i++) {
		// check is user input matches username and password of a current index of the objPeople array
		if(username == objPeople[i].username && password == objPeople[i].password) {
			alert(username + " is Logged In Successfully")
			window.location.href = "index.html";
			// stop the function if this is found to be true
			return
		}
	}
	alert("Incorrect Username or Password")
}

var locations = [];
// FILL TABLE WITH PRODUCTS

request = new XMLHttpRequest();
request.open('GET', 'products.json', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400){
    // Success!
    data = JSON.parse(request.responseText);
    data.forEach(function (d) {
      var el =  document.createElement('tr');
      el.innerHTML = '<td><img src="'+d.image+'" width="80%" /></td>'+
                        '<td>'+d.name+'</td>'+
                        '<td>'+d.description+'</td>'+
                        '<td>'+d.price+'</td>'+
                        '<td>'+d.features+'</td>';
      locations.push([d.name,d.location.lat,d.location.lng]);
      document.getElementById('elements').appendChild(el);
    });
  } else {
    // We reached our target server, but it returned an error

  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();



// init map
function initMap() {
  var center = {lat: 44.3997074, lng: -79.6944898};
  
	var map = new google.maps.Map(document.getElementById('map'), {
	    zoom: 12,
	    center: center
	  });
	var infowindow =  new google.maps.InfoWindow({});
	var marker, count;
	for (count = 0; count < locations.length; count++) {
	    marker = new google.maps.Marker({
	      position: new google.maps.LatLng(locations[count][1], locations[count][2]),
	      map: map,
	      title: locations[count][0]
	    });
	google.maps.event.addListener(marker, 'click', (function (marker, count) {
	      return function () {
	        infowindow.setContent(locations[count][0]);
	        infowindow.open(map, marker);
	      }
	    })(marker, count));
	  }
}
