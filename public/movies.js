var MovieSearch = function(resElement, disElement) {
    this.resultElement = resElement;
    this.displayElement = disElement;
    this.grabData = function(apiUrl, callback){
        var url = "http://www.omdbapi.com/?" + apiUrl;
        var request = new XMLHttpRequest();
        request.open("GET", url);
        request.onload = function() {
            if (request.status === 200) {
                var jsonString = request.responseText;
                var result = JSON.parse(jsonString);
                callback(result);
            }
        }.bind(this);
        request.send(null);
    },
    this.search = function(e) {
        var url = "s=" + e.target.value;
        this.grabData(url, this.displaySearchResults);
    }.bind(this),
    this.displaySearchResults = function(data) {
        if (data.Response === "True") {
            var movies = data.Search;
            var div = document.createElement('div');
            for (var i = 0; i < movies.length; i++) {
                var span = document.createElement('div');
                span.setAttribute('imdb', movies[i].imdbID);
                span.onclick = function(e) {
                    var imdb = e.target.getAttribute('imdb');
                    if (!imdb) {
                        imdb = e.target.parentNode.getAttribute('imdb');
                    }
                    var url = "i=" + imdb + "&tomatoes=true";
                    this.grabData(url, this.displayMovie);
                }.bind(this);
                var img = document.createElement('img')
                img.setAttribute('src', movies[i].Poster);
                img.setAttribute('height', '40px');
                span.innerText = movies[i].Title;
                span.insertBefore(img, span.childNodes[0]);
                div.appendChild(span);
            }
            this.resultElement.replaceChild(div, this.resultElement.firstChild);
        } else {
            var div = document.createElement('div');
            var p = document.createElement('p');
            p.innerText = "No results for your search...";
            div.appendChild(p);
            this.resultElement.replaceChild(div, this.resultElement.firstChild);
        }

    }.bind(this),
    this.displayMovie = function(data) {
        if (data.Response === "True") {
            var emptyDiv = document.createElement('div');
            this.resultElement.replaceChild(emptyDiv, this.resultElement.firstChild);
            var div = document.createElement('div');

            var img = document.createElement('img');
            img.setAttribute('src', data.Poster);
            img.setAttribute('height', '200px');

            var title = document.createElement('h2');
            title.innerText = data.Title;


            div.appendChild(img);
            div.appendChild(title);

            this.displayElement.replaceChild(div, this.displayElement.firstChild);

            var dump = document.createElement('div');
            var ul = document.createElement('ul');

            for (var i = 0; i < Object.keys(data).length; i++) {
                var li = document.createElement('li');
                li.innerText = Object.keys(data)[i] + " - " + data[Object.keys(data)[i]];
                ul.appendChild(li);
            }

            dump.appendChild(ul);
            this.displayElement.appendChild(dump);
        } else {
            var div = document.createElement('div');
            var p = document.createElement('p');
            p.innerText = "Not a valid thingy";
            div.appendChild(p);
            this.displayElement.replaceChild(div, this.displayElement.firstChild);
        }
    }.bind(this)

}
