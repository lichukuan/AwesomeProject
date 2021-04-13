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


    var select = document.querySelector('.select');
    var check = document.querySelector('.check');
    var china = document.querySelector('.china');
    var foreign = document.querySelector('.foreign');
    check.style.display = 'none';
    china.style.display = 'none';
    foreign.style.display = 'none';
    var search_isolate = document.querySelector('#search_isolate');
    search_isolate.addEventListener('click', function() {
        select.style.display = 'block';
        check.style.display = 'none';
        china.style.display = 'none';
        foreign.style.display = 'none';
    })

    var search_truth = document.querySelector('#search_truth');
    search_truth.addEventListener('click', function() {
        select.style.display = 'none';
        check.style.display = 'block';
        china.style.display = 'none';
        foreign.style.display = 'none';
    })

    var search_hebei = document.querySelector('#search_hebei');
    search_hebei.addEventListener('click',function(){
        select.style.display = 'none';
        check.style.display = 'none';
        china.style.display = 'block';
        foreign.style.display = 'none';
    })
    
    var search_input = document.querySelector('#search_input');
    search_input.addEventListener('click',function(){
        select.style.display = 'none';
        check.style.display = 'none';
        china.style.display = 'none';
        foreign.style.display = 'block';
    })

    var citys = document.querySelectorAll('.s-city');
    var tips = document.querySelector('.s-tips');
    var list = document.querySelectorAll('.s-policy-list');
    console.dir(citys);
    var cover_location_name = document.querySelector('.cover_location_name');
    var nav_wrap = document.querySelector('#nav-wrap');
    var data_total_confirm = document.querySelector('#data_total_confirm');
    var data_total_dead = document.querySelector('#data_total_dead');
    var data_total_heal = document.querySelector('#data_total_heal');
    var data_today_confirm = document.querySelector('#data_today_confirm');
    var data_today_dead = document.querySelector('#data_today_dead');
    var data_today_heal = document.querySelector('#data_today_heal');
    var cover_time = document.querySelector('.cover_time');
    var item_list = document.querySelector('#item_list');
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


        tips.innerHTML = p.come;
        citys[0].innerHTML = g.city;
        citys[1].innerHTML = g.city;
        var item1 = list[0];
        item1.innerHTML = '<p data-v-50b5cb1a="">'+g.come+'</p>';
        var item2 = list[1];
        item2.innerHTML = '<p data-v-50b5cb1a="">'+g.back+'</p>';


        for(var i = 0;i < g.items.length;i++){
            createItem(item_list,g.items[i]);
        }

    })



}

function sendData(data) {
    window.ReactNativeWebView.postMessage(data)
}

function createItem(container,data){
    var parent = document.createElement('div');
    parent.setAttribute('data-v-54065788','');
    parent.setAttribute('data-v-2a40a406','');
    parent.className = 'home-item';
    //图片
    var imgContainer = document.createElement('div');
    imgContainer.setAttribute('data-v-54065788','');
    imgContainer.className = 'image';
    var img = document.createElement('img');
    img.setAttribute('data-v-54065788','');
    img.src = data.imgSrc;
    imgContainer.appendChild(img);
    parent.appendChild(imgContainer);
    //标题
    var desc = document.createElement('div');
    desc.setAttribute('data-v-54065788','');
    desc.className = 'desc';
    var title = document.createElement('div');
    title.setAttribute('data-v-54065788','');
    title.className = 'title';
    title.innerHTML = data.title;
    var time = document.createElement('div');
    time.setAttribute('data-v-54065788','');
    time.className = 'time';
    time.innerHTML = data.ptime;
    desc.appendChild(title);
    desc.appendChild(time);
    parent.appendChild(desc);
    //分割线
    var divide = document.createElement('div');
    divide.setAttribute('data-v-54065788','');
    divide.className = 'devide';
    parent.appendChild(divide);
    //加入列表
    container.appendChild(parent);
}