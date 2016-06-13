var main = function() {
    var map = new Map(document.getElementById('map'), {lat: 5, lng:5}, 1);
    console.log(map);
    setTimeout(function() { getISSLocation(map); }, 3000);
    // document.getElementById("search_box").onkeyup = movieMaster.search;
};

var getISSLocation = function(map) {
    var url = "https://api.wheretheiss.at/v1/satellites/25544";
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function() {
        if (request.status === 200) {
            var jsonString = request.responseText;
            var result = JSON.parse(jsonString);
            console.log(result);
            var latlng = {lat: result.latitude, lng: result.longitude};
            console.log(latlng);
            map.centerMap(latlng);
            map.clearMarkers();
            map.addMarker(latlng, "ISS");
        }
    }.bind(this);
    request.send(null);
    setTimeout(function() { getISSLocation(map); }, 5000);
};

window.onload = main;
