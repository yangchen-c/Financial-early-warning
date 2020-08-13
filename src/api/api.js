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
// yc客户管理
export function customerList(params, params1) {
  return request({
    url: `customer/getPaging/${params.page}/${params.size}`,
    method: 'get',
    params: params1
  })
}

export function customerAdd(data) {
  return request({
    url: 'customer',
    method: 'post',
    data
  })
}

export function customerUpdate(data) {
  return request({
    url: 'customer',
    method: 'put',
    data
  })
}

export function customerDelete(params) {
  return request({
    url: 'customer',
    method: 'delete',
    params
  })
}
// yc门店管理
export function shopList(params) {
  return request({
    url: 'store',
    method: 'get',
    params
  })
}

export function shopAdd(data) {
  return request({
    url: 'store',
    method: 'post',
    data
  })
}

export function shopUpdate(data) {
  return request({
    url: 'store',
    method: 'put',
    data
  })
}

export function shopDelete(params) {
  return request({
    url: 'store',
    method: 'delete',
    params
  })
}
// yc分类管理
export function comboClassifyList(params) {
  return request({
    url: 'comboClassify',
    method: 'get',
    params
  })
}
export function comboClassifyAdd(data) {
  return request({
    url: 'comboClassify',
    method: 'post',
    data
  })
}

export function comboClassifyUpdate(data) {
  return request({
    url: 'comboClassify',
    method: 'put',
    data
  })
}

export function comboClassifyDelete(params) {
  return request({
    url: 'comboClassify',
    method: 'delete',
    params
  })
}

// yc套餐管理
export function comboList(params) {
  return request({
    url: 'combo',
    method: 'get',
    params
  })
}
export function comboAdd(data) {
  return request({
    url: 'combo',
    method: 'post',
    data
  })
}

export function comboUpdate(data) {
  return request({
    url: 'combo',
    method: 'put',
    data
  })
}

export function comboDelete(params) {
  return request({
    url: 'combo',
    method: 'delete',
    params
  })
}
// yc案例管理
export function caseList(params) {
  return request({
    url: 'case',
    method: 'get',
    params
  })
}
export function caseAdd(data) {
  return request({
    url: 'case',
    method: 'post',
    data
  })
}

export function caseUpdate(data) {
  return request({
    url: 'case',
    method: 'put',
    data
  })
}

export function caseDelete(params) {
  return request({
    url: 'case',
    method: 'delete',
    params
  })
}
// yc职位管理
export function positionList(params) {
  return request({
    url: 'position',
    method: 'get',
    params
  })
}
export function positionAdd(data) {
  return request({
    url: 'position',
    method: 'post',
    data
  })
}

export function positionUpdate(data) {
  return request({
    url: 'position',
    method: 'put',
    data
  })
}

export function positionDelete(params) {
  return request({
    url: 'position',
    method: 'delete',
    params
  })
}
// yc考勤管理
export function workList(params) {
  return request({
    url: 'attendance',
    method: 'get',
    params
  })
}
// yc员工管理
export function staffList(params) {
  return request({
    url: 'staff',
    method: 'get',
    params
  })
}
export function staffAdd(data) {
  return request({
    url: 'staff',
    method: 'post',
    data
  })
}

export function staffUpdate(data) {
  return request({
    url: 'staff',
    method: 'put',
    data
  })
}

export function staffDelete(params) {
  return request({
    url: 'staff',
    method: 'delete',
    params
  })
}

// yc收支列表
export function balanceList(params) {
  return request({
    url: 'balance',
    method: 'get',
    params
  })
}
export function balanceAdd(data) {
  return request({
    url: 'balance',
    method: 'post',
    data
  })
}

export function balanceUpdate(data) {
  return request({
    url: 'balance',
    method: 'put',
    data
  })
}

export function balanceDelete(params) {
  return request({
    url: 'balance',
    method: 'delete',
    params
  })
}
