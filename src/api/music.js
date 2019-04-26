import request from '@/utils/request'

export function getPlaylists(domain, uid) {
  return request({
    url: domain + '/user/playlist?uid=' + uid,
    method: 'get'
  })
}

export function getPlaylist(domain, id) {
  return request({
    url: domain + '/playlist/detail?id=' + id,
    method: 'get'
  })
}

export function getMusicUrl(domain, ids) {
  return request({
    url: domain + '/song/url?id=' + ids,
    method: 'get'
  })
}
