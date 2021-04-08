import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

import user from "@/store/user";
import create from "@/store/create";
import feed from "@/store/feed";
import init from "@/store/init";

import { IRootState, IProfileStateCreate } from "@/types/index";

Vue.use(Vuex);

const store: StoreOptions<IRootState> = {
  state: { version: "1.0.0" },
  modules: {
    init,
    feed,
    create,
    user,
  },
};
export default new Vuex.Store<IRootState>(store);
