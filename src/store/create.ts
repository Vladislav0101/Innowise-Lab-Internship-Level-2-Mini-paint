import firebase from "firebase";
import { ActionTree, MutationTree, GetterTree } from "vuex";

import { IRootState, IProfileStateCreate } from "@/types/index";

const state: IProfileStateCreate = {
  size: 5,
  color: "#000000",
  mode: "pencil",
};

const getters: GetterTree<IProfileStateCreate, IRootState> = {
  size(state): number {
    return state.size;
  },
  color(state): string {
    return state.color;
  },
  mode(state): string {
    return state.mode;
  },
};

const mutations: MutationTree<IProfileStateCreate> = {
  setSize(state, newSize: number): void {
    state.size = newSize;
  },

  setColor(state, newColor: string): void {
    state.color = newColor;
  },

  setMode(state, mode: string): void {
    state.mode = mode;
  },
};

const actions: ActionTree<IProfileStateCreate, IRootState> = {
  setSize({ commit }, newSize: number): void {
    commit("setSize", newSize);
  },

  setColor({ commit }, newColor: string): void {
    commit("setColor", newColor);
  },

  setMode({ commit }, mode: string): void {
    commit("setMode", mode);
  },

  savePicture({ getters }, { img }) {
    const storageRef = firebase.storage().ref();

    storageRef
      .child(`${+new Date()}-${getters.email}.jpeg`)
      .putString(img, "data_url");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
