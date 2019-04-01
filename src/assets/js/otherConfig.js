import hljs from 'highlight.js';
import Vue from 'vue';
import 'highlight.js/styles/monokai-sublime.css';
import md5 from 'js-md5';


Vue.prototype.$highlight = function() {
    let blocks = document.querySelectorAll('pre code');
    blocks.forEach((block) => {
        hljs.highlightBlock(block);
    });
};

Vue.prototype.$md5 = md5;

Vue.prototype.$getGravatar = function(email) {
    let hash = this.$md5(email.trim().toLowerCase());
    return 'http://www.gravatar.com/avatar/'+hash+'?s=200';
};

//格式化日期
Date.prototype.Format = function(fmt) {
    var o = {
        "y+": this.getFullYear(),
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S+": this.getMilliseconds(), //毫秒
    };
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            if (k == "y+") {
                fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
            }
            else if (k == "S+") {
                var lens = RegExp.$1.length;
                lens = lens == 1 ? 3 : lens;
                fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1, lens));
            }
            else {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
    }
    return fmt;
};

Math.randomNum = function(minNum, maxNum) {
    switch (arguments.length) {
    case 1:
        return parseInt(Math.random() * minNum + 1, 10);
    case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
    default:
        return 0;
    }
};