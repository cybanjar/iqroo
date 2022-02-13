import { defaultMutations } from "vuex-easy-access";

const EXPIRED = 60 * 60 * 24 * 7; // 1 Month

export const state = () => {
  return {
    surahs: [],
  };
};

export const mutations = {
  ...defaultMutations(state()),
  surahs(state, value) {
    state.surahs = value;

    this.$cookies.set("session/token", value, { path: "/", maxAge: EXPIRED });
  },
};
