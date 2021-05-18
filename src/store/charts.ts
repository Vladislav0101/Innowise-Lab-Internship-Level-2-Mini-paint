import { ActionTree, MutationTree, GetterTree } from "vuex";
import firebase from "firebase/app";

import { ICharts, IRootState } from "@/types/index";

const state: ICharts = {
  objEventCount: null,
  currentAnalyticObject: null,
};

const getters: GetterTree<ICharts, IRootState> = {
  objEventCount(state) {
    return state.objEventCount;
  },
};

const mutations: MutationTree<ICharts> = {
  setObjEventCount(state, obj) {
    state.objEventCount = Object.assign({}, state.objEventCount, obj);
  },
};

const actions: ActionTree<ICharts, IRootState> = {
  addObjEventCount({ getters, commit }, filterByDateObject) {
    const analytics = filterByDateObject
      ? filterByDateObject
      : getters.dataAnalytics;
    const objEventCount: any = {};

    Object.entries(analytics).forEach((item: any) => {
      if (!(item[1].type in objEventCount)) {
        objEventCount[item[1].type] = 1;
      } else {
        objEventCount[item[1].type] += 1;
      }
    });

    commit("setObjEventCount", objEventCount);
    return objEventCount;
  },
};

export default { state, getters, mutations, actions };
