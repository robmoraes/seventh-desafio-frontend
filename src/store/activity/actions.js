import Vue from 'vue'

const ACTIVITY_ROUTE = '/activities'

export function list (context) {
  const p = new Promise((resolve, reject) => {
    return Vue.prototype.$axios
      .get(`${ACTIVITY_ROUTE}`)
      .then(res => resolve(res.data))
      .catch(err => reject(err.response))
  })
  return p
}
