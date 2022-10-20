import _ from 'lodash'

export default function ({ store, redirect, app, route }) {
  const token  = app.$cookies.get('session/token')
  const isAuth = _.every(route.matched, (m) => {
    return process.browser
      ? _.get(m.components, 'default.options.auth', true) // Browser
      : _.get(m.components, 'default._Ctor.options.auth', true) // SSR
  })

  if (!token && isAuth)
    return redirect('/login', route.path !== '/' ? { redirect: route.path } : null)

  store.set('session/token', token)
}
