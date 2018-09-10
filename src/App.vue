<template>
    <div id="app">
        <el-header>
            <my-nav :contentMaxWidth="contentMaxWidth"></my-nav>
        </el-header>
        <div class="bg">
        </div>
        <el-main class="myMain" :style="myMainStyleObj">
            <div class="mainContent" :style="mainStyleObj">
                <div class="mainContentLeft">
                    <transition name="el-fade-in-linear" mode="out-in">
                        <router-view style="min-height: inherit;"></router-view>
                    </transition>
                </div>
                <div class="mainContentRight">
                    hello
                </div>
            </div>
        </el-main>
        <el-footer class="myFooter">
            <div :style="footerStyleObj" class="footerContent">
                (〃'▽'〃)
            </div>
        </el-footer>
    </div>
</template>
<script type="text/javascript">
import nav from 'components/nav/nav.vue'

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
                myMainHeight = myMainEle.clientHeight - top - bottom;
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
    position: relative;
    max-height: 400px;
    min-height: 200px;
    height: 300px;
    width: 100%;
    background-image: url('assets/img/bg.jpg');
    background-size: cover;
    background-position: center 50%;
    background-repeat: no-repeat;
}

.myMain {
    background-image: url('assets/img/bg2.gif');
    background-color: #efefef;
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
    width: 80%;
}

.mainContentRight {
    display: inline-block;
    float: right;
    width: 18%;
    margin-left: 2%;
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
</style>