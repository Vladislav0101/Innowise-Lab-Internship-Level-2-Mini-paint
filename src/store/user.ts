import { IProfileStateUser, IRootState, IAuth } from "@/types/index";
import firebase from "firebase";
import { ActionTree, MutationTree, GetterTree } from "vuex";

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
  setUser(state, newUser: string): void {
    state.user = newUser;
  },
  setEmail(state, email) {
    state.email = email;
  },
};

const actions: ActionTree<IProfileStateUser, IRootState> = {
  async registerUser(
    { commit }: any,
    { userMail, userPassword }: IAuth
  ): Promise<void> {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(userMail, userPassword);
  },

  async signInUser(
    { commit }: any,
    { userMail, userPassword }: IAuth
  ): Promise<void> {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(userMail, userPassword);
  },

  logoutUser({ commit }) {
    firebase.auth().signOut();
    commit("setUser", "");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
