<template>
  <div>
    <v-card class="text-center" style="width: 315px">
      <v-avatar size="80px" class="my-3">
        <v-img :src="$getGravatar(bloggerInfo.email)"></v-img>
      </v-avatar>
      <v-card-text class="subheading pa-0">
        {{ bloggerInfo.name }}
      </v-card-text>
      <v-card-text>
        <v-tooltip v-for="(item,index) in links" :key="index" top>
          <v-btn slot="activator" :href="item.link" :target="item.target" fab small depressed color="rgba(0,0,0,0.1)">
            <v-icon>{{ $vuetify.icons[item.icon] }}</v-icon>
          </v-btn>
          <span>{{ item.description }}</span>
        </v-tooltip>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sharedState: this.$store.state
    }
  },
  computed: {
    bloggerInfo() {
      return this.$store.state.app.config.BloggerInfo
    },
    links() {
      const ret = []
      Object.keys(this.bloggerInfo.contactInformation).forEach(item => {
        let icon = item.toLowerCase()
        if (!this.$vuetify.icons.hasOwnProperty(icon)) {
          icon = 'account'
        }
        ret.push({
          link: this.bloggerInfo.contactInformation[item],
          'icon': icon,
          description: item,
          target: '_blank'
        })
      })
      return ret
    }
  }
}
</script>
<style scoped>
</style>
