<template>
    <div id="app">
        <el-header>
            <my-nav :contentMaxWidth="contentMaxWidth"></my-nav>
        </el-header>
        <div class="bg">
        </div>
        <el-main class="myMain">
            <transition name="el-fade-in-linear" mode="out-in">
                <router-view :style="mainStyleObj" class="mainContent"></router-view>
            </transition>
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
            contentMaxWidth: "800px",
        };
    },
    components: {
        "my-nav": nav,
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
    min-height: 500px;
    background-image: url('assets/img/bg2.gif');
    background-color: #eee;
    background-color: #efefef;
}

.mainContent {
    margin-left: auto;
    margin-right: auto;
    min-height: inherit;
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