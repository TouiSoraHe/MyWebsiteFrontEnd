import request from '@/utils/request'

export function getPlaylists(uid) {
  return request({
    url: '/music/user/playlist?uid=' + uid,
    method: 'get'
  })
}

export function getPlaylist(id) {
  return request({
    url: '/music/playlist/detail?id=' + id,
    method: 'get'
  })
}

export function getMusicUrl(ids) {
  return request({
    url: '/music/song/url?id=' + ids,
    method: 'get'
  })
}
