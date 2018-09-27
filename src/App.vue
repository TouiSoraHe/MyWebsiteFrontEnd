<template>
    <v-app id="app" v-resize="onResize">
        <header>
            <my-nav :isMobile="isMobile"></my-nav>
        </header>
        <div class="bg" :class="{showBg:isShowBg}"></div>
        <main class="myMain" :style="myMainStyleObj">
            <v-container pa-0 ma-0 fluid grid-list-md>
                <v-layout>
                    <v-flex md6 offset-md2 sm12 xs12>
                        <transition name="el-zoom-in-center" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </v-flex>
                    <v-flex md2 v-if="!this.isMobile">
                        <div style="background-color: #999;">占位</div>
                    </v-flex>
                </v-layout>
            </v-container>
        </main>
        <my-back-to-top></my-back-to-top>
        <footer class="myFooter">
            <v-container pa-0 ma-0 fluid>
                <v-layout>
                    <v-flex md8 offset-md2 >
                        <div>(〃'▽'〃)</div>
                    </v-flex>
                </v-layout>
            </v-container>
        </footer>
    </v-app>
</template>
<script type="text/javascript">
import Vue from 'vue'
import nav from 'components/nav/nav.vue'
import top from 'components/backToTop/backToTop.vue'
import Fingerprint2 from 'fingerprintjs2'

export default {
    data() {
        return {
            isShowBg: false,
            windowSize: {
                x: 0,
                y: 0
            },
            isMobile:false,
        };
    },
    components: {
        "my-nav": nav,
        "my-back-to-top": top,
    },
    methods: {
        setWindowSize(){
            if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
                this.windowSize = { x: document.documentElement.clientWidth, y: document.documentElement.clientHeight };
            } else {
                this.windowSize = { x: window.innerWidth, y: window.innerHeight };
            }
            this.isMobile = this.windowSize.x < 960;
        },
        onResize() {
            this.setWindowSize();
        },
        loadBg() {
            let that = this;
            var headbg = new Image();
            headbg.src = require('assets/img/headbg.png');
            if (headbg.complete) {
                that.isShowBg = true;
            } else {
                headbg.onload = function() {
                    that.isShowBg = true;
                };
            }
        },
    },
    beforeCreate() {
        let el = document.getElementById('appLoading');
        if (el !== null) {
            el.className += "disappear";
            setTimeout(() => {
                document.body.removeChild(el);
            }, 300);
        }
    },
    created() {
        this.loadBg();
        this.setWindowSize();
    },
    mounted() {
        this.$nextTick(() => {
            Fingerprint2().get((result) => {
                this.$axios({
                        url: '/api/users/' + result,
                        method: 'get'
                    })
                    .then((response) => {
                        Vue.prototype.$user = response.data;
                    })
                    .catch((error) => {
                        console.log("get user error:" + error);
                    });
            });
        });
    },
    computed: {
        myMainStyleObj: function() {
            return {
                "min-height": this.windowSize.y + "px"
            };
        },
    }
}
</script>
<style scoped>
#app {
    background: none;
}

.bg {
    position: fixed;
    height: 1057px;
    width: 100%;
    /*top: 60px;*/
    z-index: -1;
    background-size: cover;
    background-position: center 0;
    background-repeat: no-repeat;
    -webkit-mask-image: url('assets/img/circlemask.png');
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center center;
    -webkit-mask-size: 300%;
}

.showBg {
    background-image: url('assets/img/headbg.png');
    -webkit-animation: circle_zoom 1.2s ease-in;
}

@keyframes circle_zoom {
    0% {
        opacity: 0;
        -webkit-mask-size: 0%
    }

    20% {
        opacity: .3;
        -webkit-mask-size: 50%
    }

    80% {
        opacity: .7;
        -webkit-mask-size: 250%
    }

    to {
        opacity: 1;
        -webkit-mask-size: 300%
    }
}

main {
    margin-top: 60px;
}

.myFooter {
    width: 100%;
    background-color: #232323;
    min-height: 60px !important;
    height: auto !important;
    color: #888;
    display: table;
}

.myFooter>* {
    display: table-cell;
    vertical-align: middle;
}

.footerContent {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
}

@media only screen and (max-width: 1000px) {
    .bg {
        background-position: 40% 0;
    }
}
</style>