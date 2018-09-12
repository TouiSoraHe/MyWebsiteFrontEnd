<template>
    <div id="app">
        <el-container>
            <el-header>
                <my-nav :contentMaxWidth="contentMaxWidth"></my-nav>
            </el-header>
            <div class="bg">
            </div>
            <el-main class="myMain" :style="myMainStyleObj">
                <div class="mainContent" :style="mainStyleObj">
                    <div class="mainContentLeft">
                        <transition name="el-zoom-in-center" mode="out-in">
                            <router-view style="min-height: inherit;"></router-view>
                        </transition>
                    </div>
                    <div class="mainContentRight">
                        <div style="width: 100%;background-color: #999;">占位</div>
                    </div>
                </div>
            </el-main>
            <my-back-to-top></my-back-to-top>
            <el-footer class="myFooter">
                <div :style="footerStyleObj" class="footerContent">
                    (〃'▽'〃)
                </div>
            </el-footer>
        </el-container>
    </div>
</template>
<script type="text/javascript">
import nav from 'components/nav/nav.vue'
import top from 'components/backToTop/backToTop.vue'

export default {
    data() {
        return {
            clientSize: {
                height: 0,
                width: 0,
            },
            contentMaxWidth: "1000px",
        };
    },
    components: {
        "my-nav": nav,
        "my-back-to-top": top,
    },
    mounted() {
        var that = this;
        this.$nextTick(() => {
            that.clientSize.height = document.documentElement.clientHeight;
            that.clientSize.width = document.documentElement.clientWidth;
            window.onresize = () => {
                that.clientSize.height = document.documentElement.clientHeight;
                that.clientSize.width = document.documentElement.clientWidth;
            };
        });
    },
    computed: {
        mainStyleObj: function() {
            return {
                "max-width": this.contentMaxWidth,
            };
        },
        footerStyleObj: function() {
            return {
                "max-width": this.contentMaxWidth,
            };
        },
        myMainStyleObj: function() {
            let minHeight = 0;
            let myMainEle = document.querySelector('.myMain');
            let myMainHeight = 0;
            if (myMainEle != null) {
                let myMainEleStyle = window.getComputedStyle(myMainEle, null);
                let top = parseFloat(myMainEleStyle.paddingTop.replace('px', ''));
                let bottom = parseFloat(myMainEleStyle.paddingBottom.replace('px', ''));
                myMainHeight = myMainEle.clientHeight - top - bottom + 60;
            }
            if ((document.body.offsetHeight - myMainHeight) < this.clientSize.height) {
                minHeight = this.clientSize.height - (document.body.offsetHeight - myMainHeight);
            }
            return {
                "min-height": minHeight + "px"
            };
        },
    }
}
</script>
<style scoped>
.bg {
    position: fixed;
    height: 1057px;
    width: 100%;
    top: 60px;
    z-index: -1;
    background-image: url('assets/img/headbg.png');
    background-size: cover;
    background-position: center 0;
    background-repeat: no-repeat;
}

.mainContent {
    margin-left: auto;
    margin-right: auto;
    min-height: inherit;
}

.mainContentLeft {
    min-height: inherit;
    display: inline-block;
    float: left;
    width: 75%;
}

.mainContentRight {
    display: inline-block;
    float: right;
    width: 20%;
    margin-left: 5%;
}

.myFooter {
    width: 100%;
    background-color: #232323;
    min-height: 60px !important;
    height: auto !important;
    color: #888;
    display: table;
}

.footerContent {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
}

@media only screen and (max-width: 1000px){
    .bg{
        background-position: 40% 0;
    }

    .mainContentLeft {
        width: 100%;
    }

    .myMain{
        padding-right: 0;
        padding-left: 0;
    }
}
</style>