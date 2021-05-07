import firebase from "firebase";
import { ActionTree, MutationTree, GetterTree } from "vuex";

import { IProfileStateUser, IRootState, IAuth } from "@/types/index";
import { eventBus } from "@/main";

const state: IProfileStateUser = {
  user: "",
  email: "",
};

const getters: GetterTree<IProfileStateUser, IRootState> = {
  user(state): string {
    return state.user;
  },
  email(state) {
    return state.email;
  },
};

const mutations: MutationTree<IProfileStateUser> = {
  setUser(state, { newUser, email }: { [key: string]: string }): void {
    state.user = newUser;
    state.email = email;
  },
};

const actions: ActionTree<IProfileStateUser, IRootState> = {
  async registerUser(
    { commit },
    { userMail, userPassword }: IAuth
  ): Promise<void> {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(userMail, userPassword);
  },

  async signInUser(
    { commit },
    { userMail, userPassword }: IAuth
  ): Promise<void> {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(userMail, userPassword);
  },

  logoutUser({ commit }) {
    firebase.auth().signOut();
    commit("setUser", { newUser: "", email: "" });
  },

  async checkEqualVersion({ getters, commit, dispatch }) {
    const user = getters.user;

    firebase
      .database()
      .ref(`${user}`)
      .on("value", (res) => {
        const result = res.val();

        if (!result || result.version !== getters.version) {
          dispatch("setVersionOnDB");
        }

        commit("setIsVersionsMatch", result.version === getters.version);

        if (!result.checkedVersion) {
          eventBus.$emit("isNeedToLearningPath");
        }
      });
    commit("setFeatures");
  },

  async setVersionOnDB({ getters }, value) {
    const user = getters.user;

    firebase
      .database()
      .ref(`${user}`)
      .set({
        version: getters.version,
        checkedVersion: value ? value : false,
      });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
