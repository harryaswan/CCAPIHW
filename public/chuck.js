var Chuck = function() {
    this.grabData = function() {
        var url = "https://api.chucknorris.io/jokes/random";
        var request = new XMLHttpRequest();
        request.open("GET", url);
        request.onload = function() {
            if (request.status === 200) {
                var jsonString = request.responseText;
                var result = JSON.parse(jsonString);
                this.display(result);
            }
        }.bind(this);
        request.send(null);
    },
    this.display = function(data) {
        var div = document.createElement('div');
        div.innerHTML = data.value;
        div.setAttribute('class', 'chuck_text');
        var main = document.getElementById('main');
        main.replaceChild(div, main.firstChild);
    },
    this.reload = function(element) {
        element.onclick = function() {
            this.grabData();
        }.bind(this);
    }
}
