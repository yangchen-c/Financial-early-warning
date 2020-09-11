import request from '@/utils/request'

// 上传文件
const uploadPath = process.env.VUE_APP_BASE_API + 'upload'
export { uploadPath }

export function uploadFile(data) {
  return request({
    url: 'upload',
    method: 'post',
    data
  })
}

// yc网点信息
export function branchesList(params, params1) {
  return request({
    url: `branches/getPaging/${params.page}/${params.size}`,
    method: 'get',
    params: params1
  })
}

export function branchesList1(params) {
  return request({
    url: 'branches',
    method: 'get',
    params
  })
}

export function branchesAdd(data) {
  return request({
    url: 'branches',
    method: 'post',
    data
  })
}

export function branchesUpdate(data) {
  return request({
    url: 'branches',
    method: 'put',
    data
  })
}

export function branchesDelete(params) {
  return request({
    url: 'branches',
    method: 'delete',
    params
  })
}
// yc网点类型信息
export function branchesTypeList(params) {
  return request({
    // url: 'case',
    url: 'branchesType',
    method: 'get',
    params
  })
}
export function branchesTypeAdd(data) {
  return request({
    url: 'branchesType',
    method: 'post',
    data
  })
}

export function branchesTypeUpdate(data) {
  return request({
    url: 'branchesType',
    method: 'put',
    data
  })
}

export function branchesTypeDelete(params) {
  return request({
    url: 'branchesType',
    method: 'delete',
    params
  })
}

// yc设备
export function deviceList(params, params1) {
  return request({
    url: `device/getPaging/${params.page}/${params.size}`,
    method: 'get',
    params: params1
  })
}
export function deviceAdd(data) {
  return request({
    url: 'device',
    method: 'post',
    data
  })
}

export function deviceUpdate(data) {
  return request({
    url: 'device',
    method: 'put',
    data
  })
}

export function deviceDelete(params) {
  return request({
    url: 'device',
    method: 'delete',
    params
  })
}

// yc报警
export function warningList(params, params1) {
  return request({
    url: `warning/getPaging/${params.page}/${params.size}`,
    method: 'get',
    params: params1
  })
}
export function warningAdd(data) {
  return request({
    url: 'warning',
    method: 'post',
    data
  })
}

export function warningUpdate(data) {
  return request({
    url: 'warning',
    method: 'put',
    data
  })
}

export function warningDelete(params) {
  return request({
    url: 'warning',
    method: 'delete',
    params
  })
}

