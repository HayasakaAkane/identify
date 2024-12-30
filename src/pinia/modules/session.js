import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    sessionid: null, // 用于存储 sessionId
  }),
  actions: {
    setSessionId(id) {
      this.sessionid = id
    },
    clearSessionId() {
      this.sessionid = null
    },
  },
})
