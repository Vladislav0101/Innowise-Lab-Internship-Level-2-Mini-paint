import { ActionTree, MutationTree, GetterTree } from "vuex";
import firebase from "firebase";

import { IAnalytics, IRootState } from "@/types/index";

const state: IAnalytics = {
  countEvents: {},
};

const getters: GetterTree<IAnalytics, IRootState> = {
  countEvents(state) {
    return state.countEvents;
  },
};

const mutations: MutationTree<IAnalytics> = {
  setCountEvent(state, eventObject) {
    state.countEvents = Object.assign({}, state.countEvents, { eventObject });
  },
};

const actions: ActionTree<IAnalytics, IRootState> = {
  setAnalyticsUnit({ dispatch }, { user, date, event }) {
    firebase
      .database()
      .ref(`analytics/${event}/${user}`)
      .update({ [date]: true });

    dispatch("getCountEvent", { event }).then((res) => {
      firebase
        .database()
        .ref(`analytics/totalEventUse/${event}`)
        .set(res ? (res += 1) : 1);
    });
  },

  async getCountEvent({ commit }, { event }) {
    return new Promise((resolve) => {
      firebase
        .database()
        .ref(`analytics/totalEventUse/${event}`)
        .on("value", (result) => {
          commit("setCountEvent", { [event]: result.val() });
          resolve(result.val());
        });
    });
  },
};

export default { state, getters, mutations, actions };
