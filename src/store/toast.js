import Vue from 'vue'

export default {
  state: {},
  mutations: {},
  actions: {
    setToastHttpError({commit, dispatch}, payload) {
      if (payload && payload.status) {
        switch (payload.status) {
          case 400:
          case 401:
            Vue.$toast.error(payload.statusText)
            break
          case 403:
            Vue.$toast.error('Access Denied')
            break
          case 422:
            let mess = 'Validation errors:'
            for (let field in payload.data.errors) {
              mess += '<br>' + field + ': '
              for (let error of payload.data.errors[field])
                mess += error + ''
            }
            Vue.$toast.error(mess)
            dispatch('setPreloader', false)
            break
          case 500:
            if (payload.data && payload.data.message) {
              Vue.$toast.error(payload.data.message)
            } else {
              Vue.$toast.error(payload.statusText)
            }
            break
          default:
            Vue.$toast.error(payload.statusText ? payload.statusText : payload)
            break
        }
      }
    },
    setToast({commit}, payload) {
      Vue.$toast.open({
        message: payload[0],
        type: payload[1],
      })
    }
  }
}