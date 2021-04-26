import { ActionTree, MutationTree, GetterTree } from "vuex";

import { IRootState, IVersion } from "@/types/index";
import features from "@/utils/features";
import { eventBus } from "@/main";

const state: IVersion = {
  version: "1.0",
  isLearningPathActive: false,
  isVersionsMatch: false,
  features: {},
  isNeedToLearningPath: false,
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
  isNeedToLearningPath(state) {
    return state.isNeedToLearningPath;
  },
};

const mutations: MutationTree<IVersion> = {
  setFeatures(state) {
    state.features = features;
  },
  setIsLearningPathActive(state, value) {
    state.isNeedToLearningPath = false;
    state.isLearningPathActive = value;
  },
  setIsVersionsMatch(state, value) {
    state.isVersionsMatch = value;
  },
  setIsNeedToLearningPath(state, value) {
    state.isNeedToLearningPath = value;
  },
};

const actions: ActionTree<IVersion, IRootState> = {
  async initVersion({ dispatch, commit }) {
    dispatch("checkEqualVersion");

    eventBus.$on("isNeedToLearningPath", () => {
      commit("setIsNeedToLearningPath", true);
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

  completeAll({ dispatch }) {
    Object.entries(features).forEach((item: Array<any>) => {
      item[1].isChecked = true;
    });

    dispatch("setVersionOnDB", true);
  },

  setIsLearningPathActive({ commit }, value) {
    commit("setIsLearningPathActive", value);
  },
};

export default { state, getters, actions, mutations };
