import hljs from 'highlight.js'
import Vue from 'vue'
import 'highlight.js/styles/monokai-sublime.css'

export default{
    init:function(){
        Vue.prototype.$highlight = function() {
            let blocks = document.querySelectorAll('pre code');
            blocks.forEach((block) => {
                hljs.highlightBlock(block);
            });
        };
    },
}