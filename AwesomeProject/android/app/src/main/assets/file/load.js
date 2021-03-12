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
        window.location.href = 'select.html'
        sendData(JSON.stringify({
            type:'change_html',
            path:'select.html'
        }));
    })

    var search_truth = document.querySelector('#search_truth');
    search_truth.addEventListener('click', function() {
        sendData(JSON.stringify({
            type:'change_html',
            path:'check.html'
        }));
    })

    var search_hebei = document.querySelector('#search_hebei');
    search_hebei.addEventListener('click',function(){
        sendData(JSON.stringify({
            type:'change_html',
            path:'china.html'
        }))
    })
    
    var search_input = document.querySelector('#search_input');
    search_input.addEventListener('click',function(){
        sendData(JSON.stringify({
            type:'change_html',
            path:'foreign_country.html'
        }))
    })

    var cover_location_name = document.querySelector('.cover_location_name');
    var nav_wrap = document.querySelector('#nav-wrap');
    var data_total_confirm = document.querySelector('#data_total_confirm');
    var data_total_dead = document.querySelector('#data_total_dead');
    var data_total_heal = document.querySelector('#data_total_heal');
    var data_today_confirm = document.querySelector('#data_today_confirm');
    var data_today_dead = document.querySelector('#data_today_dead');
    var data_today_heal = document.querySelector('#data_today_heal');
    var cover_time = document.querySelector('.cover_time');
    window.document.addEventListener('message', function(e) {//注册事件 接收数据
        const message = e.data;//字符串类型
        const p = JSON.parse(message);//获取json数据
        const g = JSON.parse(p);//将json转化为对象
        console.log('WebView message:',message);
        //window.postMessage(message);
        cover_location_name.innerHTML = g.city;
        data_total_confirm.innerHTML = g.total.confirm;
        data_total_dead.innerHTML = g.total.dead;
        data_total_heal.innerHTML = g.total.heal;
        data_today_confirm.innerHTML = '+'+g.today.confirm;
        data_today_dead.innerHTML = '+'+g.today.dead;
        data_today_heal.innerHTML = '+'+g.today.heal;
        cover_time.innerHTML = '截至'+g.lastUpdateTime;
    })

}

function sendData(data) {
    window.ReactNativeWebView.postMessage(data)
}