window.onload = function() {
    // var REQUEST_URL = 'https://ipservice.3g.163.com/ip';
    // fetch(REQUEST_URL, {
    //     method: 'GET'
    // })
    // .then((response) => response.json())
    // .then((responseData) => {
    //     console.log(responseData);
    // })
    // .catch((error) => {
    //         console.log(error);
    // });
    // var cover_input = document.querySelector('.cover_input');
    // var number = cover_input.children[1];
    // number.innerHTML = 6666;
    var search_isolate = document.querySelector('#search_isolate');
    search_isolate.addEventListener('click', function() {
        window.location.href = "select.html";
        sendData({
            type:'change_html',
            path:'select.html'
        });
    })

    var search_truth = document.querySelector('#search_truth');
    search_truth.addEventListener('click', function() {
        window.location.href = "check.html";
        sendData({
            type:'change_html',
            path:'check.html'
        });
    })

    
    

    // document.addEventListener('message', function(e) {
    //     // if (e.type == 'location') {
    //     //     console.log(e.data);
    //     // }
    //     console.log(e);
    // });


}

function sendData(data) {
    window.ReactNativeWebView.postMessage(JSON.stringify({
        path:'check.html'
    }))
    if (window.originalPostMessage) {
        window.postMessage(data);
    } else {
        throw Error('postMessage接口还未注入');
    }
}