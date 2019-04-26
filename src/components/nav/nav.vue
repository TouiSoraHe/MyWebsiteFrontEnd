<template>
  <transition mode="out-in" name="fade-transition">
    <v-toolbar v-if="!$store.state.app.isMobile" key="pcNav" dense fixed flat dark color="rgba(0,0,0,0.3)">
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn v-for="item in links" :key="item.title" :to="item.url" flat depressed>
          <v-icon size="21px">
            {{ item.icon }}
          </v-icon>&nbsp;<span>{{ item.title }}</span>
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
    </v-toolbar>
    <div v-else key="mobileNav">
      <v-btn small fixed flat fab style="top: 10px;left: 10px;" @click.stop="drawer = !drawer">
        <v-icon>{{ $vuetify.icons['menu'] }}</v-icon>
      </v-btn>
      <v-navigation-drawer v-model="drawer" fixed temporary width="200">
        <v-list class="pa-1">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="bloggerInfo.BloggerAvatar">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ bloggerInfo.BloggerName }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-list class="pt-0" dense>
          <v-divider class="ma-0"></v-divider>
          <v-list-tile v-for="item in links" :key="item.title" :to="item.url" ripple>
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      links: [
        { title: '主页', icon: this.$vuetify.icons['home'], url: '/' },
        { title: '归档', icon: this.$vuetify.icons['archive'], url: '/archive/archive-list' },
        { title: '音乐', icon: this.$vuetify.icons['music'], url: '/music' },
        { title: '留言', icon: this.$vuetify.icons['message'], url: '/message' }
      ]
    }
  },
  computed: {
    layoutRatio() {
      return this.$store.getLayoutRatio()
    },
    bloggerInfo() {
      return this.$store.state.app.config.BloggerInfo
    },
    offsetLayoutObj() {
      return [
        'xs' + this.layoutRatio.xs[0],
        'sm' + this.layoutRatio.sm[0],
        'md' + this.layoutRatio.md[0],
        'lg' + this.layoutRatio.lg[0],
        'xl' + this.layoutRatio.xl[0]
      ]
    }
  }
}
</script>
<style scoped>

.v-btn--active:before{
    background-color: rgba(0,0,0,0);
}

.v-btn:hover:before{
    background-color: rgba(0,0,0,0);
}

.v-btn__content{
    width:50px;
}

</style>
