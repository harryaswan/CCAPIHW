var main = function() {
    var movieMaster = new MovieSearch(document.getElementById('results'), document.getElementById('main'))
    document.getElementById("search_box").onkeyup = movieMaster.search;
};

window.onload = main;
