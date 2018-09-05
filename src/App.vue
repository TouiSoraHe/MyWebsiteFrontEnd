<template>
    <div id="app">
        <el-header>
            <my-nav :marginlr="marginlr"></my-nav>
        </el-header>
        <div class="bg">
        </div>
        <el-main>
            <transition name="el-fade-in-linear" mode="out-in">
                <router-view :style='{"margin-left":this.marginlr,"margin-right":this.marginlr}'></router-view>
            </transition>
        </el-main>
        <el-footer>
        </el-footer>
    </div>
</template>
<script type="text/javascript">
import nav from 'components/nav/nav.vue'

export default {
    data() {
        return {
            clientSize: {
              height:'600px',
              width:'600px',
            },
            marginlr: "16%",
        };
    },
    components: {
        "my-nav": nav
    },
    mounted() {
        this.clientSize.height = `${document.documentElement.clientHeight}px`;
        this.clientSize.width = `${document.documentElement.clientWidth}px`;
        const that = this;
        window.onresize = function() {
            that.clientSize.height = `${document.documentElement.clientHeight}px`;
            that.clientSize.width = `${document.documentElement.clientWidth}px`;
        };
    },
}
</script>
<style>
.bg {
    position: relative;
    max-height: 400px;
    min-height: 200px;
    height: 300px;
    width: 100%;
    background-image: url('bg.jpg');
    background-size: cover;
    background-position: center 50%;
    background-repeat: no-repeat;
}

main {
    background-image: url('bg2.gif');
    background-color: #eee;
}
</style>