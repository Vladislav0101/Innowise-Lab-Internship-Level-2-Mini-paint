import { IRootState } from "./../utils/types";
import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import user from "@/store/user";
import create from "@/store/create";
import feed from "@/store/feed";

Vue.use(Vuex);

const store: StoreOptions<IRootState> = {
  state: { version: "1.0.0" },
  modules: {
    feed,
    create,
    user,
  },
};
export default new Vuex.Store<IRootState>(store);
