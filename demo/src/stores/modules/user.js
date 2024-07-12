import { defineStore } from "pinia";
import { reqLogin, reqGetUserInfo } from "@/api/user";
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";

let useUserStore = defineStore('user', {
  state: () => {
    return {
      token: GET_TOKEN(),
      username: ''
    }
  },
  actions: {
    async userLogin(data) {
      let res = await reqLogin(data)
      if(res.code === 200) {
        this.token = res.token
        SET_TOKEN(res.token)
      }
    },
    async userInfo() {
      let info = await reqGetUserInfo()
      if(info.code === 200) {
        this.username = info.user.userName
      }
    },
    logout() {
      REMOVE_TOKEN()
      this.token = ''
      this.username = ''
    }
  },
  getters: {
    
  }
})
export default useUserStore