import { getPlaylists, getPlaylist, getMusicUrl } from '@/api/music.js'

const music = {
  state: {
    backendInfo: {
      domain: '',
      uid: ''
    },
    playlists: [],
    playlist: [],
    idToPlaylist: new Map()
  },

  mutations: {
    setPlaylists(state, newValue) {
      state.playlists = newValue
    },
    setPlaylist(state, newValue) {
      state.playlist = newValue
    },
    setBackendInfo(state, newValue) {
      state.backendInfo.domain = newValue.domain
      state.backendInfo.uid = newValue.uid
    }
  },

  actions: {
    GetPlaylists(store) {
      return new Promise((resolve, reject) => {
        getPlaylists(store.state.backendInfo.domain, store.state.backendInfo.uid).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetPlaylist(store, id) {
      return new Promise((resolve, reject) => {
        if (store.state.idToPlaylist.has(id)) {
          resolve(store.state.idToPlaylist.get(id).slice())
        } else {
          getPlaylist(store.state.backendInfo.domain, id).then(response => {
            const idToMusic = new Map()
            response.data.playlist.tracks.forEach(item => {
              idToMusic.set(item.id, {
                name: item.name,
                artist: item.ar[0].name,
                cover: item.al.picUrl
              })
            })
            getMusicUrl(store.state.backendInfo.domain, Array.from(idToMusic.keys()).join(',')).then(musicUrls => {
              musicUrls.data.data.forEach(item => {
                idToMusic.get(item.id).url = item.url
              })
              const list = Array.from(idToMusic.values())
              store.state.idToPlaylist.set(id, list)
              resolve(list.slice())
            }).catch(musicError => {
              reject(musicError)
            })
          }).catch(error => {
            reject(error)
          })
        }
      })
    }
  }
}

export default music
