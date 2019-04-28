<template>
  <div class="mb-5">
    <v-list v-if="$store.state.music.playlists.length > 0 " two-line>
      <template v-for="(item, index) in $store.state.music.playlists">
        <v-divider
          v-if="index!=0"
          :key="index"
          :inset="item.inset"
        ></v-divider>
        <v-tooltip :key="item.id" bottom>
          <template v-slot:activator="{ on }">
            <v-list-tile
              avatar
              @click="switchPlayList(item.id)"
            >
              <v-list-tile-avatar>
                <img v-if="$store.state.music.playlistStatus !== 'loading' || switchPlayListId != item.id" :src="item.coverImgUrl">
                <v-progress-circular
                  v-else
                  indeterminate
                ></v-progress-circular>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-text="item.name"></v-list-tile-title>
                <v-list-tile-sub-title v-on="on" v-text="item.description"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <span>{{ item.description }}</span>
        </v-tooltip>
      </template>
    </v-list>
    <v-list v-else>
      <v-list-tile>
        <v-list-tile-avatar>
          <v-progress-circular
            :indeterminate="playlistsStatus === 'loading'"
            :value="100"
            :color="playlistsStatus === 'error' ? 'error' : 'primary'"
          ></v-progress-circular>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title v-text="playlistsStatusTest"></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>

export default {
  data() {
    return {
      uid: undefined,
      playlists: [],
      list: [],
      switchPlayListId: ''
    }
  },
  computed: {
    playlistsStatus() {
      return this.$store.state.music.playlistsStatus
    },
    playlistsStatusTest() {
      switch (this.playlistsStatus) {
        case 'loading':
          return '正在获取歌单列表,请稍后'
        case 'error':
          return '获取歌单列表失败,请刷新重试!'
        case 'ready':
          return '歌单列表暂时为空!'
        default:
          return '未知错误!'
      }
    }
  },
  created() {
  },
  methods: {
    async switchPlayList(id) {
      try {
        this.switchPlayListId = id
        const list = await this.$store.dispatch('GetPlaylist', id)
        this.$store.commit('setPlaylist', list)
      } catch (error) {
        this.$tips.showTips({
          color: 'error',
          text: error.response ? error.response.data || error : error,
          timeout: 3000
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
