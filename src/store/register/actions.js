import Vue from 'vue'

const REGISTER_ROUTE = 'register'

export function insert (context, payload) {
  const p = new Promise((resolve, reject) => {
    return Vue.prototype.$axios
      .post(`${REGISTER_ROUTE}`, payload)
      .then(res => resolve(res.data))
      .catch(err => reject(err.response.data))
  })
  return p
}
