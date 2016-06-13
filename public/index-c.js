var main = function () {
    var chuck = new Chuck();
    chuck.reload(document.getElementById('reload'));
    chuck.grabData();
}


window.onload = main;
