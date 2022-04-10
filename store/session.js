import { defaultMutations } from "vuex-easy-access";

const EXPIRED = 60 * 60 * 24 * 7; // 1 Month

export const state = () => {
  return {
    token: null,
    user: {}
  };
};

export const mutations = {
  ...defaultMutations(state()),
  token(state, value) {
    state.token = value

    this.$cookies.set('session/token', value, { path: '/', maxAge: EXPIRED })
  },
  user(state, value) {
    state.user = value
    
    this.$cookies.set('session/user', value, { maxAge: EXPIRED })
  }
};

export const getters = {

}

export const actions = {
  async init ({dispatch}) {
    dispatch('loadToken')


  },
  loadToken ({ commit }) {
    commit('token', this.$cookies.get('session/token'))
  }
}