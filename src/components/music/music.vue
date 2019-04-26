<template>
  <div>
    <v-btn v-for="item in $store.state.music.playlists" :key="item.id" @click="switchPlayList(item.id)">
      {{ item.name }}
    </v-btn>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  data() {
    return {
      uid: undefined,
      playlists: [],
      list: [
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      this.uid = localStorage.getItem('uid')
      if (this.uid) {
        const data = await this.getPlaylists()
        this.playlists = data.playlist
      } else {
        const data = await this.login()
        localStorage.setItem('uid', data.account.id)
        this.uid = data.account.id
        console.log(data)
      }
    },
    async login() {
      try {
        const response = await axios.get('http://zhangzhanyi.tk:3000/login?email=zzy213326@163.com&password=Zz123789')
        return response.data
      } catch (error) {
        console.error('登陆失败:' + error)
      }
    },
    async getPlaylists() {
      try {
        const response = await axios.get('http://zhangzhanyi.tk:3000/user/playlist?uid=' + this.uid)
        return response.data
      } catch (error) {
        console.error('获取歌单失败:' + error)
      }
    },
    async switchPlayList(id) {
      console.log(id)
      try {
        const list = await this.$store.dispatch('GetPlaylist', id)
        this.$store.commit('setPlaylist', list)
        console.log('over')
      } catch (error) {
        console.error('获取歌单失败:' + error)
      }
    }
  }
}
</script>

<style scoped>
</style>
