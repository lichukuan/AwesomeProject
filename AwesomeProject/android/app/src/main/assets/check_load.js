import { divide } from "react-native-reanimated";

window.onload = function() {
    var search_isolate = document.querySelector('.logo');
    search_isolate.addEventListener('click', function() {
        sendData(JSON.stringify({
            type:'back_html',
            path:'index.html'
        }));
    })
    var item_list = document.querySelector('#item_list');
    var error = document.querySelector('.home-tag');
    window.document.addEventListener('message', function(e) {//注册事件 接收数据
         const message = e.data;//字符串类型
         const p = JSON.parse(message);//获取json数据
         const g = JSON.parse(p);//将json转化为对象
        // item_list.innerHTML = message;
        for(var i = 0;i < g.items.length;i++){
            createItem(item_list,g.items[i]);
        }
        sendData(g.city);
        
    })
}

/*

<div data-v-54065788="" data-v-2a40a406="" class="home-item">
    <div data-v-54065788="" class="image"><img data-v-54065788="" src="./file/2021_0225_e9565f6ep00qp235t006rc0009c0070c.png" alt=""></div>
    <div data-v-54065788="" class="desc">
        <div data-v-54065788="" class="title"> 编造发现新冠肺炎病例谣言，湖北麻城两男子被行拘 </div>
        <div data-v-54065788="" class="time">2021/02/24</div>
    </div>
    <div data-v-54065788="" class="devide"></div>
</div>

*/
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


function sendData(data) {
    window.ReactNativeWebView.postMessage(data)
}