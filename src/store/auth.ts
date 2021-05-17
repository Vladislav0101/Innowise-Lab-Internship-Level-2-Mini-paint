import firebase from "firebase/app";
import { ActionTree, MutationTree, GetterTree } from "vuex";

import { IProfileStateUser, IRootState, IAuth } from "@/types/index";

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
};

export default {
  state,
  getters,
  mutations,
  actions,
};
