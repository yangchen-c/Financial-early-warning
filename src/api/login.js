import request from '@/utils/request'

export function loginByUsername(username, password) {
  const params = {
    name: username,
    password
  }
  return request({
    url: '/admin/login',
    method: 'post',
    data: params
  })
}

export function passwordUpdate(params) {
  return request({
    url: '/admin/updatePassword',
    method: 'get',
    params
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/auth/info',
    method: 'get',
    params: { token }
  })
}

