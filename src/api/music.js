import request from '@/utils/request'

export function getPlaylists(uid) {
  return request({
    url: '/music/user/playlist',
    method: 'post',
    data: { uid: uid }
  })
}

export function getPlaylist(id) {
  return request({
    url: '/music/playlist/detail',
    method: 'post',
    data: { id: id }
  })
}

export function getMusicUrl(ids) {
  return request({
    url: '/music/song/url',
    method: 'post',
    data: { id: ids }
  })
}
