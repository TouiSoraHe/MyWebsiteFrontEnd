import request from '@/utils/request'
import md5 from 'js-md5'

function getHash(key) {
  return md5(key.toString().trim().toLowerCase())
}

export function getPlaylists(uid) {
  return request({
    url: '/music/user/playlist?UniqueKey=' + getHash(uid),
    method: 'post',
    data: { uid: uid }
  })
}

export function getPlaylist(id) {
  return request({
    url: '/music/playlist/detail?UniqueKey=' + getHash(id),
    method: 'post',
    data: { id: id }
  })
}

export function getMusicUrl(ids) {
  return request({
    url: '/music/song/url?UniqueKey=' + getHash(ids),
    method: 'post',
    data: { id: ids }
  })
}
