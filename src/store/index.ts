import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

import user from "@/store/user";
import create from "@/store/create";
import feed from "@/store/feed";
import init from "@/store/init";
import version from "@/store/version";
import auth from "@/store/auth";
import someoneUserAccount from "@/store/someoneUserAccount";
import analytics from "@/store/analytics";

import { IRootState } from "@/types/index";

Vue.use(Vuex);

const store: StoreOptions<IRootState> = {
  state: { version: "1.0.0" },
  modules: {
    analytics,
    someoneUserAccount,
    auth,
    version,
    init,
    feed,
    create,
    user,
  },
};
export default new Vuex.Store<IRootState>(store);
