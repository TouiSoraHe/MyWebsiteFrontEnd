<template>
  <div>
    <div>
      <v-hover v-for="item in tags" :key="item.id">
        <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 10 : 0}`" :to="'/archive/'+item.id" width="150px" height="150px" style="float: left;" class="ma-3">
          <v-img :src="item.tagImg.small || ''" class="white--text" style="height: 100%;width:100%;">
            <v-container fill-height fluid ma-0 pa-0>
              <v-layout ma-0 pa-0 fill-height>
                <v-flex xs12 flexbox class="white--text text-center vertical-middle" fill-height style="background: rgba(0,0,0,.3);margin-top: auto;margin-bottom: auto;">
                  <div>
                    <div class="headline">
                      {{ item.tagName }}
                    </div>
                    <v-divider color="#fff" class="my-1"></v-divider>
                    <div class="caption">
                      共{{ item.blogInfoIDs.length }}篇
                    </div>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
        </v-card>
      </v-hover>
    </div>
    <loading :show-loading="showLoading"></loading>
  </div>
</template>
<script>
import loading from 'components/loading/loading.vue'

export default {
  components: {
    'loading': loading
  },
  data() {
    return {
      alert: true,
      tags: [],
      showLoading: false
    }
  },
  created() {
    this.getTags()
  },
  methods: {
    async getTags() {
      try {
        this.showLoading = true
        const response = await this.$api.getTags()
        this.tags = response.data
      } catch (error) {
        console.error(error)
      } finally {
        this.showLoading = false
      }
    }
  }
}
</script>
<style scoped>
</style>
