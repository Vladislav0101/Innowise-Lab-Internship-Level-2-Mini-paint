import { ActionTree, MutationTree, GetterTree } from "vuex";
import firebase from "firebase/app";

import { ICharts, IRootState } from "@/types/index";
import { filterByDate } from "@/utils/helpFunction";

const state: ICharts = {
  objEventCount: null,
};

const getters: GetterTree<ICharts, IRootState> = {
  objEventCount(state) {
    return state.objEventCount;
  },
};

const mutations: MutationTree<ICharts> = {
  setObjEventCount(state, obj) {
    state.objEventCount = obj;
  },
};

const actions: ActionTree<ICharts, IRootState> = {
  addObjEventCount({ getters, commit }, filterByDateObject) {
    const analytics = getters.dataAnalytics;
    const objEventCount: any = filterByDateObject ? filterByDateObject : {};

    Object.entries(analytics).forEach((item: any) => {
      if (!(item[1].type in objEventCount)) {
        objEventCount[item[1].type] = 1;
      } else {
        objEventCount[item[1].type] += 1;
      }
    });

    commit("setObjEventCount", objEventCount);
    // console.log(filterByDate(analytics, "2021-05-13", "2021-05-15"));
  },
};

export default { state, getters, mutations, actions };
