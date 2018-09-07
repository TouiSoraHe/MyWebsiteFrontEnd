<template>
    <div class="nav">
        <el-row class="navContent" :style="navContentStyleObj">
            <el-col :span="24">
                <div class="home">
                    <router-link  to="/" class="my-icon-home"> 主页</router-link>
                </div>
                <div class="menu">
                <el-menu :default-active="$route.path" router class="nav-ul" mode="horizontal">
                    <el-menu-item index="/blog" class="my-icon-ego-blog"> 博文</el-menu-item>
                    <el-menu-item index="/archive" class="my-icon-guidang"> 归档</el-menu-item>
                    <el-menu-item index="/music" class="my-icon-MusicAcc"> 音乐</el-menu-item>
                    <el-menu-item index="/message" class="my-icon-liuyan"> 留言</el-menu-item>
                    <el-menu-item index="/" v-show="false"></el-menu-item>
                </el-menu>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  props: {
    contentMaxWidth: {
      type: String
    }
  },
  data () {
    return {
    };
  },
  computed:{
    navContentStyleObj:function(){
        return {
            "max-width":this.contentMaxWidth,
        };
    },
  }
}
</script>

<style scoped>
    .nav {
        z-index: 1000;
        transition: all 0.5s ease;
        background-color: #fff;
        box-shadow: 0 0 5px rgba(0,0,0,.4);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
    }

    .navContent{
        margin-left: auto;
        margin-right:auto;
    }

    .menu {
        float: right !important;
        display: inline-block;
    }

    .home{
        float: left !important;
        display: inline-block;
    }

    .home > a{
        color: #909399;
        height: 60px;
        line-height: 60px;
    }

    .home > a:hover{
        color: inherit;
    }
</style>
