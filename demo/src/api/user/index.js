import request from "@/utils/request";

export const reqLogin = (logindata) => request.post('/login', logindata)
export const reqGetUserInfo = () => request.get('/getInfo')
