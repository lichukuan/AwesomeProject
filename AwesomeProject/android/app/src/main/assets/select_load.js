window.onload = function() {
    var search_isolate = document.querySelector('.s-logo');
    search_isolate.addEventListener('click', function() {
        sendData(JSON.stringify({
            type:'back_html',
            path:'index.html'
        }));
    })

    var citys = document.querySelectorAll('.s-city');
    var tips = document.querySelector('.s-tips');
    var list = document.querySelectorAll('.s-policy-list');
    console.dir(citys);
    window.document.addEventListener('message', function(e) {//注册事件 接收数据
        const message = e.data;//字符串类型
        const p = JSON.parse(message);//获取json数据
        const g = JSON.parse(p);//将json转化为对象
        // console.log('WebView message:',message);
        // //window.postMessage(message);
        tips.innerHTML = p.come;
        citys[0].innerHTML = g.city;
        citys[1].innerHTML = g.city;
        var item1 = list[0];
        // var comeRule = g.come;
        // var htmlDir = '';
        // for(var i = 0;i < comeRule.length();i++){
        //    htmlDir += ('<p data-v-50b5cb1a="">'+g.come[i]+'</p>')
        // }
        item1.innerHTML = '<p data-v-50b5cb1a="">'+g.come+'</p>';
        var item2 = list[1];
        // var backRule = g.back;
        // var htmlDir1 = '';
        // for(var i = 0;i < backRule.length();i++){
        //     htmlDir1 += ('<p data-v-50b5cb1a="">'+g.back[i]+'</p>')
        //  }
         item2.innerHTML = '<p data-v-50b5cb1a="">'+g.back+'</p>';
    })
}

function sendData(data) {
    window.ReactNativeWebView.postMessage(data)
}