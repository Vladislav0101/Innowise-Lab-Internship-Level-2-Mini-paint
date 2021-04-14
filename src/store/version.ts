import firebase from "firebase";
import { ActionTree, MutationTree, GetterTree } from "vuex";

import { IRootState, IVersion } from "@/types/index";
import features from "@/utils/features";
import { eventBus } from "@/main";

const state: IVersion = {
  version: "1.0",
  isLearningPathActive: false,
  isVersionsMatch: false,
  features: {},
};

const getters: GetterTree<IVersion, IRootState> = {
  version(state) {
    return state.version;
  },
  features(state) {
    return state.features;
  },
  isVersionsMatch(state) {
    return state.isVersionsMatch;
  },
  isLearningPathActive(state) {
    return state.isLearningPathActive;
  },
};

const mutations: MutationTree<IVersion> = {
  setFeatures(state) {
    state.features = features;
  },
  setIsLearningPathActive(state, value) {
    state.isLearningPathActive = value;
  },
  setIsVersionsMatch(state, value) {
    state.isVersionsMatch = value;
  },
};

const actions: ActionTree<IVersion, IRootState> = {
  async checkEqualVersion({ getters, commit }) {
    const user = getters.user;

    firebase
      .database()
      .ref(`${user}`)
      .on("value", (res) => {
        const result = res.val();

        eventBus.$emit("checkVersionOnStart", {
          result,
          stateVersion: state.version,
        });

        commit("setIsVersionsMatch", result.version === state.version);

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
        version: state.version,
        checkedVersion: value ? value : false,
      });
  },

  checkFeature({ state, dispatch }, idElement: string) {
    state.features[idElement].isChecked = true;

    dispatch("allFeaturesIsChecked", features).then((res) => {
      if (res) dispatch("setVersionOnDB", true);
    });
  },

  allFeaturesIsChecked() {
    const features = state.features;

    let allIsChecked = true;

    Object.entries(features).forEach((item: Array<any>) => {
      if (item[1].isChecked === false) allIsChecked = false;
    });

    return allIsChecked;
  },
};

export default { state, getters, actions, mutations };
