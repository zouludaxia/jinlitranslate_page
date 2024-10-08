//翻译函数，目前仅能中译中。。
function happy_translate() {
    var textareaValue = document.getElementById("myTextarea").value;
    // console.log(textareaValue);
    document.getElementById('outputarea').textContent = textareaValue;
    
    //顺便存入临时历史记录列表
    if(textareaValue){
        localStorage.setItem(localStorage.length, textareaValue);
    }
    //更新列表数据
    list_update();
}

//清空历史记录
function history_clear(){
    localStorage.clear(); 
    if (localStorage.length === 0) {  
        console.log('localStorage 已清空');  
    } else {
        console.log('localStorage 未被清空');  
    }
    //更新列表数据
    list_update();
}

//将localstorge中数据更新到列表
function list_update(){
    // 清空<ul>元素中的所有内容
    var ul = document.getElementById("history_list");  
    ul.innerHTML = "";

    // 遍历localStorage中的每个项  
    for (var i = 0; i < localStorage.length; i++) {  
        // 获取键和值  
        var key = localStorage.key(i);  
        var value = localStorage.getItem(key);  
        // 创建一个<li>元素，并设置其内容为键和值  
        var li = document.createElement('li');  
        li.textContent = value;
        // 将<li>元素添加到<ul>中  
        ul.appendChild(li);  
    }
    //为列表元素添加点击事件 
    var ul = document.getElementById("history_list");  // 获取 <ul> 元素
    var lis = ul.getElementsByTagName("li");  // 获取所有的 <li> 元素
    var textarea = document.getElementById("myTextarea"); // 为每一个 <li> 元素添加点击事件监听器，并通过点击给左侧搜索框赋值
    for (var i = 0; i < lis.length; i++) {  
        lis[i].addEventListener("click", function() {
            textarea.value = this.textContent;
        }); 
    }
    console.log("storage中有"+localStorage.length+"条记录");
    //有无记录决定清空按钮是否显示
    if (localStorage.length>0) {  
        document.getElementById("button_clear").style.display = "block"; // 显示按钮  
    } else {  
        document.getElementById("button_clear").style.display = "none"; // 隐藏按钮  
    }
}


// 一键复制结果
function copytext(){
    // 获取span元素的文本  
    var copyText = document.getElementById("outputarea").textContent || document.getElementById("outputarea").innerText;  
    
    // 创建一个临时的textarea元素  
    var textarea = document.createElement("textarea");  
    textarea.value = copyText; 
    
    // 将textarea添加到文档中（并设置为不可见）  
    document.body.appendChild(textarea);  
    textarea.style.position = "fixed";  // 防止滚动  
    textarea.style.opacity = "0";       // 使其不可见  
    
    // 选择文本  
    textarea.select(); 
    
    try {  
    // 尝试复制  
    var successful = document.execCommand('copy');  
    var msg = successful ? '成功' : '失败';  
    console.log('复制文本命令: ' + msg);  
    } catch (err) {  
    console.error('复制失败', err);  
    }  
    
    // 清理：移除textarea
    document.body.removeChild(textarea);  
    alert("文本已复制到剪贴板");
}
//左右语言对换
function swapSelectValues() {  
    // 获取两个select元素  
    var select1 = document.getElementById('select1');  
    var select2 = document.getElementById('select2');  
    
    // 获取每个select的当前选中值  
    var value1 = select1.value;  
    var value2 = select2.value;  
    
    // 查找与当前选中值相匹配的option元素  
    var option1 = Array.from(select1.options).find(option => option.value === value2);  
    var option2 = Array.from(select2.options).find(option => option.value === value1);  
    
    // 如果没有找到匹配的option（比如值不存在于另一个select中），则不进行交换  
    if (option1 && option2) {  
        // 互换选中状态  
        select1.value = value2;  
        select2.value = value1; 
    }  
}