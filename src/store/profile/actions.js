import Vue from 'vue'

const PROFILE_ROUTE = 'profile'

export function show (context) {
  const p = new Promise((resolve, reject) => {
    return Vue.prototype.$axios
      .get(`${PROFILE_ROUTE}`)
      .then(res => resolve(res.data))
      .catch(err => reject(err.response))
  })
  return p
}

export function update (context, payload) {
  const p = new Promise((resolve, reject) => {
    return Vue.prototype.$axios
      .put(`${PROFILE_ROUTE}`, payload)
      .then(res => resolve(res.data))
      .catch(err => reject(err.response.data))
  })
  return p
}
