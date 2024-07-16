let en = ['sys_user_approve_type', 'ds_works_class_public', 'ds_works_class_one']
let zh = ['审批类型', '公共基础课程组', '专业技能课程⼀组']

export const MAP_EN = (approveType) => {
  return en[approveType]
}

export const MAP_ZH = (approveType) => {
  return zh[approveType]
}