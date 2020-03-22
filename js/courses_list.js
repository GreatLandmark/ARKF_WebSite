// query长度：为保证翻译质量，请将单次请求长度控制在 6000 bytes以内。（汉字约为2000个）
function getArr(maxSize) {
    var arrHtml = [[]];
    var arrThis = [[]];
    var size = 0;
    let t = 0;
    /* var text = $("[translate='yes']").text(function (i, text) {
    // console.log(i + text.replace("\n", "").replace(/\s+/g, ' '));
    console.log("1:"+this); 
    console.log(this);   
    arrHtml[t].push(text.replace("\n", " ")); // 将我们想要翻译的内容存进数组里，并且将回车 \n 匹配成空格，避免翻译时 \n 与我们定义的冲突
        arrThis[t].push($(this));
        size += text.length;
        if (size > maxSize) {
            t++;
            arrHtml[t] = [];
            arrThis[t] = [];
            size = 0;
        }
    }); */
    // let colle = $("[translate='yes']");
    // console.log(colle);
    $("[translate='yes']").each((i, node) => {
        //console.log(i);
        console.log(node);
        // console.log($(node).prop('firstChild'));
        let text= $(node).prop('firstChild').nodeValue;
        arrHtml[t].push(text.replace("\n", " ")); // 将我们想要翻译的内容存进数组里，并且将回车 \n 匹配成空格，避免翻译时 \n 与我们定义的冲突
        arrThis[t].push($(node));
        size += text.length;
        if (size > maxSize) {
            t++;
            arrHtml[t] = [];
            arrThis[t] = [];
            size = 0;
        }
    });
    /* for (let i = 0; i < colle.length; i++) {
        var text = colle[i].prop('firstChild').nodeValue;
        console.log("nodeValue:" + text);
        arrHtml[t].push(text.replace("\n", " ")); // 将我们想要翻译的内容存进数组里，并且将回车 \n 匹配成空格，避免翻译时 \n 与我们定义的冲突
        arrThis[t].push($(this));
        size += text.length;
        if (size > maxSize) {
            t++;
            arrHtml[t] = [];
            arrThis[t] = [];
            size = 0;
        }
    } */
    console.log(arrHtml);
    console.log(arrThis);
    return [arrHtml, arrThis]
}

function GetBaidu(from, to, query, obj) {
    // console.log(query.length);
    // console.log(obj);
    function getTrans(query, obj) {
        var q = query.join("\n"); // 将内容数组用 \n 拼接
        var appid = "20200321000402213"; // 请自行获取
        var key = "87mMGWPhPfZY9MLxkLvm"; // 请自行获取
        var salt = (new Date).getTime();
        var str1 = appid + q + salt + key;
        var sign = MD5(str1);
        $.ajax({
            url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',//'http://api.fanyi.baidu.com/api/trans/vip/translate',
            type: 'post',
            dataType: 'jsonp',
            data: {
                q: q,
                from: from,
                to: to,
                appid: appid,
                salt: salt,
                sign: sign
            },
            success: function (msg) {
                console.log(msg);
                var text = "";
                for (var i = 0; i < msg.trans_result.length; i++) {
                    text = msg.trans_result[i].dst;
                    // obj[i].contents().filter((index, content) => {
                    //     return content.nodeType === 3;
                    // }).text(text);
                    obj[i].prop('firstChild').nodeValue=text;
                }
            }
        });
    }
    for (let t = 0; t < query.length; t++) {
        setTimeout(getTrans, t * 1500, query[t], obj[t]);
    }

}
/* function test() {
    var t = 0; function run(pa) {
        console.log(pa);
    }
    for (; t < 10; t++) {
        setTimeout(run, 5000, t);
    }
    // setInterval(() => {
    //     console.log(t);
    //     t++;
    // }, 1000);

} */