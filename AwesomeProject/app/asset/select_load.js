window.onload = function() {
    var search_isolate = document.querySelector('.s-logo');
    search_isolate.addEventListener('click', function() {
        window.history.go(-1);
    })
}