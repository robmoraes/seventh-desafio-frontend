import Vue from 'vue'

const USERS_ROUTE = '/users'

export function list (context) {
  const p = new Promise((resolve, reject) => {
    return Vue.prototype.$axios
      .get(`${USERS_ROUTE}`)
      .then(res => resolve(res.data))
      .catch(err => reject(err.response.data))
  })
  return p
}

export function destroy (context, id) {
  console.log('users.destroy')
}
