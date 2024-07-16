import request from "@/utils/request";
//获取评分分页列表/模糊查询
export const reqScoreList = (data) => request.post('biz/score/list', data)
//获取作品信息
export const reqItemInfo = (id) => request.get(`biz/dsitems/info?itemId=${id}`)
//获取作品相关信息
export const reqItemSubInfoList = (data) => request.post('biz/itemSubs/list', data)
//获取分类字典信息
export const reqDictInfoList = (dictType) => request.get(`system/dict/data/type/${dictType}`)
//评分
export const reqScore = (data) => request.post('biz/score/add', data)