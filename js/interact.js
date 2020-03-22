//index.html 的脚本。
let langLabals = ["h2", "h3", "h4", "h5", "h6", "p", "li", "a"];

(function setTranslateLang() {
    langLabals.forEach(item => {
        $(item).each(function () {
            if (typeof ($(this).attr('translate')) == "undefined") {
                $(this).attr("translate", 'yes')
            }
        });
    });
})();

let preLanguage = "default";
let curLanguage = "default";
$("#switch-language-slt").change((va) => {
    curLanguage = va.currentTarget.selectedOptions[0].value;
    console.log("language:" + curLanguage);
    //window.location.reload();
    switch (preLanguage) {
        case "default": preLanguage="zh";
        case "zh":
        case "kor": maxSize = 950; break;
        case "cht": maxSize=800;break;
        case "jp": maxSize = 600; break;
        default:
            maxSize = 1400;
    }
    if(curLanguage=="default"){curLanguage="zh";}
    if(curLanguage==preLanguage){return;}
    console.log("maxSize:" + preLanguage+maxSize+curLanguage);
    let [query, obj] = getArr(maxSize);
    GetBaidu(preLanguage, curLanguage, query, obj);
    preLanguage = curLanguage;
});