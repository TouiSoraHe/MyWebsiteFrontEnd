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
        <el-footer>
        </el-footer>
    </div>
</template>
<script type="text/javascript">
import nav from 'components/nav/nav.vue'

export default {
    data() {
        return {
            contentMaxWidth: "1000px",
        };
    },
    components: {
        "my-nav": nav,
    },
    computed:{
        mainStyleObj:function(){
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
    background-image: url('bg.jpg');
    background-size: cover;
    background-position: center 50%;
    background-repeat: no-repeat;
}

.myMain {
    background-image: url('bg2.gif');
    background-color: #eee;
}

.mainContent{
    margin-left: auto;
    margin-right:auto;
}
</style>