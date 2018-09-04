<template>
  <div id="app">
    <el-header>
      <my-nav :marginlr="marginlr"></my-nav>
    </el-header>
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

  export default{
    data (){
      return {
        marginlr:"16%",
      };
    },
    components:{
      "my-nav":nav
    }
  }
</script>

<style>
main{
  background-color: #dee3e7;
}
</style>
